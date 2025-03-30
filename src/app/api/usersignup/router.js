import db from "../../../lib/data";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const data = await request.json();
        const { username, userpassword, useremail, phoneNumber, useracNumber } = data;

        const checkQuery = `SELECT * FROM users WHERE username = ?`;
        const [findUser] = await db.promise().execute(checkQuery, [username]);

        if (findUser.length > 0) {
            return NextResponse.json({ message: "User is already registered with this username" }, { status: 409 });
        }

        
        const query = `INSERT INTO users (username, userpassword, useremail, phoneNumber, useracNumber) VALUES (?, ?, ?, ?, ?)`;
        const [result] = await db.promise().execute(query, [username, userpassword, useremail, phoneNumber, useracNumber]);

        return NextResponse.json({ message: "Successfully registered" }, { status: 200 });
    } catch (error) {
        console.error("Error registering user:", error);
        return NextResponse.json({ message: "Error registering user", error: error.message }, { status: 500 });
    }
}
