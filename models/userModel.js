import mongoose from "mongoose";
import validator from "validator";
import JWT from "jsonwebtoken";
import bcrypt from "bcryptjs";
//schema

const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'Name is compulsory']
    },
    lastName:{
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
        success:true,
    }, 
    location:{
        type: String,
        default:'India',
    },
    
},{timestamps:true});

//for securing password using Bcrypt
userSchema.pre('save',async function(){
    if(!this.isModified) return ;
    const salt=await bcrypt.genSalt(10);
    this.password= await bcrypt.hash(this.password,salt);
});

// compare password
userSchema.methods.comparePassword= async function(userPasword){
    const isMatch= await bcrypt.compare(userPasword,this.password)
        return isMatch;
};

//ceating JWT/jSON webtoken
userSchema.methods.createJWT= function(){
    return JWT.sign({userId:this._id},
        process.env.JWT_SECRET,{
        expiresIn:"1d"
    })
}
export default mongoose.model('User', userSchema);