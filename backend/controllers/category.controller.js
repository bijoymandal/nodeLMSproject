import Category from "../models/category.model.js";
export const getCategory = async()=>{
    try{
        const categories = await Category.find({});
        return res.status(200).json({message:"Category fetch successfully",data:categories});
    }
    catch(error)
    {
        console.log(error);
        return res.status(500).json({message:"server error"});
    }   
}