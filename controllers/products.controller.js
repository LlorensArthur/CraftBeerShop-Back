import Orders from '../model/products.model.js'

export const getListProducts = async (req,res,next)=>{
    console.log("products");
    const query = "SELECT * FROM products";
    try {
        const [rows] = await Orders.getData(query);
        res.json(rows);
    } catch (error) {
        console.log("ERROR ERROR ERROR", "THIS REQUEST FAILED", query, "HERE IS THE ERROR MESSAGE", error);
    }
}