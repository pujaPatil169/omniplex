"use client";

import styles from "@/styles/Home.module.css";
import AuthWrapper from "./AuthWrapper";
import MainPrompt from "../components/MainPrompt/MainPrompt";

import { useState } from "react";

const Home = () => {
  const [loading, setLoading] = useState(false);

  const handleUpgradeClick = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/payment/stripe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: window.location.origin }),
      });
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Failed to create checkout session");
      }
    } catch (error) {
      alert("Error initiating payment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthWrapper>
      <div className={styles.main}>
        <button
          onClick={handleUpgradeClick}
          disabled={loading}
          style={{
            marginBottom: "1rem",
            padding: "0.75rem 1.5rem",
            fontSize: "1rem",
            fontWeight: "bold",
            backgroundColor: "#6772e5",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Redirecting..." : "Upgrade to Pro - $10"}
        </button>
        <MainPrompt />
      </div>
    </AuthWrapper>
  );
};

export default Home;
