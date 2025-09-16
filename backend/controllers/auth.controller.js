import { token } from "morgan";
import {generateToken} from "../utils/jwt.js";
import User from "../models/user.model.js";
export const registerUser= async(req,res)=>{
    try{

        
        const {name,email,password} = req.body;

        // register user already exists or not checking 
        const existingUser = await User.findOne({email});
        if(existingUser)
        {
            res.status(400).json({message:"User With email already exists!"});
        }

        const user = new User({
            name,
            email,
            password
        });
        await user.save();
        res.status(201).json({userEmail:user.email,role:user.role,token:generateToken(user),message:"User Registration Successfully"})
    }
    catch(err)
    {
        console.log(err);
        res.status(500).send('Something went wrong!');
    }

}

export const loginUser = async(req,res)=>{
        try{

        
        const {email,password} = req.body;

        // register user already exists or not checking 
        const user = await User.findOne({email});
        if(!user)
        {
            res.status(401).json({message:"Invalid credentials!"});
        }
        const isMatchPassword = await user.matchPassword(password);
        if(!isMatchPassword) res.status(401).json({message:"Invalid credentials"});
        
        res.status(400).json({userEmail:user.email,role:user.role,token:generateToken(user),message:"User Login Successfully"})
    }
    catch(err)
    {
        console.log(err);
        res.status(500).send('Something went wrong!');
    }
}