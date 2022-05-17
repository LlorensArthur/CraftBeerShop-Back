import express from 'express'
import {getListCategories} from '../controllers/categories.controller.js'

const router = express.Router();

router.get("/", getListCategories);

export default router;
