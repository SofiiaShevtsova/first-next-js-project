"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Profile } from "@components/commons";

const ProfilePage = () => {
  const { data: session } = useSession();
  const [postsList, setPostsList]: [any[], any] = useState([]);
  const router = useRouter();

  const handleEdit = (post: { _id: string }) => {
    router.push(`/update-prompt?postId=${post._id}`);
  };

  const handleDelete = async (post: { _id: string }) => {
    const hasConfirmed = confirm("Are you sure you want delete this prompt?")
    if (!hasConfirmed) return;
    try {
      const response = await fetch(`/api/prompt/${post._id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getUserPosts = async () => {
      const response = await fetch(`/api/users/${session?.user?.id}/posts`);
      const data = await response.json();
      setPostsList([...data]);
    };

    session?.user?.id && getUserPosts();
  }, [session?.user?.id]);

  return (
    <Profile
      name="My"
      desc="Wellcome to your personalized profile page"
      data={postsList}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default ProfilePage;
