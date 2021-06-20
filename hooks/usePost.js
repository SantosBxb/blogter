import React, { useContext, useEffect, useState } from "react";
import { FirebaseContext } from "../firebase";

const usePost = (orden) => {
  const [posts, setposts] = useState([]);
  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    const obtenerPosts = () => {
      firebase.db
        .collection("post")
        .orderBy(orden, "desc")
        .onSnapshot(manejarSnapshot);
    };
    obtenerPosts()
  }, []);

  function manejarSnapshot(snapshot) {
    const posts = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
    setposts(posts);
  }
  return {
    posts 
  };
};

export default usePost;
