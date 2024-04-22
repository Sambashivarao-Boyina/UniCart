const jwt=require("jsonwebtoken");

module.exports.verifyUser=async (req,res,next)=>{

    const headers=req.headers.authorization;
    if (!headers || !headers.startsWith('Bearer ')) {
        return 
    }
    const tokenFound=headers.split(" ")[1];
    
    let id;
    let person;
    jwt.verify(tokenFound,process.env.SECEAT_KEY,async (error,data)=>{
        if(error){
            return ;
        }
        id=data.id;
        person=data.person;
        
    });
    if(id===null){
        return res.status(401).json({message:"You are not login"})
    }
    req.user={
        id:id,
        type:person
    }

    next();
}

module.exports.isSeller=(req,res,next)=>{
    console.log(req.user);
    if(req.user!==null && req.user.type!=="Seller"){
        return res.status(401).json({message:"You are not a Seller",isSuccess:false});
    }
    next();
}