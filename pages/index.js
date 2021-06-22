import Layout from "../components/layout/Layout";
import NuevoPost from "../components/NuevoPost";
import usePost from "../hooks/usePost";
import Post from "../components/Post";
import NoAuth from "../components/NoAutn";
import { FirebaseContext } from "../firebase";
import { useContext } from "react";
import Head from "next/head";
export default function Home() {
  const { usuario } = useContext(FirebaseContext);
  const { posts } = usePost("creado");

  return (
    <>
      <Head>
        <title>Inicio</title>
      </Head>
      <Layout>
        {usuario ? <NuevoPost /> : <NoAuth />}
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </Layout>
    </>
  );
}
