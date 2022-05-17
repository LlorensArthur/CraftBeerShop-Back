import pool from "../config/database/db.js";

class Users {

    static async getData(q) {        
        const query = await pool.execute(q);
        return query;
    }

    static async getDataWithValue(q, id){
        const query = await pool.query(q,id);
        return query;
    }

    static async getDatas({q1, q2}){
        const [query1] = await pool.execute(q1);
        const [query2] = await pool.execute(q2);    
        return [query1, query2];
    }

    static async getOnePostAndCommentsByValue({id, q1, q2}) {        
        const [query1] = await pool.execute(q1, [id]);
        const [query2] = await pool.execute(q2, [id]);
        return [query1, query2];
    }

    static async save(q, datas){
        console.log(datas);

        const [query] = await pool.execute(q, datas);
        return query;
    }

    static async delete(q, id){
        const [query] = await pool.execute(q, [id]);
        return query;
    }
}

export default Users;
