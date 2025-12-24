require("dotenv").config();
const express = require("express");
const app = express();
require("./db/connection");
const cors= require("cors");
const { ServerApiVersion } = require("mongodb");
const port = 5002;

app.use(cors());
app.use(express.json());
app.get("/",(req,res)=>{
    res.status(200).json("server start");
});

const recipeauthroutes = require("./routes/recipe/recipeauthroutes");

// user routes
const userAuthRoutes = require("./routes/users/userAuthroutes");
app.use("/userauth/api",userAuthRoutes);

// recipe routes
const reciperoutes = require("./routes/recipe/recipeauthroutes");
app.use("/recipe/api",recipeauthroutes);


// review routes
const reviewroutes = require("./routes/reviews/reviewAuthRoutes");
app.use("/review/api",reviewroutes);

// server start 
app.listen(port,()=>{
    console.log(`server start at port no ${port}`)
}
)