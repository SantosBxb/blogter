import React, { useEffect, useState } from "react";
import Post from "../components/Post";
import usePost from "../hooks/usePost";
import Layout from "../components/layout/Layout";
import { useRouter } from "next/router";

export default function Buscar() {
  const router = useRouter();
  const {
    query: { q },
  } = router;

  // todos los productos
  const { posts } = usePost("creado");
  const [resultado, setResultado] = useState([]);

  useEffect(() => {
    const busqueda = q.toLowerCase();
    const filtro = posts.filter((post) => {
      return (
        post.descripcion.toLowerCase().includes(busqueda) ||
        post.creador.nombre.toLowerCase().includes(busqueda)
      );
    });
    setResultado(filtro);
  }, [q, posts]);
  return (
    <Layout>
      {resultado.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </Layout>
  );
}
