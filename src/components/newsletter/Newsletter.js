import React, { useState } from "react";
import styles from "./Newsletter.module.css";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the email to your backend
    console.log("Submitted email:", email);
    setEmail("");
    alert("Thank you for subscribing!");
  };

  return (
    <form onSubmit={handleSubmit} className={styles.newsletterForm}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        required
        className={styles.emailInput}
      />
      <button type="submit" className={styles.submitButton}>
        Subscribe
      </button>
    </form>
  );
};

export default Newsletter;
