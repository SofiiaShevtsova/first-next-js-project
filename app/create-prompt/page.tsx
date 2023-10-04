"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { Form } from "@components/commons";

const CreatePrompt = () => {
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });

  const createPrompt = async (event) => {};

  return (
    <Form
      type={"Create"}
      post={post}
      setPost={setPost}
      submitting={submitting}
      handlerSubmit={createPrompt}
    />
  );
};

export default CreatePrompt;
