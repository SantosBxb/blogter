import React, { useContext, useEffect, useState } from "react";
import Comentario from "./Comentario";
import { intlFormat, toDate } from "date-fns";
import { es } from "date-fns/locale";
import { FirebaseContext } from "../firebase";
import Router from "next/router";
import NoAuth from "./NoAutn";
import { Img } from "./ui/Img";

const Post = ({ post }) => {
  let { usuario, firebase } = useContext(FirebaseContext);
  if(!usuario){
    usuario = {}
    usuario.uid = "1"
  }
  const { descripcion, comentarios, urlImg, likes, creador, dioLike, id } =
    post;

  const [comentario, setComentario] = useState({});
  const [postActual, setPostActual] = useState(post);

  const [displayComentarios, setdisplayComentarios] = useState("d-none");
  const clickComentarios = () => {
    setdisplayComentarios(displayComentarios === "" ? "d-none" : "");
  };
  const handleChange = (e) => {
    setComentario({ [e.target.name]: e.target.value });
  };
  const creado = intlFormat(
    new Date(post.creado),
    {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    },
    {
      locale: es,
    }
  );

  const likePost = () => {
    if(usuario.uid == "1"){
      Router.push("iniciar-sesion")
      return 
    }
    if (dioLike.includes(usuario.uid)) {
      var newLikes = likes - 1;
      var newDioLike = dioLike.filter((dio) => dio !== usuario.uid);
    } else {
      var newLikes = likes + 1;
      var newDioLike = [...dioLike, usuario.uid];
    }
    // actualizar en la base de datos
    firebase.db
      .collection("post")
      .doc(id)
      .update({ likes: newLikes, dioLike: newDioLike });

    // actualizar state
    setPostActual({
      ...postActual,
      likes: newLikes,
      dioLike: newDioLike,
    });
    // setConsultarDB(true);
  };

  const comentarioChange = (e) => {
    setComentario({ [e.target.name]: e.target.value });
  };
  const agregarComentario = (e) => {
    e.preventDefault();
    if(usuario.uid == "1"){
      Router.push("iniciar-sesion")
      return 
    }
    // agregar info creador
    comentario.idUsuario = usuario.uid;
    comentario.nombreUsuario = usuario.displayName;
    comentario.urlFoto = usuario.photoURL;
    comentario.creado = Date.now();

    const newsComentarios = [...comentarios, comentario];
    // subir a bd
    firebase.db
      .collection("post")
      .doc(id)
      .update({ comentarios: newsComentarios });
    // actualizar state
    setPostActual({
      ...postActual,
      comentarios: newsComentarios,
    });
    setComentario({ comentario: "" });
  };

  const puedeBorrar = () => {
    if (!usuario) return false;
    if (creador.id == usuario.uid) return true;
  };
  const eliminarProducto = async () => {
    try {
      await firebase.db.collection("post").doc(id).delete();
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
    <div className="row justify-content-center g-0 mt-4 mx-2">
      <div className="col-lg-8 shadow-lg rounded-3 shadow-lg card bg-app">
        <div className=" d-flex justify-content-between">
          <div className='m-2 d-flex align-items-center'>
            <div className="mx-2 pt-1">
              <Img
                className="rounded-circle"
                src={creador.urlFoto}
                alt="Picture of the author"
                width={40}
                height={40}
              />
            </div>
            <div className="mx-2">
              <h6 className="mb-0 text-primary">{creador.nombre}</h6>
              <small className="text-secondary">{creado}</small>
            </div>
          </div>
          <div className="align-self-center mx-3">
            {puedeBorrar() ? (
              <button className="btn btn-sm btn-outline-danger "
                onClick={eliminarProducto}
              >
                Eliminar
              </button>
            ) : null}
          </div>
        </div>

        <div className="mx-3 text-light">
          <p>{descripcion}</p>
        </div>
        
        <div className='image-container '>
          <Img src={urlImg} className={'image'} alt="image" />
        </div>

        <div className="card bg-dark bg-secondary mx-2 shadow text-light">
          <div className="d-flex justify-content-around">
            <button
              className={`btn btn-hover-2 w-50 bg-app mx-1 my-1 text-${
                dioLike.includes(usuario.uid) ? "info" : "light"
              }`}
              onClick={likePost}
            >
              {likes} Likes
            </button>
            <button
              className={`btn btn-hover-2 w-50 bg-app mx-1 my-1 text-${
                displayComentarios === "" ? "info" : "light" 
              }`}
              onClick={clickComentarios}
            >
              {displayComentarios ? `Ver ${comentarios.length} Comentarios` : "Ocultar Comentarios"}
            </button>
          </div>
        </div>
        <form className="m-2 d-flex" onSubmit={agregarComentario}>
          <textarea
            type="text"
            className="form-control no-resize h-3 mx-2 mt-2 bg-dark text-light"
            placeholder="Escribe un comentario"
            name="comentario"
            value={comentario.comentario}
            onChange={comentarioChange}
          ></textarea>
          <input
            type="submit"
            className="btn btn-outline-info m-2 align-self-center"
            value="Comentar"
          />
        </form>
        <div className={`card bg-dark ${displayComentarios}`}>
          {comentarios.map((comentario, i) => (
            <Comentario
              key={`${comentario.idUsuario}-${i}`}
              comentario={comentario}
            />
          ))}
        </div>
      </div>
    </div>
    </>
  );
};

export default Post;
