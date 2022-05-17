import express from 'express'
import categoriesRoutes from "./categoriesRoutes.js"
import usersRoutes from "./usersRoutes.js"
import ordersRoutes from "./ordersRoutes.js"
import ordersDetailsRoutes from "./ordersDetailsRoutes.js"
import productsRoutes from "./productsRoutes.js"

const router = express.Router();

router.use("/categories", categoriesRoutes);
router.use("/users", usersRoutes);
router.use("/orders", ordersRoutes);
router.use("/ordersDetails", ordersDetailsRoutes);
router.use("/products", productsRoutes);

export default router;
