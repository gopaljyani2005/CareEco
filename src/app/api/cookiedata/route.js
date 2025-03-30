import { verifyToken } from "@/utils/token";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request){
    const cookie = await cookies();
    const token = cookie.get("usertoken");
    const userdata = await verifyToken(token.value);
    return NextResponse.json(userdata.payload,{status:200});
    // try {
    //     const cookie = await cookies();
    //     const token = cookie.get("usertoken");
    //     const userdata = await verifyToken(token.value);
    //     return NextResponse.json(userdata.payload,{status:200});
    // } catch (error) {
    //     return NextResponse.json({error:"token not found"},{status:404});
    // }
}