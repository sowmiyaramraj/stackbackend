const mongo = require("../connect");
const {ObjectId}= require("mongodb");

module.exports.getquestion=async(req,res,next)=>{
    try{
        const getquestion= await mongo.selectedDb
        .collection("question")
        .find().toArray();
        res.send(getquestion);
    }catch(err){
        res.status(500).send(getquestion);

    }
  
};

module.exports.updatequestion=async(req,res,next)=>{
  try{
    const id=req.params.questionid;
  const updatedresponce=await mongo.selectedDb
  .collection("question")
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

module.exports.createquestion=async(req,res,next)=>{
   try{
   const insertedresponse=await mongo.selectedDb
   .collection("question")
   .insertMany(req.body);
   res.send(insertedresponse);
   }
   catch(err){
    console.error(err);
    res.status(500).send(err);
   }
};

module.exports.deletequestion=async(req,res,next)=>{
    try{
        const id=req.params.id;
        const deletedresponce=await mongo.selectedDb
        .collection("question")
        .remove({_id:ObjectId(id)});
        res.send(deletedresponce);
    } catch(err){
        console.error(err);
        res.status(500).send(err);
       }
};