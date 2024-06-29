const jwt=require("jsonwebtoken");

module.exports.verifyUser=async (req,res,next)=>{

    const headers=req.headers.authorization;
    if (!headers || !headers.startsWith('Bearer ')) {
        return res.status(401).json({message:"You are not login",isSuccess:false})
    }
    const tokenFound=headers.split(" ")[1];
    
    let id;
    let person;
    jwt.verify(tokenFound,process.env.SECEAT_KEY,async (error,data)=>{
        if(error){
            return res.status(401).json({message:"You are not login",isSuccess:false});
            
        }
        id=data.id;
        person=data.person;
        
    });
    if(id===null){
        return res.status(401).json({message:"You are not login",isSuccess:false})
    }
    req.user={
        id:id,
        type:person
    }

    next();
}

module.exports.isSeller=(req,res,next)=>{
    if(req.user!==null && req.user.type!=="Seller"){
        return res.status(401).json({message:"You are not a Seller",isSuccess:false});
    }
    next();
}

module.exports.isUser=(req,res,next)=>{
    if(req.user!==null && req.user.type!=="User"){
        res.status(401).json({message:"You are not a Buyer",isSuccess:false});
    }else{
        next();
    }
    
}