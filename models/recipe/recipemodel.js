const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// recipe schema 
const RecipeSchema = new mongoose.Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:"users",
        required:true
    },
    recipename:{
        type:String,
        required:true,

    },
    recipeImg:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    instructions:{
        type:String
    },
    ingredients:{
        type:Array,
        required:true
    },
    cookingTIme:{
        type:String,
        required:true
    }
},{timestamps:true});

// model 
const recipeModel = new mongoose.model("recipe",RecipeSchema);
module.exports = recipeModel;
