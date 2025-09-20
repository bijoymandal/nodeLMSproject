import express from "express";
import {getCourse,getCourseById} from '../controllers/course.controller.js';
const Courserouter = express.Router();

Courserouter.get('/',getCourse);
Courserouter.post("/:id",getCourseById);


export default Courserouter;