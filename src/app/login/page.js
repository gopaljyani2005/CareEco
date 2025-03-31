"use client";
import { useRouter } from 'next/navigation';
import styles from "../../style/registration.module.css";
import { useState } from 'react';

export default function Sigin() {
    const router = useRouter();
    const [username, setusername] = useState("");
    const [userpassword, setuserpassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            username: username,
            userpassword: userpassword
        };

        try {
            const result = await fetch(`/api/userlogin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (result.status === 200) {
                router.push('/login/portal');
            } else {
                alert("Invalid username or password");
                setusername("");
                setuserpassword("");
            }
        } catch (error) {
            alert("An error occurred during login.");
            console.error(error);
        }
    }

    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <h1 style={{ color: 'blue' }}>User Login Portal</h1>

                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    placeholder="jyani123"
                    required
                    value={username}
                    onChange={(e) => setusername(e.target.value)}
                />

                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="xxxxxx"
                    required
                    value={userpassword}
                    onChange={(e) => setuserpassword(e.target.value)}
                />

                <button type="submit">Login</button>
            </form>
        </div>
    );
}
