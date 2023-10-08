"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Profile } from "@components/commons";

const ProfilePage = () => {
    const { data: session } = useSession();
    const [postsList, setPostsList]: [any[], any] = useState([])

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
      handleEdit={() => {}}
      handleDelete={() => {}}
    />
  );
};

export default ProfilePage;
