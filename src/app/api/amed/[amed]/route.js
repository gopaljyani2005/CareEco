import db from "@/lib/data";
import { NextResponse } from "next/server";

export async function GET(request){
    const arr = request.url.split("/");
    const userid = arr[arr.length - 1];
    const query = `SELECT * FROM orders WHERE userid = ? AND orderstatus = ?`;
    const [data] = await db.promise().execute(query,[userid, "partial"]);
    return NextResponse.json(data,{status:200});
}


