import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async () => {
  try {
    await connectToDB();
    const allPrompt = await Prompt.find().populate("creator");

    return new Response(JSON.stringify(allPrompt), { status: 200 });
  } catch (error) {
    return new Response("Fail!", { status: 500 });
  }
};
