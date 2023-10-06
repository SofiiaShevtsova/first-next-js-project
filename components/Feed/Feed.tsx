"use client";

import { useState, useEffect, ChangeEvent } from "react";

import { PromptCard } from "@components/commons";

const PromptsList = ({
  data,
  handlerTagClick,
}: {
  data: { prompt: string; tag: string; _id: string }[];
  handlerTagClick: Function;
}) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((el) => (
        <PromptCard />
      ))}
    </div>
  );
};

export const Feed = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [postsList, setPostsList] = useState([]);

  const handlerSearch = (event: ChangeEvent) => {
    const input = event.target as HTMLInputElement;
    input && setSearchQuery(input.value);
  };

  useEffect(() => {
    const getPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      setPostsList(data);
    };

    getPosts();
  }, []);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search ..."
          value={searchQuery}
          onChange={handlerSearch}
          className="search_input peer"
        />
      </form>
      <PromptsList data={postsList} handlerTagClick={() => {}} />
    </section>
  );
};
