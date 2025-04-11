// pages/api/checkout_sessions.js

import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2020-08-27',
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { cart, user_email, cart_id } = req.body;  // Get the cart from the client side (array of products)
      
      if (!cart || cart.length === 0) {
        return res.status(400).json({ error: 'Cart is empty' });
      }

      // Map products to Stripe items
      const line_items = cart.map(item => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name,
            description: item.description || 'No description provided',
          },
          unit_amount: item.price * 100, // Stripe expects amount in cents
        },
        quantity: 1, // Adjust the quantity if needed
      }));

      // Get the base URL from environment variables
      const baseUrl = process.env.NEXT_PUBLIC_URL;

      if (!baseUrl) {
        return res.status(500).json({ error: "NEXT_PUBLIC_URL is not defined." });
      }

      // Create Checkout Session
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: line_items,
        mode: 'payment',
        success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${baseUrl}/cart`,
        metadata: {
          user_email: user_email || 'Unknown', // Track the user who made the purchase
          cart_id: cart_id || 'Unknown',       // Track the cart ID for analytics
        },
      });

      // Send the session ID to the frontend
      res.status(200).json({ id: session.id });
    } catch (err) {
      console.error("Stripe Checkout Session Error:", err);
      res.status(500).json({ error: err.message });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
