const express=require("express");
const registermodule=require("../module/registermodule");
const router=express.Router();

router.post("/signup",registermodule.signup);
router.post("/signin",registermodule.signin);

module.exports=router;