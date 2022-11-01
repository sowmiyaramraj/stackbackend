const mongo=require("../connect");
const bcrypt =require("bcrypt");
const jwt=require("jsonwebtoken");
exports.signup=async(req,res,next)=>{
    try{
        const existuser=await mongo.selectedDb
            .collection("users")
            .findOne({email:req.body.email});

            if(existuser){
               return res.status(400).send({msg:"you are a exist user"});
            }
            const issamepassword=checkPassword(req.body.passWord,req.body.confirmPassWord);
            if(!issamepassword)
               { return res.status(400).send({msg:"password doesnot match"});}
            
            else{
                delete req.body.confirmPassWord;
            }
            // encrypt password
            const randomString=await bcrypt.genSalt(10);
            
            req.body.passWord= await bcrypt.hash(req.body.passWord,randomString);
            
            // save in db
            const insertedResponce=await mongo.selectedDb
            .collection("users")
            .insertOne({...req.body});
            res.send(insertedResponce);
         
        }
        catch(err){
            console.error(err);
            res.status(500).send(err);
        }
      };
      const checkPassword=(passWord,confirmPassWord)=>{
        return passWord !== confirmPassWord ? false : true;
        };

exports.signin=async (req,res,next)=>{
    const existuser=await mongo.selectedDb
            .collection("users")
            .findOne({email:req.body.email});

            if(!existuser){
               return res.status(400).send({msg:"you are not a exist user"});
            }
    const issamepassword=await bcrypt.compare(req.body.passWord,existuser.passWord);
    if(!issamepassword){
        res.status(400).send({msg:"wrong password"});
    }
    const token=jwt.sign(existuser,"sey",{expiresIn:"1hr"});
    res.send(token);

};