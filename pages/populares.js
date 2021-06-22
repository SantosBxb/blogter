import React, { useContext, useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import { FirebaseContext } from "../firebase";
import Post from "../components/Post";
import usePost from "../hooks/usePost";
import { useRouter } from "next/router";
import Head from "next/head";
import NoAuth from "../components/NoAutn";

const Populares = () => {
  const { usuario } = useContext(FirebaseContext);

  const { posts } = usePost("likes");
  return (
    <>
      <Head>
        <title>Populares</title>
      </Head>
      <Layout>
      {!usuario && <NoAuth/>} 
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </Layout>
    </>
  );
};

export default Populares;
