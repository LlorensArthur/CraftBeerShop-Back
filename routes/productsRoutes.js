import express from 'express'
import {getListProducts} from '../controllers/products.controller.js'

const router = express.Router();

router.get("/", getListProducts);

export default router;
