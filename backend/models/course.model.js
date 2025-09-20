import mongoose from "mongoose";
const {Schema} = mongoose;
const courseSchema = new mongoose.Schema({
    title: {type:String,required:true},
    description: {type:String,required:true,unique:true},
    price: {type:String,required:true,default:0},
    instructor:{type:Schema.ObjectId,ref:'User',required:true},
    category:{type:Schema.ObjectId,ref:'Category',required:true},
});

const Course = mongoose.model("Course",courseSchema);
export default Course;