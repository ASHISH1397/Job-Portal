import userModel from "../models/userModel.js";

export const registerController=async (req,res,next)=>{
    //try{   // remove due to import of express async error
        const { name , email, password } = req.body;

        if(!name){
           next("Name is required");
        }
        if(!email){
            next("please provide email");
        }
        if(!password){
            next("please provide password");
           
        }

        //vaidting unique user
        const existingUser=await userModel.findOne({ email })
        if(existingUser){
            next("Email Already Resister. Please Login");
        }

        const user= await userModel.create({name,email,password})
        res.status(201).send({
            success:true,
            message:"User Created Successfully",
            user,
        })
    //}
    // catch(error){
    //    next(error)
    // }
};