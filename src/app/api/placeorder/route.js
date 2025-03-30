import db from "../../../lib/data";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/utils/token";

export async function POST(request) {
        const data = await request.json();
        const cookie = await cookies();
        const token = cookie.get("usertoken");
        const userdata1 = await verifyToken(token.value);
        const userdata = userdata1.payload;

        
        const userid = userdata.id;
        const balance = userdata.userbalance;
        let { stockName, quantity, ordertype} = data;
        let orderstatus = "partial";
        let remainingQtytotal = quantity;
        

        // find the price of the stock from the company database;
        const priceQuery = `SELECT currentPrice FROM company WHERE companyName = ?`
        const [priceResult] = await db.promise().execute(priceQuery, [stockName]);
        const price = priceResult[0].currentPrice;

        
        // place the order for orderr type buy
        
        if(ordertype === "buy"){
                if(balance < price * quantity){
                        return NextResponse.json({ message: "Insufficient balance"},{status:400});
                }

                else{
                        // update the balance of users
                        const userUpdateQuery = `UPDATE users SET userbalance = ? WHERE id = ?`;
                        await db.promise().execute(userUpdateQuery, [balance-(price*quantity), userid]);


                        const findOrderQuery = `SELECT * FROM orders WHERE stockName = ? AND ordertype = ? AND (orderstatus = ? OR orderstatus = ?)`;
                        const [findOrderResult] = await db.promise().execute(findOrderQuery, [stockName, "sell", "excuted", "partial" ]);
                        if (findOrderResult.length===0){
                                let insertOrderQuery = `INSERT INTO orders (userid, stockName, quantity, price, ordertype, orderstatus, remainingQty) VALUES (?, ?, ?, ?, ?, ?, ?)`;
                                let [insertOrderResult] = await db.promise().execute(insertOrderQuery,[userid, stockName, quantity, price, ordertype, orderstatus, remainingQtytotal]);
                                return NextResponse.json({ message: "Order placed successfully"},{ status : 200});
                        }
                        else{
                                for(let i=0; (i<findOrderResult.length) && remainingQtytotal; i++){
                                        let order = findOrderResult[i];
                                        let buyid = order.userid;
                                        let remainingQty = order.remainingQty;
                                        if(remainingQty > remainingQtytotal){
                                                remainingQty = remainingQty - remainingQtytotal;
                                                orderstatus = "partial";
                                                let orderUpdateQuery = `UPDATE orders SET orderstatus = ?, remainingQty = ? WHERE id = ?`;
                                                await db.promise().execute(orderUpdateQuery, [orderstatus, remainingQty, order.id]);

                                                let buyUpdateQuery = `UPDATE users SET userbalance = ? WHERE id = ?`;
                                                await db.promise().execute(buyUpdateQuery, [order.userbalance+(price*remainingQtytotal), buyid]);
                                                remainingQtytotal = 0;
                                        }
                                        else{
                                                let buyquantity = remainingQty;
                                                remainingQtytotal = remainingQtytotal - remainingQty;
                                                remainingQty = 0;
                                                orderstatus = "excuted";
                                                let orderUpdateQuery = `UPDATE orders SET orderstatus = ?, remainingQty = ? WHERE id = ?`;
                                                await db.promise().execute(orderUpdateQuery, [orderstatus, remainingQty, order.id]);
        
                                                let buyUpdateQuery = `UPDATE users SET userbalance = ? WHERE id = ?`;
                                                await db.promise().execute(buyUpdateQuery, [balance+(price*buyquantity), buyid]);
                                        }
                                }
                                if(remainingQtytotal===0){
                                        orderstatus = "executed";
                
                                }
                                else{
                                        orderstatus = "partial";
                                }
                                let insertOrderQuery = `INSERT INTO orders (userid, stockName, quantity, price, ordertype, orderstatus, remainingQty) VALUES (?, ?, ?, ?, ?, ?, ?)`;
                                const [insertOrderResult] = await db.promise().execute(insertOrderQuery,[userid, stockName, quantity, price, ordertype, orderstatus, remainingQtytotal]);
                                return NextResponse.json({ message: "Successfully registered" }, { status: 200 });
                        }
                }
        
        }
}
