// error midllware || NEXT function

const errorMidleware = (err,req,res,next)=>{
    console.log(err)
    const defaultErrors={
        statusCode:500,
        message: err,
    }
    // res.status(500).send({
    //     success: false,
    //     message: "Something Went Wrong",
    //     err,
    // });
    
    //missing field error
    if(err.name==="validationError"){
        defaultErrors.statusCode=400;
        defaultErrors.message=object.values(err.errors)
        .map(item =item.message).join('.');

    }

    //duplicate error
    if(err.code&& err.code===11000){
        defaultErrors.statusCode=400
        defaultErrors.message=`${Object.keys(err.keyValue)} field has been nique`;
    }
    res.status(defaultErrors.statusCode).json({message: defaultErrors.message})
};
export default errorMidleware;