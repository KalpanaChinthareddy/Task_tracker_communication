import { NextResponse } from "next/server";
import User from "@/app/models/user";
import {connectMongoDB} from "@/app/lib/mongodb";
import bcrypt from "bcryptjs";

export async function POST(req) {
    try{
        const {name,email,password} = await req.json();
        const hashedPassword = await bcrypt.hash(password,10);
        await connectMongoDB();
        await User.create({name,email,password:hashedPassword });
        return NextResponse.json({message: "User Registered"},{status: 201});
    }catch(error){
    return NextResponse.json({message: "An error occured while registering the user"},
        {status: 500}
    );
    }
}