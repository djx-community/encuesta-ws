const mongoose = require("mongoose");
require ("dotenv").config();
mongoose
.connect(process.env.DB_URI)
.then(()=> {
    console.log("DB Connection Successfull");
})
.catch((err)=>{
    console.log(err.message)
})