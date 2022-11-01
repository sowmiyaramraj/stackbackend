const jwt=require("jsonwebtoken");

exports.authenticateuser=(req,res,next)=>{
    console.log(req.headers.accesstoken);
    if(!req.headers.accesstoken){
        return res.status(400).send({msg:"Token not found"});
        }
        try{

           const user= jwt.verify(req.headers.accesstoken,"sey");
            req.body.currentuser=user;
            next();
        }catch(err){
            console.log(err);
            return res.status(400).send({msg:"Unathorised"});
        }
};
exports.authorizeuser=(req,res,next)=>{
    
    if(req.body.currentuser.role==="admin"){
        next();

    }else{
        res.status(400).send({msg:"Forbitten error"});
    }
};