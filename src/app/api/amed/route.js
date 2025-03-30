
import db from "@/lib/data";
import { NextResponse } from "next/server";

export async function POST(request){
    const data = await request.json();
    const userid = data.id;
    console.log(id);
    return NextResponse.json({message:"successfullly run "},{status:200});
}