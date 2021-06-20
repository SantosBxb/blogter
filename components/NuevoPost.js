import React, { useContext, useEffect, useState } from "react";
import { FirebaseContext } from "../firebase";
// importar fileuploader
import FileUploader from "react-firebase-file-uploader";

import { useRouter } from "next/router";
// import "bootstrap/dist/js/bootstrap.bundle"

const NuevoPost = () => {
  const [descripcion, setdescripcion] = useState("");
  const [heightTextArea, setheightTextArea] = useState("h-4");
  // state imagenes
  const [nombreImg, setNombreImg] = useState("");
  const [subiendo, setSubiendo] = useState(false);
  const [progreso, setProgreso] = useState(0);
  const [urlImg, setUrlImg] = useState("");

  const [noSubida, setNoSubida] = useState("");

  const [error, setError] = useState(null);

  // context las operaciones crud de firebase
  const { usuario, firebase } = useContext(FirebaseContext);
  const router = useRouter();

  async function crearPost() {
    // si no hay usuario
    if (!usuario) {
      return router.push("/iniciar-sesion");
    }

    // crear el objeto del nuevo post
    const post = {
      nombreImg,
      urlImg,
      descripcion,
      likes: 0,
      comentarios: [],
      creado: Date.now(),
      idCreador:usuario.uid,
      creador: {
        id: usuario.uid,
        nombre: usuario.displayName,
        urlFoto: usuario.photoURL,
      },
      dioLike: [],
    };

    // insertar en la base de datos
    await firebase.db.collection("post").add(post);

    setNoSubida("");
    setNombreImg("");
    setSubiendo(false);
    setProgreso(0);
    setUrlImg("");
    // return router.push("/");
  }

  const handleUploadStart = () => {
    setProgreso(0);
    setSubiendo(true);
  };

  const handleProgress = (progreso) => setProgreso({ progreso });

  const handleUploadError = (error) => {
    setSubiendo(error);
  };

  const handleUploadSuccess = (nombre) => {
    setProgreso(100);
    setSubiendo(false);
    setNombreImg(nombre);
    firebase.storage
      .ref("post")
      .child(nombre)
      .getDownloadURL()
      .then((url) => {
        setUrlImg(url);
      });
  };

  const handleChange = (e) => {
    setdescripcion(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (descripcion === "") {
      setError("Agregue contenido a su Post");
      return;
    }
    crearPost();
    setError(null);
    setdescripcion("");
  };

  const handleBlur = () => {
    if (descripcion.trim() === "") {
      setError("Agregue contenido a su Post");
    } else {
      setError("");
    }
  };
 
  return (
    <section onBlur={() => setError("")}>
      <div className="row justify-content-center g-0 mt-4 mx-2">
        <div className="col-lg-8 card shadow-lg rounded-3">
          <h3 className="card-title m-3 mb-2 shadow text-center ">
            Realiza una nueva Publicacion
          </h3>
          <form className="form mx-2 mt-3" onSubmit={handleSubmit}>
            <div className={`form-floating ${heightTextArea}`}>
              <textarea
                type="textarea"
                className={`form-control card-subtitle bg-secondary fs-6 no-resize ${heightTextArea} ${
                  error && "is-invalid"
                }`}
                placeholder="-"
                id="descripcion"
                name="descripcion"
                value={descripcion}
                onChange={handleChange}
                onFocus={() => setheightTextArea("h-12")}
                onBlur={() => (setheightTextArea("h-4"), handleBlur())}
                noValidate
                // onBlur={handleBlur}
              ></textarea>
              <label htmlFor="descripcion" className="">
                Escribe lo que quieras compartir...
              </label>
              {error && <div className="invalid-feedback ms-2">{error}</div>}
            </div>
            {error && <div className="m-4"></div>}
            <div className="card-body d-flex justify-content-between align-items-center">
              <div className="file-select btn btn-outline-primary " id="imagen">
                <FileUploader
                  accept="image/*"
                  id="imagen"
                  name="imagen"
                  randomizeFilename
                  storageRef={firebase.storage.ref("post")}
                  onUploadStart={handleUploadStart}
                  onUploadError={handleUploadError}
                  onUploadSuccess={handleUploadSuccess}
                  onProgress={handleProgress}
                  aria-label="Archivo"
                  className="btn btn-primary"
                />
              </div>
              {subiendo && (
                <button className="btn btn-primary" type="button" disabled>
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Cargando Imagen...
                </button>
              )}
              {urlImg && (
                <p className="text-success m-auto w-100 fs-4  rounded-2 p-1">
                  &#9745;
                </p>
              )}

              <input type="submit" className="btn btn-outline-info" value='Compartir' />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default NuevoPost;
