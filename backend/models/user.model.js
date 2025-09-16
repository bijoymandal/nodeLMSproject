import mongoose from "mongoose";
import bcrypt from "bcrypt";

const {Schema} = mongoose;
const userSchema = new Schema({
    name: {type:String,required:true},
    email: {type:String,required:true,unique:true},
    password: {type:String,required:true},
    role: {type:String,enum:['student','instructor','admin'],default:"student"},
});

// Pre-save hook to hash password before saving
userSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next();

    try{
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password,salt);
        next();
    }
    catch(error)
    {
        console.log(error);
        next(error);
    }
});

//compare entered password with hashed password
userSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
};



const User = mongoose.model("User",userSchema);


export default User;