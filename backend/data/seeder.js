import fs from 'fs';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Course from '../models/course.model.js';
import User from '../models/user.model.js';
import Category from "../models/category.model.js";
import connectDB from '../config/db.js';
import path from 'path';
import { fileURLToPath } from "url";
import bcrypt from "bcrypt";

dotenv.config();
connectDB();
// const __dirname = path.resolve();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const insertData = async()=>{
    try{
            //clear the database
        await Course.deleteMany();
        await Category.deleteMany();
        await User.deleteMany();

        //inser user data
        const userData = JSON.parse(fs.readFileSync(path.join(__dirname,"../data/users.json"),"utf-8"));

        const userWithHashedPass = await Promise.all(
            userData.map(async (user) => {
                const plainPassword = user.password || "123456"; // fallback
                const salt = await bcrypt.genSalt(10);
                const hashPassword = await bcrypt.hash(String(plainPassword), salt);
                return { ...user, password: hashPassword };
            })
        );

        const createUsers = await User.insertMany(userWithHashedPass);
        const instructorUser = createUsers.find((user)=>user.role === 'instructor');

        //insert category Data
        const categoryData = JSON.parse(fs.readFileSync(path.join(__dirname,"../data/category.json"),"utf-8"));
        const createCategory = await Category.insertMany(categoryData);

        const webDevCategory = createCategory.find((category)=>category.name === 'Web Dev');

        //insert course
        const course = [{
            title : "complete Web dev course 2025",
            description:"Random Text about the course: command not found:as",
            price:99,
            instructor:instructorUser.id,
            category:webDevCategory.id
        }];
        await Course.insertMany(course);
        
        console.log("Data is successfully added to database");
        process.exit();
    }
    catch(error)
    {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }

}

const destroyData = async ()=>{
    console.log('Data Destroyed!');
    process.exit();
};

if(process.argv[2]==='-d')
{
    destroyData();
}
else
{
    insertData();
}