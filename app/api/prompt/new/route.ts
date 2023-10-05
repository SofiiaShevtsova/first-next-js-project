import { connectToDB } from "@utils/database"
import Prompt from "@models/prompt"

export const POST = async (req: any) => {
    const { userId, prompt, tag } = await req.json()
    try {
        await connectToDB()  
        const newPrompt = new Prompt({
            creator: userId,
            prompt,
            tag
        })
        newPrompt.save()

        return new Response(JSON.stringify(newPrompt), {status:201})
    } catch (error) {
        return new Response("Fail!", {status:500})
    }
}