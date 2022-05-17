import express from 'express'
import {getListUsers} from '../controllers/users.controller.js'
import {registerUser} from '../controllers/users.controller.js'

const router = express.Router();

router.get("/", getListUsers);
router.post("/newUser", registerUser);

export default router;
