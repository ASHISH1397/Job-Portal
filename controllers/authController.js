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

        //Token
        const token = user.createJWT();
;        res.status(201).send({
            success:true,
            message:"User Created Successfully",
            user:{
                name:user.name,
                lastName:user.lastName,
                email:user.email,
                location:user.location,

            },
            token,
        })
    //}
    // catch(error){
    //    next(error)
    // }
};
//login
export const loginController = async (req, res, next) => {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      next("Please Provide All Fields");
    }
    //find user by email
    const user = await userModel.findOne({ email }).select("+password");
    if (!user) {
      next("Invalid Useraname or password");
    }
    //compare password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      next("Invalid Useraname or password");
    }
    user.password = undefined;
    const token = user.createJWT();
    res.status(200).json({
      success: true,
      message: "Login SUccessfully",
      user,
      token,
    });

};