// pages/api/checkout_sessions.js

import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15", // or '2020-08-27' if you'd prefer
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    // 1) Log the request to see what data we're getting
    console.log("Incoming Request Body:", req.body);

    // 2) Destructure request
    const { cart, user_email, cart_id } = req.body;

    // 3) Check cart is not empty
    if (!cart || cart.length === 0) {
      return res.status(400).json({ error: "Cart is empty" });
    }

    // 4) Build line_items array
    const line_items = cart.map((item) => {
      // Let's console.log each item for debugging
      console.log("Cart item:", item);

      // Safeguard: if item.price is missing or not a number, throw an error
      if (!item.price || typeof item.price !== "number") {
        throw new Error(`Invalid price for product ID: ${item.id}`);
      }

      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name || "Unnamed Product",
            description: item.description || "No description",
          },
          unit_amount: Math.round(item.price * 100), // cents
        },
        quantity: 1,
      };
    });

    // 5) Build success/cancel URLs
    // If NEXT_PUBLIC_URL is missing, we use req.headers.origin
    const baseUrl = process.env.NEXT_PUBLIC_URL || req.headers.origin;

    console.log("Using Base URL for success/cancel:", baseUrl);

    // 6) Create Stripe session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items,
      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/cart`,
      customer_email: user_email || "guest@example.com",
      metadata: {
        cart_id: cart_id || "N/A",
      },
    });

    // 7) Log the created session
    console.log("Created session with ID:", session.id);

    // 8) Return the session ID to the frontend
    return res.status(200).json({ id: session.id });
  } catch (err) {
    console.error("Stripe Checkout Session Error:", err.message);
    return res.status(500).json({ error: err.message });
  }
}
