import { useRouter } from "next/router";
import styles from "./success.module.css";

export default function SuccessPage() {
  const router = useRouter();
  const { session_id } = router.query; // Get the session ID from query params

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Payment Successful!</h1>
      <p className={styles.paragraph}>Thank you for your purchase! Your order is being processed.</p>
    </div>
  );
}
