"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../../../../style/registration.module.css";

export default function SignIn() {
    const router = useRouter();
    const [stockName, setStockName] = useState("");
    const [quantity, setQuantity] = useState(5);
    const [ordertype, setOrderType] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            stockName: stockName,
            quantity: quantity,  
            ordertype: ordertype
        };

        const result = await fetch(`/api/sellorder`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (result.status === 200) {
            alert("Order placed successfully!");
            router.push('/login');
        } else {
            alert("Failed to place the order.");
            router.push('./');
        }
    };

    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <h1 style={{ color: 'blue' }}>Order Place Portal</h1>

                <label htmlFor="stockName">Stock Name</label>
                <input
                    type="text"
                    id="stockName"
                    name="stockName"
                    placeholder="Stock Name"
                    required
                    value={stockName}
                    onChange={(e) => setStockName(e.target.value)}
                />

                <label htmlFor="quantity">Quantity</label>
                <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    placeholder="256"
                    required
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                />

                <label htmlFor="ordertype">Order Type</label>
                <input
                    type="text"
                    id="ordertype"
                    name="ordertype"
                    placeholder="buy/sell"
                    required
                    value={ordertype}
                    onChange={(e) => setOrderType(e.target.value)}
                />


                <button type="submit">Place Order</button>
            </form>
        </div>
    );
}
