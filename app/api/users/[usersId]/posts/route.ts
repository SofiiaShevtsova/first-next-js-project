import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (req: any, { params }: {params: {usersId: string}}) => {
    const userId = params.usersId
  try {
    await connectToDB();
    const allUserPrompt = await Prompt.find({creator: userId}).populate("creator");

    return new Response(JSON.stringify(allUserPrompt), { status: 200 });
  } catch (error) {
    return new Response("Fail!", { status: 500 });
  }
};
