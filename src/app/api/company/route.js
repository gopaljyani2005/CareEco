import db from "./../../../lib/data";

import { NextResponse } from "next/server";

export async function GET(){
    const query = `SELECT * FROM company`;
    const [data] = await db.promise().execute(query);
    return NextResponse.json(data,{status:200});
}