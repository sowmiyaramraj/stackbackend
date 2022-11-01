const express=require("express");
const router=express.Router();
const questionmodule=require("../module/questionmodule");
const auth=require("../module/authmodule");


router.get("/get",questionmodule.getquestion);

router.put("/update/:employeeid",auth.authorizeuser,questionmodule.updatequestion);

router.delete("/delete/:id",auth.authorizeuser,questionmodule.deletequestion);

router.post("/create",questionmodule.createquestion);

module.exports=router;