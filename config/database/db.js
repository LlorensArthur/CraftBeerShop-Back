import mysql from "mysql2/promise";
import "dotenv/config";

import express from 'express';
const app = express();

const { HOSTNAME_DB, NAME_DB, USERNAME_DB, PASSWORD_DB } = process.env;

const pool = mysql.createPool({
    host: HOSTNAME_DB,
    database: NAME_DB,
    user: USERNAME_DB,
    password: PASSWORD_DB,
    waitForConnections: true,
    connectionLimit: 10000,
    queueLimit: 0,
});

pool.getConnection().then(res => {    
    console.log(`Bien connecté à la BDD --> ${res.config.database}!`);
})


export default pool;
