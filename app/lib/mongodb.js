import mongoose from "mongoose";

export const connectMongoDB = async() => {
    try{
        await mongoose.connect(process_params.env.MONGODB_URI);
        console.log("Conneted to MongoDB");
    }catch(error){
        console.log("Error connection",error);

    }
};