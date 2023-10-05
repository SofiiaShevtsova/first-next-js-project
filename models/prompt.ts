import { Schema, model, models } from "mongoose";

const PromptSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "Users",
  },
  prompt: {
    type: String,
    require: [true, "Prompt must exists!"],
    min: 3,
  },
  tag: {
    type: String,
    require: [true, "Tag must exists!"],
  },
});

const Prompt = models.Prompt || model("Prompt", PromptSchema);

export default Prompt;
