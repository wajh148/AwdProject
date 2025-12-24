
const recipeDB = require("../../models/recipe/recipemodel")
const cloudinary = require("../../cloudinery/cloudinery");
const { skipMiddlewareFunction } = require("mongoose");
// create recipe 
exports.createRecipe = async(req,res)=>{
     const file = req.file ? req.file.path :"";
    const {recipename,description,instruction,ingredients,cookingtime} = req.body;
if(!recipename|| !description || !instruction || !ingredients || !cookingtime){
    res.status(400).json({error:"al field are required"})
}
 const upload = await cloudinary.uploader.upload(file);
 try {
       recipeData = new recipeDB({
        userId:req.userId,recipename,description,instruction,ingredients,cookingtime,recipeImg:upload.secure_url
       });
       await recipeData.save();
       res.status(200).json({message : " recipe create successfully ",recipeData})
 } catch (error) {
    console.log("error",error)
    res.status(200).json({error:error})
 }
}

// recipe update 
exports.updateRecipeData = async(req,res)=>{
      const {recipeid}=req.params;

         const file = req.file ? req.file.path :"";
    const {recipename,description,instruction,ingredients,cookingtime} = req.body;
    var upload;
    if(file){
        upload = await cloudinary.uploader.upload(file);
    }
    try {
        const updateRecipe = await recipeDB.findByIdAndUpdate({_id:recipeid},{
                 userId:req.userId,recipename,description,instruction,ingredients,cookingtime,recipeImg:upload && upload.secure_url   
        },{new:true});
        await updateRecipe.save();
        res.status(200).json({message:"recipe successfully updated",updateRecipe})
    } catch (error) {
            console.log("error",error)
    res.status(200).json({error:error})
    }
}

// delete recipe data
exports.deleteRecipeData = async(req,res)=>{
    const {recipeid} = req.params;

    try {
        const deleterecipe = await recipeDB.findByIdAndUpdate({_id:recipeid});
        res.status(200).json({message:"recipe successsfuly deleted",deleterecipe});
    } catch (error) {
        console.log("error",error)
    res.status(200).json({error:error})
    }
}
// get single recipe data
exports.getSingleRecipeData = async(req,res)=>{
       const {recipeid} = req.params;

    try {
        const getSingleRecipe = await recipeDB.findOne({_id:recipeid});
        res.status(200).json(getSingleRecipe);
    } catch (error) {
        console.log("error",error)
    res.status(200).json({error:error})
    } 
}

// getrecipedata 
exports.getRecipeData = async(req,res)=>{
    const {page,search} = req.query;
    const pagenum = page || 1
    const searchvalue = search || "";
    const ITEM_PER_PAGE = 4;
      
    const query = {
        recipename :{$regex:searchvalue,$options:"i"}

    }
    console.log("query",query)

     try {
        const skip = (pagenum - 1) * ITEM_PER_PAGE  //0
        
        // recipe count
        const count = await recipeDB.countDocuments(query);
       
        //page
        const pagecount = await Math.ceil(count/ITEM_PER_PAGE);

        const allRecipeData = await recipeDB.aggregate([
            {
                $match : query

            },
            {
                $skip:skip  

            },
            {
                $limit:ITEM_PER_PAGE
            },
            {
                $lookup:{
                    from:"users",
                    localField:"userId",
                    foreignField:"_id",
                    as:"userData"
                }
            }
        ]);
        res.status(200).json({
            allRecipeData,
            Pagination:{
                totalrecipeCount:count,pagecount
            }
        })


     } catch (error) {
    
        console.log("error",error)
    res.status(200).json({error:error})
    
     }
}