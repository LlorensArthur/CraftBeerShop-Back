import Orders from '../model/orders.model.js'

export const getListOrders = async (req,res,next)=>{
    console.log("orders");
    const query = "SELECT * FROM orders";
    try {
        const [rows] = await Orders.getData(query);
        res.json(rows);
    } catch (error) {
        console.log("ERROR ERROR ERROR", "THIS REQUEST FAILED", query, "HERE IS THE ERROR MESSAGE", error);
    }
}