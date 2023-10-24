import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (
  req: any,
  { params }: { params: { postId: string } }
) => {
  const postId = params.postId;
  try {
    await connectToDB();
    const prompt = await Prompt.findById(postId).populate("creator");
    if (!prompt) {
      return new Response("Not found!", { status: 404 });
    }

    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    return new Response("Fail!", { status: 500 });
  }
};

export const PATCH = async (
  req: any,
  { params }: { params: { postId: string } }
) => {
  const postId = params.postId;
  const { prompt, tag } = await req.json();
  try {
    await connectToDB();
    const updatedPrompt = await Prompt.findByIdAndUpdate(postId, {
      prompt,
      tag,
    }).populate("creator");
    if (!updatedPrompt) {
      return new Response("Not found!", { status: 404 });
    }

    return new Response(JSON.stringify(updatedPrompt), { status: 201 });
  } catch (error) {
    return new Response("Fail!", { status: 500 });
  }
};

export const DELETE = async (
  req: any,
  { params }: { params: { postId: string } }
) => {
  const postId = params.postId;
  try {
    await connectToDB();
    await Prompt.findByIdAndRemove(postId);

    return new Response("Success!", { status: 201 });
  } catch (error) {
    return new Response("Fail!", { status: 500 });
  }
};
