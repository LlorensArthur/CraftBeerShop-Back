import express from 'express'
import {getListOrders} from '../controllers/orders.controller.js'

const router = express.Router();

router.get("/", getListOrders);

export default router;
