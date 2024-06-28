import mongoose from "mongoose";
import validator from "validator";
//schema

const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'Name is compulsory']
    },
    LastName:{
        type: String,
    },
    email:{
        type:String,
        required:[true,'Email is Require'],
        unique:true,
        validate: validator.isEmail
    },
    password:{
        type:String,
        require:[true, 'Password required'],
        minlength:[6, "min 8 character rquired"],
    }, 
    location:{
        type: String,
        default:'India',
    },
    
},{timestamps:true});
export default mongoose.model('User', userSchema);