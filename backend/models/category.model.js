import mongoose from "mongoose";
const {Schema} = mongoose;

const categorySchema = new mongoose.Schema({
    title: {type:String,required:true},
    description: {type:String,required:true},
    price: {type:String,required:true},
    role: {type:number,required:true,default:0},
    instructor:{type:Schema.ObjectId,ref:'User',required:true},
    category:{type:Schema.ObjectId,ref:'Category',required:true},
});

const Category = mongoose.model("User",categorySchema);
export default Category;