import User from "@/app/models/user"
import { connectMongoDB } from "@/app/lib/mongodb";

export const GET = async (req, res) => {
  try {
    await connectMongoDB()

    const allUsers = await User.find()
    

    return new Response(JSON.stringify(allUsers), { status: 200 })
  } catch (err) {
    console.log(err)
    return new Response("Failed to get all users", { status: 500 })
  }
}