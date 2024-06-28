// import packages
import express from "express";
import "express-async-errors";
import colors from 'colors';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from "morgan";
//import file
import connectDB from "./config/db.js";
// import routes
import testRoutes from './routes/testRoutes.js';
import authRoutes from './routes/authRoutes.js';
import errorMidleware from "./middlewares/errorMidlleware.js";


dotenv.config();

//connect dtabase

connectDB();


const app=express(); // function call and store

// middleware
app.use(express.json())
app.use(cors());
app.use(morgan("dev"));
// routes
app.use('/api/v1/test' ,testRoutes);
app.use('/api/v1/auth' ,authRoutes)

//validation Middleware/ error Middleware
app.use(errorMidleware)

// port
const PORT=process.env.PORT || 8080;
// listen
app.listen(PORT, ()=>{
    console.log(`server running in ${process.env.DEV_MODE}  on port ${PORT}`.bold)
})