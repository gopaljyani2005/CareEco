import db from "../../../lib/data";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/utils/token";


export async function POST(request){
    const data = await request.json();
    const cookie = await cookies();
    const token = cookie.get("usertoken");
    const userdata1 = await verifyToken(token.value);
    const userdata = userdata1.payload;
    const userid = userdata.id;

    let { stockName, quantity, ordertype} = data;
    let orderstatus = "partial";
    let remainingQtytotal = quantity;

    // find the price of the particular stock from the company database;
    const priceQuery = `SELECT currentPrice FROM company WHERE companyName = ?`
    const [priceResult] = await db.promise().execute(priceQuery, [stockName]);
    const price = priceResult[0].currentPrice;

    // find the all buy orders for this stock 
    const findOrderQuery = `
    SELECT SUM(remainingQty) AS totalsell 
    FROM orders 
    WHERE stockName = ? 
      AND ordertype = ? 
      AND (orderstatus = ? OR orderstatus = ?) 
      AND userid = ?`;

    const [findOrderResultsum] = await db.promise().execute(findOrderQuery, [stockName, "buy", "excuted", "partial", userid]);

    const findOrderQuery1 = `SELECT * FROM orders WHERE stockName = ? AND ordertype = ? AND(orderstatus = ? OR orderstatus = ?) AND userid = ?`;
    const [findOrderResult] = await db.promise().execute(findOrderQuery1, [stockName, "buy", "excuted", "partial", userid]);


    if (findOrderResultsum[0].totalsell < quantity){
        return NextResponse.json({ message: "Insufficient stock to shell"}, {status: 400});
    }
    else{
        for(let i=0; (i<findOrderResult.length) && remainingQtytotal; i++){
            let order  = findOrderResult[i];
            let remainingQty = order.remainingQty;
            if(remainingQty > remainingQtytotal){
                remainingQty = remainingQty - remainingQtytotal;

                const buyUpdateQuery = `UPDATE orders SET remainingQty = ? WHERE id = ?`;
                db.promise().execute(buyUpdateQuery, [remainingQty, order.id]);

                const sellUpdateQuery = `UPDATE users SET userbalance = ? WHERE id = ?`;
                db.promise().execute(sellUpdateQuery, [userdata.userbalance + (price *(remainingQty - remainingQtytotal)), userdata.id]);
                remainingQtytotal = 0;
            }
            else{
                remainingQtytotal = remainingQtytotal - remainingQty;

                const buyUpdateQuery = `UPDATE users SET remainingQty = ? orderstatus = ? WHERE id = ?`;
                db.promise().execute(buyUpdateQuery, [0, "excuted", order.id]);

                const sellUpdateQuery = `UPDATE users SET userbalance = ? WHERE id = ?`;
                db.promise().execute(sellUpdateQuery, [userdata.userbalance + (price *(remainingQty)), userdata.id]);

            }
        }
        if(remainingQtytotal > 0){
            orderstatus = "partial";
        }
        else{
            orderstatus = "excuted";
        }
        let insertOrderQuery = `INSERT INTO orders (userid, stockName, quantity, price, ordertype, orderstatus, remainingQty) VALUES (?, ?, ?, ?, ?, ?, ?)`;
        db.promise().execute(insertOrderQuery,[userid, stockName, quantity, price, "sell", orderstatus, remainingQtytotal]);
        return NextResponse.json({message: "order placed successfully"},{status:200});
    }
    return NextResponse.json({message: "order placed successfully"},{status:200});
}