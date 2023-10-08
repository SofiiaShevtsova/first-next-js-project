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
  return <PromptsList data={data} handleTagClick={()=>{}}/>;
};
