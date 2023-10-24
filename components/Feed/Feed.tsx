"use client";

import { useState, useEffect, ChangeEvent } from "react";

import { PromptsList } from "@components/PromptsList/PromptsList";


export const Feed = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [postsList, setPostsList]: [{}[] | null, any] = useState(null);

  const handleSearch = (event: ChangeEvent) => {
    const input = event.target as HTMLInputElement;
    input && setSearchQuery(input.value);
  };

  useEffect(() => {
    const getPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      setPostsList([...data]);
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
          onChange={handleSearch}
          className="search_input peer"
        />
      </form>
      {postsList && <PromptsList data={postsList} handleTagClick={() => {}} />}
    </section>
  );
};
