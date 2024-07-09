const User=require("../models/user");
const bcrypt = require('bcryptjs');
const jwt=require("jsonwebtoken");
const Seller=require("../models/seller");

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

    const token=jwt.sign({id:savedUser._id,person:"User"},process.env.SECEAT_KEY,{expiresIn:"7d"});
    
    const {password,...rest}=savedUser._doc;

    res.status(201).json({user:rest,token,message:"User created Successfully",isSuccess:true});
}

module.exports.accessRoute=async (req,res)=>{
    console.log(req.session);
    res.send("hello");
}

module.exports.userSignIn=async (req,res)=>{
    const {email,password}=req.body;

    const userExist=await User.findOne({email});
    if(!userExist){
        return res.status(404).json({message:"User does't exist",isSuccess:false});
    }
    const isCorrect=await bcrypt.compare(password,userExist.password);

    if(!isCorrect){
        return res.status(401).json({message:"Invaid Credientials",isSuccess:false});
    }
    const {password:hashedPassword,...rest}=userExist._doc;
    const token=jwt.sign({id:rest._id,person:"User"},process.env.SECEAT_KEY,{expiresIn:"7d"});
   

    res.status(200).json({user:rest,token,message:"user successfully login",isSuccess:true});
}



module.exports.refreshToken = async (req, res) => {
    const headers = req.headers.authorization;
    if (!headers || !headers.startsWith('Bearer ')) {
        return res.status(404).json({ message: "you are not authorized" });
    }

    const tokenFound = headers.split(" ")[1];

    let id;
    let person;

    try {
        const data = jwt.verify(tokenFound, process.env.SECEAT_KEY);
        id = data.id;
        person = data.person;
    } catch (error) {
        return res.status(401).json({ isSuccess: false, message: "Token verification failed" });
    }

    if (!id) {
        return res.status(404).json({ isSuccess: false, message: "Invalid token data" });
    }

    let token;
    let user;

    if (person === "User") {
        token = jwt.sign({ id, person }, process.env.SECEAT_KEY, { expiresIn: "7d" });
        user = await User.findById(id);
    } else if (person === "Seller") {
        token = jwt.sign({ id, person }, process.env.SECEAT_KEY, { expiresIn: "7d" });
        user = await Seller.findById(id);
    }

    if (!user) {
        return res.status(404).json({ isSuccess: false, message: "User not found" });
    }

    const { password, ...rest } = user._doc;
    res.status(200).json({ user: rest, token, isSuccess: true });
};

function randomPassword(){
    let s="";
    for(let i=0;i<6;i++){
        s+=Math.floor(Math.random()*10)
    }
    return s;
}

module.exports.userGoogleAuth=async (req,res)=>{
    const {user}=req.body;
   
    const existingUser=await User.findOne({email:user.email});
    
    if(existingUser!==null){
        const token=jwt.sign({id:existingUser._id,person:"User"},process.env.SECEAT_KEY,{expiresIn:"7d"});
        const {password,...rest}=existingUser._doc;
        return res.status(200).json({message:"User Login successfull",user:rest,token,isSuccess:true});
    }
    const password=randomPassword();
    const salt=await bcrypt.genSalt(10);
    const hashedPassword=await bcrypt.hash(password,salt);
    const newUser=new User({...user,password:hashedPassword});
    const createdUser=await newUser.save();
    const {password:newpPassword,...rest}=createdUser._doc;
    const token=jwt.sign({id:createdUser._id,person:"User"},process.env.SECEAT_KEY,{expiresIn:"7d"});
    console.log("Account created");
    res.status(200).json({message:"Successfully Signup",user:rest,token,isSuccess:true});

}

module.exports.sellerSignUp=async (req,res)=>{
    const {seller}=req.body;
    
    let existingSeller=await Seller.findOne({email:seller.email});
    if(existingSeller){
        return res.status(409).json({message:"Email Already exists",isSuccess:false});
    }

    existingSeller=await Seller.findOne({sellerName:seller.sellerName});
    if(existingSeller){
        return res.status(409).json({message:"SellerName Already exists",isSuccess:false});
    }
    
    const salt=await bcrypt.genSalt(10);
    const hashedPassword=await bcrypt.hash(seller.password,salt);

    const newSeller=new Seller({...seller,password:hashedPassword});
    const savedSeller=await newSeller.save();
    
    const token=jwt.sign({id:savedSeller._id,person:"Seller"},process.env.SECEAT_KEY,{expiresIn:"7d"});
    
    const {password,...rest}=savedSeller._doc;

    res.status(201).json({seller:rest,token,message:"Seller created Successfully",isSuccess:true});

}

module.exports.sellerSignIn=async (req,res)=>{
    const {email,password}=req.body;

    const selerExist=await Seller.findOne({email});
    if(!selerExist){
        return res.status(404).json({message:"Seller does't exist",isSuccess:false});
    }
    const isCorrect=await bcrypt.compare(password,selerExist.password);

    if(!isCorrect){
        return res.status(401).json({message:"Invaid Credientials",isSuccess:false});
    }
    const {password:hashedPassword,...rest}=selerExist._doc;
    const token=jwt.sign({id:rest._id,person:"Seller"},process.env.SECEAT_KEY,{expiresIn:"7d"});
   
    res.status(200).json({seller:rest,token,message:"seller successfully login",isSuccess:true});
}

module.exports.sellerGoogleAuth=async (req,res)=>{
    const {seller}=req.body;

    const existingSeller=await Seller.findOne({email:seller.email});
    if(existingSeller){
        const token=jwt.sign({id:existingSeller._id,person:"Seller"},process.env.SECEAT_KEY,{expiresIn:"7d"});
        const {password,...rest}=existingSeller._doc;
        return res.status(200).json({message:"User Login successfull",seller:rest,token,isSuccess:true});
    }
    const password=randomPassword();
    const salt=await bcrypt.genSalt(10);
    const hashedPassword=await bcrypt.hash(password,salt);
    const newSeller=new Seller({...seller,password:hashedPassword});
    const createdSeller=await newSeller.save();

    const {password:newPassword,...rest}=createdSeller._doc;
    const token=jwt.sign({id:createdSeller._id,person:"Seller"},process.env.SECEAT_KEY,{expiresIn:"7d"});
    res.status(200).json({message:"Successfully Signup",seller:rest,token,isSuccess:true});

}