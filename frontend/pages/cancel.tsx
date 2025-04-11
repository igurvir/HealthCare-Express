import styles from "./cancel.module.css";

export default function CancelPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Payment Cancelled</h1>
      <p className={styles.paragraph}>Your payment has been cancelled. You can try again.</p>
    </div>
  );
}
