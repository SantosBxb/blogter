import Head from "next/head";
import React, { useContext, useEffect } from "react";
import Layout from "../components/layout/Layout";
import NuevoPost from "../components/NuevoPost";
import Post from "../components/Post";
import { FirebaseContext } from "../firebase";
import usePost from "../hooks/usePost";

const MisPublicaciones = () => {
  const { usuario } = useContext(FirebaseContext);

  const { posts } = usePost("creado");
  const misPosts = posts.filter((post) => post.creador.id == usuario.uid);

  return (
    <>
      <Head>
        <title>Mis Publicaciones</title>
      </Head>
      <Layout>
        {usuario ? (
          <>
            <NuevoPost />

            {misPosts.map((post) => (
              <Post key={post.id} post={post} />
            ))}
          </>
        ) : null}
      </Layout>
    </>
  );
};

export default MisPublicaciones;
