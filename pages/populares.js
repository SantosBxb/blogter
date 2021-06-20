import React, { useContext, useState } from "react";
import Layout from "../components/layout/Layout";
import { FirebaseContext } from "../firebase";
import Post from "../components/Post";
import NuevoPost from "../components/NuevoPost";
import usePost from '../hooks/usePost'
const Populares = () => {
  const { posts } = usePost("likes");

  return (
    <Layout>
      {/* <NuevoPost /> */}

      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </Layout>
  );
};

export default Populares;
