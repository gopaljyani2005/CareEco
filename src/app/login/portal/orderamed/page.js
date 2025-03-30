"use client";
import "../portfolio/style.css";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function UserDetail() {
  const [userData, setUserData] = useState([]);
  let [result1,setresult1] = useState("");
  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await fetch(`/api/cookiedata`);

        if (!response.ok) {
          throw new Error(`Error fetching cookie data: ${response.status}`);
        }

        const result = await response.json();
        const userid = result.id;
        setresult1(result);
        
        const data = await fetch(`/api/amed/${userid}`);
        if (!data.ok) {
          throw new Error(`Error fetching portfolio data: ${data.status}`);
        }

        const userdata = await data.json();
        setUserData(userdata);
      } catch (error) {
        console.error("Error:", error);
      }
    }

    fetchUserData();
  }, []);

  return (
    <main>
        <h1>Jai Shree Ram</h1>
        <h1>Stock Market Detail of {result1.username}</h1>
      <div className="ud">
        <table className="table">
          <thead>
            <tr>
              <th>Stock Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Order Type</th>
              <th>Order Status</th>
              <th>Remaining Quantity</th>
            </tr>
          </thead>
          <tbody>
            {userData.map((item, index) => (
              <tr key={index}>
                <td>
    <a href={`/login/portal/orderamed/${item.id}`}>{item.stockName}</a>
  </td>
                <td>{item.quantity}</td>
                <td>{item.price}</td>
                <td>{item.ordertype}</td>
                <td>{item.orderstatus}</td>
                <td>{item.remainingQty}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
