import OrderDetails from '../model/orderDetails.model.js'

export const getListOrderDetails = async (req,res,next)=>{
    console.log("orderDetails");
    const query = "SELECT * FROM orderDetails";
    try {
        const [rows] = await OrderDetails.getData(query);
        res.json(rows);
    } catch (error) {
        console.log("ERROR ERROR ERROR", "THIS REQUEST FAILED", query, "HERE IS THE ERROR MESSAGE", error);
    }
}