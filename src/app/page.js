"use client";
import "./globals.css";
import Image from "next/image";
import styles from "../style/front.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <h1>Welcome to Trading Hub</h1>
      <div className={styles.buttonGroup}>
        <button onClick={() => location.href = "/login"}>Login</button>
        <button onClick={() => location.href = "/signup"}>Sign Up</button>
      </div>
    </div>
  );
}

