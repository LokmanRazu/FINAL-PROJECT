const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const dotenv = require('dotenv')
dotenv.config({path:'./config.env'});


const app = express();
app.use(express.json());
app.use(morgan("combined"));


// Non-existing and API Error Handling
app.all("*", (req, res, next) => {
  res.status(404).json({
    status: "fail",
    message: `Can't find ${req.originalUrl} on this server`,
  });
});

app.get('/',(req,res)=>{
    res.send('HIIIIIIIIIIIIIII');
});

// ERROR HANDLING Middleware
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "ErrorHappend";

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

const db = process.env.DATABASE.replace("<password>", process.env.DB_PASSWORD); 
mongoose.connect(db, { useNewUrlParser: true }).then((con) => {
  console.log("Database Connected Successfully");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`APP IS RUNNING ON ${PORT}`);
});
