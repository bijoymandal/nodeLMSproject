import express from "express";
import {getCategory} from '../controllers/category.controller.js';
const Categoryrouter = express.Router();

Categoryrouter.get('/',getCategory);
// Categoryrouter.post("/:id",getCategoryById);


export default Categoryrouter;