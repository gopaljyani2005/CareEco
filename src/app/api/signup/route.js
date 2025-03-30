import db from "../../../lib/data";
import { NextResponse } from "next/server";

export async function POST(request) {
        const data = await request.json();
        const { username, userpassword, useremail, phoneNumber, useracNumber, userbalance} = data;

        const checkQuery = `SELECT * FROM users WHERE username = ?`;
        const [findUser] = await db.promise().execute(checkQuery, [username]);

        if (findUser.length > 0) {
            return NextResponse.json({ message: "User is already registered with this username" }, { status: 409 });
        }
        else{
            const query = `INSERT INTO users (username, userpassword, useremail, phoneNumber, useracNumber,userbalance) VALUES (?, ?, ?, ?, ?, ?)`;
            const [result] = await db.promise().execute(query, [username, userpassword, useremail, phoneNumber, useracNumber,userbalance]);
            return NextResponse.json({ message: "Successfully registered" }, { status: 200 });

        }
}
