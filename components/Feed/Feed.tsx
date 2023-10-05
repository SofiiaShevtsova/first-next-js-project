"use client";

import { useState, useEffect, ChangeEvent } from "react";

import { PromptCard } from "@components/commons";

export const Feed = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handlerSearch = (event: ChangeEvent) => {
    const input = event.target as HTMLInputElement;
    input && setSearchQuery(input.value);
  };

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
    </section>
  );
};
