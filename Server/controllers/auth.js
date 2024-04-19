const User=require("../models/user");
const bcrypt = require('bcryptjs');
const jwt=require("jsonwebtoken");


module.exports.userSignUp=async (req,res)=>{
    const {user}=req.body;
    
    let existingUser=await User.findOne({email:user.email});
    if(existingUser){
        return res.status(409).json({message:"Email Already exists",isSuccess:false});
    }

    existingUser=await User.findOne({username:user.username});
    if(existingUser){
        return res.status(409).json({message:"Username Already exists",isSuccess:false});
    }
    
    const salt=await bcrypt.genSalt(10);
    const hashedPassword=await bcrypt.hash(user.password,salt);

    const newUser=new User({...user,password:hashedPassword});
    const savedUser=await newUser.save();

    const token=jwt.sign({id:savedUser._id},process.env.SECEAT_KEY,{expiresIn:"7d"});
    
    const {password,...rest}=savedUser._doc;

    return res.status(201).json({user:rest,token,message:"User created Successfully"});
}

module.exports.accessRoute=async (req,res)=>{
    console.log(req.session);
    res.send("hello");
}

module.exports.userSignIn=async (req,res)=>{
    const {email,password}=req.body;

    const userExist=await User.findOne({email});
    if(!userExist){
        return res.status(404).json({message:"User does't exist"});
    }
    const isCorrect=await bcrypt.compare(password,userExist.password);

    if(!isCorrect){
        return res.status(401).json({message:"Invaid Credientials"});
    }
    const {password:hashedPassword,...rest}=userExist._doc;
    const token=jwt.sign({id:rest._id},process.env.SECEAT_KEY,{expiresIn:"7d"});
   

    return res.status(200).json({user:rest,token,message:"user successfully login"});
}

module.exports.refreshToken=async (req,res)=>{
    const headers=req.headers.authorization;
    if (!headers || !headers.startsWith('Bearer ')) {
        return res.status(401).json({message:"You are unotharized"});
    }
    const tokenFound=headers.split(" ")[1];
    
    let id;
    jwt.verify(tokenFound,process.env.SECEAT_KEY,async (error,data)=>{
        if(error){
            return res.status(401).json({message:"You are unotharized"})
        }
        id=data.id;
        
    });
    if(id){
        const token=jwt.sign({id},process.env.SECEAT_KEY,{expiresIn:"7d"});
        const currUser=await User.findById(id);
        const {password,...rest}=currUser._doc;
        return res.status(200).json({user:rest,token});
    }
    return res.json(401).json({message:"Unauthorixed"});
}