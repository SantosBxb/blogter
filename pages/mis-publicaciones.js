import React, { useContext } from 'react';
import Layout from '../components/layout/Layout'
import NuevoPost from '../components/NuevoPost';
import Post from '../components/Post';
import { FirebaseContext } from '../firebase';
import usePost from '../hooks/usePost';

const MisPublicaciones = () => {

  const { usuario } = useContext(FirebaseContext);

  const { posts } = usePost("creado");
  const misPosts = posts.filter(post => post.creador.id == usuario.uid)
  console.log(misPosts);

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