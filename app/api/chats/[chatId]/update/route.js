import Chat from "@/app/models/chat";
import { connectMongoDB } from "@/app/lib/mongodb";

export const POST = async (req, { params }) => {
  try {
    await connectMongoDB()

    const body = await req.json()

    const { chatId } = params

    const { name, groupPhoto } = body

    const updatedGroupChat = await Chat.findByIdAndUpdate(
      chatId,
      { name, groupPhoto },
      { new: true }
    )

    return new Response(JSON.stringify(updatedGroupChat), { status: 200 })
  } catch (err) {
    return new Response("Failed to update group chat info", { status: 500 })
  }
}