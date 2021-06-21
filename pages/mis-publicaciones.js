import { useRouter } from 'next/router';
import React, { useContext, useEffect } from 'react';
import Layout from '../components/layout/Layout'
import NuevoPost from '../components/NuevoPost';
import Post from '../components/Post';
import { FirebaseContext } from '../firebase';
import usePost from '../hooks/usePost';

const MisPublicaciones = () => {

  const { usuario } = useContext(FirebaseContext);
  const router = useRouter();
  useEffect(() => {
    if (!usuario){
      router.push("/iniciar-sesion")
    }
  }, []);

  const { posts } = usePost("creado");
  const misPosts = posts.filter(post => post.creador.id == usuario.uid)

  return (
    <Layout>
    <NuevoPost />

    {misPosts.map((post) => (
      <Post key={post.id} post={post} />
    ))}
  </Layout>
  );
}
 
export default MisPublicaciones;