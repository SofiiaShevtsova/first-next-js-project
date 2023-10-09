import React from "react";
import { PromptsList } from "@components/PromptsList/PromptsList";

export const Profile = ({
  name,
  desc,
  data,
  handleEdit,
  handleDelete,
}: {
  name: string;
  desc: string;
  data: any[];
  handleEdit: Function;
  handleDelete: Function;
}) => {
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name} Profile</span>
      </h1>
      <p className="desc text-left">{ desc}</p>
      <PromptsList data={data} handleTagClick={() => {}} handleDelete={()=>{}} handleEdit={()=>{}}/>
    </section>
  );
};
