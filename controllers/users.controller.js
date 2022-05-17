import Users from '../model/users.model.js'

export const getListUsers = async (req,res,next)=>{
    console.log("users");
    const query = "SELECT * FROM users";
    try {
        const [rows] = await Users.getData(query);
        res.json(rows);
    } catch (error) {
        console.log("ERROR ERROR ERROR", "THIS REQUEST FAILED", query, "HERE IS THE ERROR MESSAGE", error);
    }
}

export const registerUser = async (req,res,next)=>{
    const surname = "user1";
    const lastName = "lastName1";
    const email = "email1";
    const password = "password1";
    const roles = "roles1";

    const userInfos = {
        surname : surname,
        lastName : lastName,
        email : email,
        password : password,
        roles : roles
    }

    const query = "INSERT INTO users (Surname, LastName, Email, Password, Role) VALUES (?,?,?,?,?);";
    try {
        const {rows} = await Users.save(query, [surname, lastName, email, password, roles]);
        res.json(rows);
    } catch (error) {
        console.log("ERROR ERROR ERROR", "THIS REQUEST FAILED", query, "HERE IS THE ERROR MESSAGE", error);
    }
}