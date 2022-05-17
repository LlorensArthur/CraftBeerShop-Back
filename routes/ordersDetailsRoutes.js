import express from 'express'
import {getListOrderDetails} from '../controllers/orderDetails.controller.js'

const router = express.Router();

router.get("/",getListOrderDetails);

export default router;
