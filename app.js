import express from 'express';
import session from 'express-session';
import {fileURLToPath} from 'url';
import path from 'path';
import mysql from 'mysql';
import bcrypt from 'bcrypt';
import fileUpload from 'express-fileupload';
import 'dotenv/config';
import cors from "cors"
import bodyParser  from "body-parser";
import sendMail from './router/index.js'
import mail from './lib/mailing.js'

const saltrounds = 10;

const PORT = process.env.PORT || process.env.SERVER_LOCAL_PORT || 9050;
const { HOSTNAME_DB, NAME_DB, USERNAME_DB, PASSWORD_DB } = process.env;

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

const adminPath     = ["/admin", "/add_post", "/edit_post", "/delete_post"];
const protectedPath = ["/", "/category", "/product", "/admin", "/add_post", "/add_comment", "/edit_post", "/delete_post", "/register", "/login", "/logout", "/post"];

app.set('views', "./views");
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname + "/public")));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(session({
    secret: "super je kiffe les chats",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000,
    }
}))

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(fileUpload({createParentPath : true}));
// app.use((req,res, next) =>{
//     const pathname = parseurl(req).pathname;
//     console.log(pathname);
//     console.log(protectedPath.includes("/category"));
//     res.locals.session = req.session;
        
//     if(!req.session.user){
//         req.session.user = null;
//         req.session.isLogged = false;
//     }    
    
//     if (adminPath.includes(pathname) && req.session.user?.role === 'user' ) {
//         res.redirect('/');
//     } else if (!protectedPath.includes(pathname)){
//         res.render('pageNotFound');
//     } else {
//         // next();
//     } 
//         next();
// });

/*******************/
/*******************/
// connexion à la BDD
const pool = mysql.createPool({
    connectionLimit: 10000,
    host: "localhost",
    database: "my_leboncoin",
    user: "root",
    password: ""
})

pool.getConnection(err=>{
    if(err){
        throw err;
    }
    console.log('Bien connecté à la BDD!');
})
/*******************/
/*******************/

app.get("/api/v1/sendMail", (req, res,next)=>{
    mail("arthur.llorens@3wa.io", "Bienvenue", "Salut toi", "On te souhaite la bienvenue")
});

app.get("/", (req,res)=>{
    //const sql = 'INSERT INTO `category` (`ProductName`) VALUES ("Chats")';
    //const sql = 'SELECT * from product';


    const sql = 'SELECT * FROM `category`';
    pool.query(sql, function(err, posts){
        console.log(err, posts);
        res.json(posts);
    })
})

app.get('/category/:id', (req,res)=>{

    const id = req.params.id;
    console.log(id);

    const sql1 = 'SELECT * FROM `product` where category = ?';

    pool.query(sql1, [id], function(error, post){
        res.json({hoe : post});
    });
});


app.get('/product/:id', (req,res)=>{
    const id = req.params.id;
    console.log(id);

    const sql1 = 'SELECT * FROM `product` where id = ?';

    pool.query(sql1, [id], function(error, post){
        res.json({hoe : post});
    });
});

app.post('/uploadfile', (req, res) => {
    console.log(Object.keys(req.files).length);
    console.log(req.files[ 'myFile' ]);
    console.log(req.files[ 'myFile' ].name);
    console.log(req.body[ 'productName' ]);
    console.log(req.body[ 'description' ]);

    if(!req.files || !Object.keys(req.files).length){
        console.log("!req.files", !req.files);
        console.log("!Object.keys(req.files).lenght", !Object.keys(req.files).lenght);
        res.json({
            statut : 400
        })
        return;
    }
    req.files[ 'myFile' ].mv(`./product-pictures/${req.files[ 'myFile' ].name}`, (error, dunno) =>{
        console.log("it worked", error);
        if(error){
            res.json({
                statut : 500
            })
        }
        else{
            res.json({
                status : 200,
                nom_image : req.files[ 'myFile' ].name
            })        
        }
    });
})


app.post('/user', (req, res) => {
    const sqlQuery = "INSERT INTO user (`UserName`, `mail`) VALUES (?, ?)";
    let userName = req.body['myUser'];
    let userMail = req.body['myMail'];
    
    pool.query(sqlQuery, [userName, userMail], function(error, post){
        console.log(error, post);
        mail(userMail, `Bienvenue, ${userName}`, "Bonjour,", `Bienvenue chez nous, ${userName}\".`);

        res.json({hoe : post});
    });
})


app.post('/product', (req,res)=>{
    console.log(req.query);
    console.log(Object.keys(req.files).length);
    console.log(req.files[ 'myFile' ]);
    console.log(req.files[ 'myFile' ].name);
    console.log(req.body[ 'productName' ]);
    console.log(req.body[ 'description' ]);

    if(!req.files || !Object.keys(req.files).length){
        console.log("!req.files", !req.files);
        console.log("!Object.keys(req.files).lenght", !Object.keys(req.files).lenght);
        res.json({
            statut : 400
        })
        return;
    }
    req.files[ 'myFile' ].mv(`./product-pictures/${req.files[ 'myFile' ].name}`);

    

    const sqlQuery = "INSERT INTO `product` (`Title`, `Description`, `Img`, `AddDate`, `ModificationDate`, `SellerID`, `Category`, `ProductType`) VALUES (?, ?, ?, NOW(), NULL, ?, ?, ?)";
    let title = req.body[ 'productName' ];
    let description = req.body[ 'description' ];
    let img = `./product-pictures/${req.files[ 'myFile' ].name}`;
    let sellerId = 1;
    let category = 1;
    let productType = req.body[ 'sellType' ];

    pool.query(sqlQuery, [title, description, img, sellerId, category, productType], function(error, post){
        console.log(error);
        mail("arthur.llorens@3wa.io", "Ajout d'une annonce", "Bonjour,", `votre annonce \"${title}\" a bien été ajouté.`);

        res.json({hoe : post});
    });
});


/*******************/
/****** ADMIN ******/
/*******************/

app.get('/admin', (req,res)=>{
    const sql = 'SELECT Post.Id, Title, Contents, CreationTimestamp, FirstName, LastName, Category.Name AS Category_Name FROM Post INNER JOIN Author ON Post.Author_Id = Author.Id INNER JOIN Category ON Post.Category_Id = Category.Id ORDER BY CreationTimestamp DESC';

    pool.query(sql, function(err, results){

        res.render('layout', {template:'admin/admin', results: results})
    });
});


app.get('/add_post', (req,res)=>{
    pool.query('SELECT * FROM Author ', function (err, authors){
        pool.query('SELECT * FROM Category', function (err, categories){
            res.render('layout', {template:'admin/add_post', authors: authors, categories: categories })
        });
    });
});

app.post('/add_post', (req,res)=>{
    pool.query('INSERT INTO Post (Title, Contents, Author_Id, Category_Id, CreationTimestamp) VALUES (?, ?, ?, ?, NOW())', [req.body.title, req.body.content, req.body.author, req.body.category ], function (error) {
        if(error){
            throw error
        }
        res.redirect("/admin");
    });
});

app.get('/edit_post/:id', (req,res)=>{
    const id = req.params.id;

    pool.query('SELECT * FROM Post WHERE id = ?', [id], (err, post)=>{
        res.render('layout', {template: 'admin/edit_post', post: post[0]});
    });
});

app.post('/edit_post/:id', (req,res) => {
    const id = req.params.id;

    pool.query('UPDATE Post SET Title = ?, Contents = ? WHERE Id = ?', [req.body.Title, req.body.Contents, id], (err)=>{
        if(err){
            throw err
        }
        res.redirect("/admin");
    });
});

app.get('/delete_post/:id', (req,res)=>{
    const id = req.params.id;
    console.log(id);
    pool.query('DELETE FROM post WHERE id = ?', [id], (err, result)=>{
        if(err){
            throw err
        }
        console.log(result);
        res.redirect('/admin');
    });
});

/*******************/
/****** USER *******/
/*******************/

app.get('/register', (req,res)=>{
    res.render('layout', { template: "register", session : req.session, error: null})
})

app.post('/register', async (req,res) => {
    const hash = await bcrypt.hash(req.body.password, saltrounds);
    pool.query('INSERT INTO user (Email, Password, Role, FirstName, LastName) VALUES (?,?,"user",?,?)',
    [req.body.email, hash, req.body.firstName, req.body.lastName],
     (err, result) => {
        if(err){
            throw err
        }
        console.log(result);
        res.redirect('/login');
    })
})

app.get('/login', (req,res)=>{
    res.render('layout', { template: "login", session : req.session, error: null})
})

app.post('/login', async (req, res, next)=>{
    const email = req.body.email;
    const password = req.body.password;
    pool.query("SELECT * FROM user WHERE Email = ?", [email], async function (err, user){
        if(err){
            res.render("layout", {
                    template: "login",
                    error: "problème de récupération sur la bdd",                    
                });
        }        
        if(!user.length){
            res.render('layout', {template: "login", error: "user doesn't exist",})
        } else {
            const isPwValid = await bcrypt.compare(password, user[0].Password);
            if(isPwValid){
                req.session.user = {
                    firstname : user[0].FirstName,
                    role : user[0].Role,
                }
                req.session.isLogged = true;

                if(user[0].Role === "admin"){
                    res.redirect('/admin');
                } else {
                    res.redirect("/");           
                }
            } else {
                res.render("layout", {
                    template: "login",
                    error: "bad password",                    
                }) 
            }
        }        
    })
})

app.get('/logout', (req,res)=>{
    req.session.destroy();
    res.redirect("/");
})

app.listen(PORT, ()=>{
    console.log(`listening at http://localhost:${PORT}`);
});

