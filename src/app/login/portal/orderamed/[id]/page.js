import db from "@/lib/data";
import Link from "next/link";

export default async function amed({params}){
    
    const { id } =await params;
    const query = `UPDATE orders SET orderstatus = ? WHERE id = ?`;
    const response = await db.promise().execute(query, ["cancelled", id]);
    
    return(
        <main>
            <h1>Loading......</h1>
            <h1 style={styles.amed}>Successfully Amended This Order</h1>
            <Link href={"./"} style={styles.amed}>Amend Section</Link>
        </main>
    )
}


const styles = {
    amed: {
        color: 'white',
    },
};