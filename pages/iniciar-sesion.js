import React, { useState } from "react";
import Layout from "../components/layout/Layout";
import Link from "next/link";
import Router from "next/router";
import firebase from "../firebase";
import validarIniciarSesion from "../validacion/validarIniciarSesion";

const IniciarSesion = () => {
  const [valores, setValores] = useState({
    email: "",
    password: "",
  });
  const { email, password } = valores;
  const [verificando, setVerificando] = useState(false);
  const [errores, setErrores] = useState({});
  const [errorAuth, setErrorAuth] = useState("");
  if (
    errorAuth ===
    "There is no user record corresponding to this identifier. The user may have been deleted."
  ) {
    var errorEmail = "El email no esta registrado";
  } else if (
    errorAuth ===
    "The password is invalid or the user does not have a password."
  ) {
    var errorPassword = "La contraseña es incorrecta";
  }
  async function iniciarSesion() {
    try {
      await firebase.login(email, password);
      Router.push("/");
    } catch (error) {
      setErrorAuth(error.message);
    }
  }

  const handleChange = (e) => {
    setValores({
      ...valores,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setVerificando(true);

    if (errores.email || errores.password) {
      setVerificando(false);
      return;
    }
    iniciarSesion();
    setVerificando(false);
  };

  const handleBlur = () => {
    setErrores(validarIniciarSesion(valores));
  };

  const validar = (e1, e2) => {
    return e1 != "" || e2 != "" ? "" : "invisible";
  };
  return (
    <Layout>
      <div className="container mt-3 vh-75">
        <div className="row mx-1 justify-content-center">
          {verificando ? (
            <button className="btn btn-primary" type="button" disabled>
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
              Cargando Imagen...
            </button>
          ) : null}
          <form className="card m-5vh py-3 col-lg-5 " onSubmit={handleSubmit}>
            <h2 className="card-header fw-light text-center bg-secondary shadow m-3">
              Bienvenido
            </h2>
            <div className=""></div>
            <div className="form-floating mx-3 my-2 shadow ">
              <input
                type="email"
                className={`form-control ${errores.email && "is-invalid"} ${
                  errorEmail && "is-invalid"
                }`}
                placeholder="ejemplo@mail.com"
                id="email"
                name="email"
                value={email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <label htmlFor="email">Ingrese su correo</label>
              <div
                className={`invalid-feedback ms-2 
                  ${validar(errores.email, errorEmail)}`}
              >
                {errores.email ? errores.email : ""}
                {errorEmail ? errorEmail : ""}
              </div>
            </div>
            <div className="form-floating mx-3 my-2 shadow">
              <input
                type="password"
                className={`form-control ${errores.password && "is-invalid"} ${
                  errorPassword && "is-invalid"
                }`}
                placeholder="*******"
                id="password"
                name="password"
                value={password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <label htmlFor="password">Ingrese su contraseña</label>
              <div
                className={`invalid-feedback ms-2 
                  ${validar(errores.password, errorPassword)}`}
              >
                {errores.password ? errores.password : ""}
                {errorPassword ? errorPassword : ""}
              </div>
            </div>

            <input
              type="submit"
              className="m-3 btn btn-primary"
              aria-describedby="submit"
              value="Iniciar Sesión"
            />
            {verificando ? (
              <button className="btn btn-primary" type="button" disabled>
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
                Cargando Imagen...
              </button>
            ) : null}

            <div id="submit" className="form-text mx-3 text-center">
              ¿No tienes una cuenta?{" "}
              <Link href="/nueva-cuenta">
                <a>Crear Cuenta</a>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default IniciarSesion;
