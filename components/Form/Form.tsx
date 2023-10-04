import { FormEventHandler } from "react";
import Link from "next/link";

export const Form = ({
  type,
  post,
  setPost,
  submitting,
  handlerSubmit,
}: {
  type: string;
  post: { prompt: string; tag: string };
  setPost: any;
  submitting: boolean;
  handlerSubmit: FormEventHandler<HTMLFormElement>;
}) => {
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{type} Post</span>
      </h1>
      <p className="desc text-left max-w-md">
        {type} and share amazing prompts with the world, and let your
        imagination run wild with any AI-powered platform.
      </p>
      <form
        onSubmit={handlerSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        <label htmlFor="prompt">
          <span className="font-satoshi font-semibolt text-base text-gray-700">
            Your AI prompt
          </span>
          <textarea
            name="prompt"
            id="prompt"
            value={post.prompt}
            onChange={(event) => {
              setPost({ ...post, prompt: event.target.value });
            }}
            placeholder="Write your prompt here..."
            required
            className="form_textarea"
          />
        </label>
        <label htmlFor="tag">
          <span className="font-satoshi font-semibolt text-base text-gray-700">
            Tag {"  "}
            <span>(#product, #idea, #knowhow)</span>
          </span>
          <input
            name="tag"
            id="tag"
            value={post.tag}
            onChange={(event) => {
              setPost({ ...post, tag: event.target.value });
            }}
            placeholder="#tag"
            required
            className="form_input"
          />
        </label>
        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href={"/"} className="text-gray-500 text-sm">
            Cancel
          </Link>
          <button
            type="submit"
            className="px-5 py-1.5 text-sm bg-primary-orange text-white rounded-full"
            disabled={submitting}
          >
            {submitting ? `${type}...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};
