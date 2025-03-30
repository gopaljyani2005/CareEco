import db from "../../../lib/data";
import { generateToken } from "@/utils/token";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST (request){
    let data = await request.json();
    const {username, userpassword} = data;
    const query = `SELECT * FROM users WHERE username=? AND userpassword=?`;
    const [result] =  await db.promise().execute(query,[username,userpassword]);
    console.log(result);
    if(result.length == 0){
        return NextResponse.json({message:"Invalid username or password"},{status:400});
    }
    else{
        const userdata = result[0];
        const token = generateToken(userdata);
        const response = NextResponse.json({message:"successfully login"},{status:200});
        response.cookies.set("usertoken",token, {
            path: "/", 
            httpOnly: true, 
            secure: process.env.NODE_ENV === "production",
            expires:new Date(Date.now() + 60*60*1000),
           });
        return response;
   
    }
    
}