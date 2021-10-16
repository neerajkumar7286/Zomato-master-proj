import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import passport from "passport";
// Models
import { UserModel } from "../../database/user";

const Router = express.Router();

/*
Route     /signup
Des       Signup with email and password
Params    none
Access    Public
Method    POST  
*/

//Router.post("/signup", async (req, res) => {
//  try {
//    const { email, password, fullname, phoneNumber } = req.body.credentials;
//
    // check whether email exist
//    const checkUserByEmail = await UserModel.findOne({ email });
//    const checkUserByPhone = await UserModel.findOne({ phoneNumber });

//    if (checkUserByEmail || checkUserByPhone) {
//      return res.json({ error: "User already exist!" });
//    }

    // hash password
//    const bcryptSalt = await bcrypt.genSalt(8);
//
//    const hashedPassword = await bcrypt.hash(password, bcryptSalt);

    // save to DB
//    await UserModel.create({
//      ...req.body.credentials,
//      password: hashedPassword,
//    });

    // generate JWT auth token
//    const token = jwt.sign({ user: { fullname, email } }, "ZomatoAPP");

    // return
//    return res.status(200).json({ token, status: "success" });
//  } catch (error) {
//    return res.status(500).json({ error: error.message });
//  }
// });

Router.post("/signup",async(req,res)=>{
  try{await UserModel.findEmailAndPhone(req.body.credentials)  ;
  const newUser=await UserModel.create(req.body.credentials);
  const token=newUser.generateJwtToken();
  return res.status(200).json({token});

  
  }
  catch(error){return res.status(500).json({error: error.message});}
});




Router.post("/signin",async(req,res)=>{
  try{
    const user = await UserModel.findByEmailAndPassword(req.body.credentials);
    if(!user)throw new Error ("User Doesnot Exist") ;
  
  const token=user.generateJwtToken();
  return res.status(200).json({token,status:"Sucess"});

  
  }
  catch(error){return res.status(500).json({error: error.message});}
});




Router.get("/google", passport.authenticate("google",{
  scope: [
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/userinfo.email"
  ],
  })
  );


  Router.get("/google/callback", passport.authenticate("google",{failureRedirect: "/"}),
  (req,res) => {
    return res.redirect("https://localhost:3000/google/${req.session.passport.user.token}");
  }
  );
export default Router;
