"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './../../../style/company.module.css';
import "../../../style/userpage.css";

export default function StocksPage() {
  const router = useRouter();
  const [company, setcompany] = useState("");

  useEffect(() => {
    async function getcompany() {
      try {
        const response = await fetch(`/api/company`, {
          method: "GET",
          credentials: "same-origin",
        });
        const result = await response.json();
        setcompany(result);
      } catch (error) {
        console.error("Error fetching company data:", error);
      }
    }
    getcompany();
  }, []);

  if (!company) {
    return <p>Loading......</p>;
  }

  const stocks = [
    { symbol: 'BLUE', name: 'Maruti Suzuki India Ltd', change: '+9.07%', positive: true },
    { symbol: 'GH', name: 'NTPC', change: '+7.46%', positive: true },
    { symbol: 'UCTT', name: 'Axis Bank', change: '+5%', positive: true },
    { symbol: 'CRNX', name: 'ONGC', change: '+4.98%', positive: true },
    { symbol: 'MSBI', name: 'Bajaj Finserv Ltd', change: '+4.97%', positive: true },
    { symbol: 'CYBR', name: 'HDFC Bank', change: '-9.3%', positive: false },
    { symbol: 'NTHI', name: 'TCS', change: '-7.85%', positive: false },
    { symbol: 'WOOF', name: 'Life Insurance', change: '-6.71%', positive: false },
    { symbol: 'ARCT', name: 'HCL Technologies', change: '-4.92%', positive: false },
    { symbol: 'PDYN', name: 'Jyani', change: '-4.45%', positive: false }
  ];

  const orderbuy = () => router.push('/login/portal/orderbuy');
  const ordersell = () => router.push('/login/portal/ordersell');
  const orderamed = () => router.push('/login/portal/orderamed');
  const portfolio = () => router.push('/login/portal/portfolio');

  return (
    <main>
      <div className="adminpage">
        <div className="btn">
          <button onClick={orderbuy}>Place Order For Buy Stock</button>
          <button onClick={ordersell}>Place Order For Sell Stock</button>
          <button onClick={orderamed}>Amend Order Before Execute</button>
          <button onClick={portfolio}>Show Portfolio</button>
        </div>
      </div>
      <div className="header"></div>

      <div className={styles.container}>
        <h1 className={styles.header}>Most Advanced + Most Declined</h1>
        <div className={styles.row}>
          {stocks.map((stock, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.symbol}>{stock.symbol}</div>
              <div className={styles.name}>{stock.name}</div>
              <div className={stock.positive ? styles.changePositive : styles.changeNegative}>
                {stock.change}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
