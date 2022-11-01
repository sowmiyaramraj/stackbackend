const mongo = require("../connect");
const {ObjectId}= require("mongodb");

module.exports.getEmployees=async(req,res,next)=>{
    try{
        const getemployees= await mongo.selectedDb
        .collection("employee")
        .find().toArray();
        res.send(getemployees);
    }catch(err){
        res.status(500).send(getemployees);

    }
  
};

module.exports.updateEmployees=async(req,res,next)=>{
  try{
    const id=req.params.employeeid;
  const updatedresponce=await mongo.selectedDb
  .collection("employee")
  .findOneAndUpdate({_id:ObjectId(id)},
  {$set:{...req.body}},
 { returnDocument:"after"});
  res.send(updatedresponce);
}
  catch(err){
    console.error(err);
    res.status(500).send(err);
   }
};

module.exports.createEmployees=async(req,res,next)=>{
   try{
   const insertedresponse=await mongo.selectedDb
   .collection("employee")
   .insertOne(req.body);
   res.send(insertedresponse);
   }
   catch(err){
    console.error(err);
    res.status(500).send(err);
   }
};

module.exports.deleteEmployees=async(req,res,next)=>{
    try{
        const id=req.params.id;
        const deletedresponce=await mongo.selectedDb
        .collection("employee")
        .remove({_id:ObjectId(id)});
        res.send(deletedresponce);
    } catch(err){
        console.error(err);
        res.status(500).send(err);
       }
};