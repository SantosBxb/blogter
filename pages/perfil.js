import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import FileUploader from "react-firebase-file-uploader";
import validarCrearCuenta from "../validacion/validarCrearCuenta";
import { FirebaseContext } from "../firebase";
import Router from "next/router";

const STATE_INICIAL = {
  nombre: "",
  password: "",
  confirmar: "",
};
const Perfil = () => {
  const { usuario, firebase } = useContext(FirebaseContext);
  const [valores, setvalores] = useState({
    nombre: usuario ? usuario.displayName : "",
    password: "",
    confirmar: "",
  });
  const [check, setCCheck] = useState(false);
  const { nombre, password, confirmar } = valores;

  const [nombreImg, setNombreImg] = useState("");
  const [subiendo, setSubiendo] = useState(false);
  const [progreso, setProgreso] = useState(0);
  const [urlImg, setUrlImg] = useState(usuario ? usuario.photoURL : "");

  const [error, setError] = useState();
  const [cambiarPass, setcambiarPass] = useState(false);
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
      .ref("perfil")
      .child(nombre)
      .getDownloadURL()
      .then((url) => {
        setUrlImg(url);
      });
  };

  async function actualizarPerfil() {
    try {
      const user = firebase.auth.currentUser;
      user
        .updateProfile({
          displayName: nombre,
          photoURL: urlImg,
        })
        .then(function () {
          // Update successful.
        })
        .catch(function (error) {
          // An error happened.
        });
      if (check) {
        user
          .updatePassword(password)
          .then(function () {
            // Update successful.
          })
          .catch(function (error) {
            // An error happened.
          });
        }
      Router.push("/");
    } catch (error) {
      console.log(error);
    }
  }
  const handleChange = (e) => {
    setvalores({
      ...valores,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (nombre === "") {
      setError("");
      return;
    }
    actualizarPerfil();
    setError(null);
  };

  const handleBlur = () => {
    if (nombre.trim() === "") {
      setError("debe ingresar un Nombre");
    } else {
      setError("");
    }
  };
  console.log(check);
  return (
    <Layout>
      <div className="row justify-content-center g-0 mt-4 mx-2">
        <div className="col-lg-8 card shadow-lg rounded-3">
          <div className="m-2 d-flex align-items-center">
            <div className="mx-2 pt-1">
              <Image
                className="rounded-circle"
                src={usuario ? usuario.photoURL : "images/usuario.png"}
                alt="Picture of the author"
                width={40}
                height={40}
              />
            </div>
            <div className="mx-2">
              <h6 className="mb-0">{usuario ? usuario.displayName : ""}</h6>
              <small className="">{usuario ? usuario.email : ""}</small>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <h3 className="text-center card-title shadow">Editar Perfil</h3>
            <div className="form-floating mx-3 my-2 shadow">
              <input
                type="nombre"
                className="form-control"
                placeholder="Bryan Santos"
                id="nombre"
                name="nombre"
                value={nombre}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <label htmlFor="nombre">Ingrese su nuevo nombre</label>
            </div>
            <button
              type="button"
              className="btn btn-outline-warning mx-3 mt-2"
              onClick={() => setcambiarPass(cambiarPass ? false : true)}
            >
              Cambiar Contraseña
            </button>

            <div className={cambiarPass ? "" : "d-none"}>
              <div className="form-floating mx-3 my-2 shadow">
                <input
                  type="password"
                  className="form-control "
                  placeholder="********"
                  id="password"
                  name="password"
                  value={password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <label htmlFor="password">Ingrese su nueva contraseña</label>
              </div>

              <div className="form-floating mx-3 my-2 shadow">
                <input
                  type="password"
                  className="form-control  "
                  placeholder="********"
                  id="confirmar"
                  name="confirmar"
                  value={confirmar}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <label htmlFor="confirmar">Confirme su contraseña</label>
              </div>
              <p className="text-center ">
                Si actualiza su contraseña debe volver a iniciar sesión
              </p>

              <div
                className="form-check d-flex justify-content-center"
                htmlFor="check"
              >
                <label className="form-check-label">
                  ¿Esta segura/o de cambiar su contraseña?
                </label>
                <input
                  className="mx-2 fs-4 border border-info form-check-input"
                  type="checkbox"
                  value=""
                  id="check"
                  onClick={() => setCCheck(check ? false : true)}
                />
              </div>
            </div>

            <div>
              <label className="mx-3 form-text">
                Suba una Foto para su Perfil
              </label>
              <div className=" mx-3 mb-2 shadow d-flex justify-content-between">
                <div
                  className="file-select btn btn-outline-primary "
                  id="imagen"
                >
                  <FileUploader
                    accept="image/*"
                    id="imagen"
                    name="imagen"
                    randomizeFilename
                    storageRef={firebase.storage.ref("perfil")}
                    onUploadStart={handleUploadStart}
                    onUploadError={handleUploadError}
                    onUploadSuccess={handleUploadSuccess}
                    onProgress={handleProgress}
                    aria-label="Archivo"
                    className="btn btn-primary"
                  />
                </div>
                {subiendo && (
                  <button
                    className="btn btn-primary mx-3"
                    type="button"
                    disabled
                  >
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Cargando Imagen...
                  </button>
                )}
                {urlImg && (
                  <div className="mx-3">
                    <Image
                      className="rounded-circle"
                      alt="Imagen"
                      src={urlImg}
                      width={50}
                      height={50}
                    />
                  </div>
                )}
                <input
                  type="submit"
                  className="mx-3 my-2 btn btn-outline-info my-auto"
                  aria-describedby="submit"
                  value="Actualizar Datos"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Perfil;
