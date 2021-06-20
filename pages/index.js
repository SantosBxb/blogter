import { PostAddSharp } from "@material-ui/icons";
import Link from "next/link";
import Layout from "../components/layout/Layout";
import NuevoPost from "../components/NuevoPost";
import usePost from "../hooks/usePost";
import Post from "../components/Post";
export default function Home() {
  const { posts } = usePost("creado");

  return (
    <Layout>
      <NuevoPost />

      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </Layout>
  );
}
