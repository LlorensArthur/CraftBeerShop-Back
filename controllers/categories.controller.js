import Categories from '../model/categories.model.js'

export const getListCategories = async (req,res,next)=>{
    console.log("categories");
    const query = "SELECT * FROM categories";
    try {
        const [rows] = await Categories.getData(query);
        res.json(rows);
    } catch (error) {
        console.log("ERROR ERROR ERROR", "THIS REQUEST FAILED", query, "HERE IS THE ERROR MESSAGE", error);
    }
}