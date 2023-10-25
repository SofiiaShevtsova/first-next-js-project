"use client";

import { useState, useEffect, ChangeEvent, FormEvent } from "react";

import { PromptsList } from "@components/PromptsList/PromptsList";

export const Feed = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [postsList, setPostsList]: [
    { prompt: string; tag: string; _id: string }[] | [],
    any
  ] = useState([]);
  const [list, setList]: [
    { prompt: string; tag: string; _id: string }[] | [],
    any
  ] = useState([]);

  const handleSearch = (event: ChangeEvent) => {
    const input = event.target as HTMLInputElement;
    input && setSearchQuery(input.value.trim());
  };

  const handleTagClick = (tag: string) => {
    setSearchQuery(tag);
  };

  useEffect(() => {
    const getPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      setPostsList([...data]);
      setList([...data]);
    };

    getPosts();
  }, []);

  useEffect(() => {
    if (postsList.length === 0) return;
    if (searchQuery === "") {
      setList(postsList);
    } else if (searchQuery.startsWith("#")) {
      const newList = postsList.filter(
        (el) => el.tag.toLowerCase().search(searchQuery.toLowerCase()) !== -1
      );
      setList(newList);
    } else if (searchQuery) {
      const newList = postsList.filter(
        (el) => el.prompt.toLowerCase().search(searchQuery.toLowerCase()) !== -1
      );
      setList(newList);
    }
  }, [postsList, searchQuery]);

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
      {list.length !== 0 && <PromptsList data={list} handleTagClick={handleTagClick} />}
    </section>
  );
};
