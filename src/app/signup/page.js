"use client";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import styles from "../../style/registration.module.css";

export default function Sigin() {
    const router = useRouter();
    const [username, setusername] = useState("");
    const [useremail, setuseremail] = useState("");
    const [confirmpassword, setconfirmpassword] = useState("");
    const [userpassword, setuserpassword] = useState("");
    const [userphoneNumber, setuserphoneNumber] = useState("");
    const [useracNumber, setuseracNumber] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (userpassword !== confirmpassword) {
            alert("Password does not match");
            return;
        }

        const data = {
            username: username,
            userpassword: userpassword,
            useremail: useremail,
            phoneNumber: userphoneNumber,
            useracNumber: useracNumber,
            userbalance: 0
        };

        try {
            const result = await fetch(`/api/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (result.status === 200) {
                router.push('/login');
            } else {
                alert("User is already registered with this username");
                router.push('/');
            }
        } catch (error) {
            alert("An error occurred during registration.");
            console.error(error);
        }
    }

    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <h1 style={{ color: 'blue' }}>Registration Portal</h1>

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

                <label htmlFor="confirmpassword">Re-Enter Password</label>
                <input
                    type="password"
                    id="confirmpassword"
                    name="confirmpassword"
                    placeholder="xxxxxx"
                    required
                    value={confirmpassword}
                    onChange={(e) => setconfirmpassword(e.target.value)}
                />

                <label htmlFor="useremail">Email</label>
                <input
                    type="email"
                    id="useremail"
                    name="useremail"
                    placeholder="gogi@gmail.com"
                    required
                    value={useremail}
                    onChange={(e) => setuseremail(e.target.value)}
                />

                <label htmlFor="userphoneNumber">Phone Number</label>
                <input
                    type="tel"
                    id="userphoneNumber"
                    name="userphoneNumber"
                    placeholder="9799352356"
                    required
                    value={userphoneNumber}
                    onChange={(e) => setuserphoneNumber(e.target.value)}
                />

                <label htmlFor="useracNumber">Account Number</label>
                <input
                    type="text"
                    id="useracNumber"
                    name="useracNumber"
                    placeholder="55442354821256"
                    required
                    value={useracNumber}
                    onChange={(e) => setuseracNumber(e.target.value)}
                />

                <button type="submit">Register</button>
            </form>
        </div>
    );
}
