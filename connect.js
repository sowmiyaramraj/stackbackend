const {MongoClient}=require("mongodb");
const dotenv=require("dotenv");
dotenv.config();
module.exports={
    selectedDb:{},
    async connect() {
        try{
             const client=await MongoClient.connect("mongodb+srv://sowmiya:EtsuWidwsvZnEWZy@cluster0.yg13vwx.mongodb.net/test");
            this.selectedDb= client.db("stackoverflow");
            console.log(this.selectedDb);
        }catch(err){
            console.log(err);
        }
    },
};