const express = require("express");
const router = express.Router();

// IMPORTS FIRST
const recipeUpload = require("../../multerconfig/recipeconfig/recipeconfig");
const recipeauthcontroller = require("../../controllers/recipes/recipecontrollers");
const userAuthentication = require("../../middleware/userAuthenticate");

// Routes
router.post("/create", userAuthentication, recipeUpload.single("recipeImg"), recipeauthcontroller.createRecipe);
router.patch("/update-recipe/:recipeid", userAuthentication, recipeUpload.single("recipeImg"), recipeauthcontroller.updateRecipeData);
router.delete("/deleterecipe/:recipeid", userAuthentication, recipeauthcontroller.deleteRecipeData);
router.get("/singleRecipe/:recipeid", recipeauthcontroller.getSingleRecipeData);
router.get("/recipeData", recipeauthcontroller.getRecipeData);

module.exports = router;
