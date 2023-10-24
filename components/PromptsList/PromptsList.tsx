import { PromptCard } from "./PromptCard";

export const PromptsList = ({
  data,
  handleTagClick,
  handleEdit,
  handleDelete,
}: {
  data: { prompt: string; tag: string; _id: string }[];
  handleTagClick?: Function;
  handleEdit?: Function;
  handleDelete?: Function;
}) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((el) => (
        <PromptCard
          key={el._id}
          post={el}
          handleTagClick={handleTagClick}
          handleEdit={() => { handleEdit && handleEdit(el) }}
          handleDelete={() => { handleDelete && handleDelete(el) }}
        />
      ))}
    </div>
  );
};
