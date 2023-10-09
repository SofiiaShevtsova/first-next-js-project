"use client";

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

import copyBTN from "@public/assets/icons/copy.svg";
import tickBTN from "@public/assets/icons/tick.svg";

export const PromptCard = ({
  post,
  handleTagClick,
  handleEdit,
  handleDelete,
}: {
  post: any;
  handleTagClick?: Function;
  handleEdit?: Function;
  handleDelete?: Function;
}) => {
  const [copied, setCopied] = useState("");

  const copyPrompt = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(""), 5000);
  };

  return (
    <div className="prompt_card">
      <div className="flex justify-between item-start gap-5">
        <div className="flex-1 flex justify-start item-center gap-3 cursor-pointer">
          {post.creator.image && (
            <Image
              src={post.creator.image}
              alt={"user"}
              width={40}
              height={40}
              className="rounded-full object-containe"
            />
          )}
          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {post.creator.username}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {post.creator.email}
            </p>
          </div>
        </div>
        <div className="copy_btn cursor-pointer" onClick={copyPrompt}>
          <Image
            src={copied === post.prompt ? tickBTN : copyBTN}
            alt={"copy"}
            width={12}
            height={12}
          />
        </div>
      </div>
      <p className="my-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>
      <p
        className="font-inter text-sm blue_gradient cursor-pointer"
        onClick={() => {
          handleTagClick && handleTagClick(post.tag);
        }}
      >
        {post.tag}
      </p>
      {handleEdit && <></>}
      {handleDelete && <></>}
    </div>
  );
};
