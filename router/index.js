import express from 'express'
import mail from '../lib/mailing.js'

const router = express.Router();

//router.use('/api/v1/product', productRoutes);

export default router.get("/api/v1/sendMail", (req, res,next)=>{
    mail("arthur.llorens@3wa.io", "Bienvenue", "Salut toi", "On te souhaite la bienvenue");
    res.redirect("/admin");
});