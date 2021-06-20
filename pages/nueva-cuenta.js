import React, { useState } from "react";
import Layout from "../components/layout/Layout";
import Link from "next/link";

import firebase from "../firebase";

import useValidacion from "../hooks/useValidacion";
import validarCrearCuenta from "../validacion/validarCrearCuenta";
import Router from "next/router";

const STATE_INICIAL = {
  nombre: "",
  email: "",
  password: "",
  confirmar: "",
};

const NuevaCuenta = () => {
  const [valores, setValores] = useState({
    nombre: "",
    email: "",
    password: "",
    confirmar: "",
  });
  const { nombre, email, password, confirmar } = valores;

  const [errores, setErrores] = useState({});
  const [errorAuth, setErrorAuth] = useState("");

  async function crearCuenta() {
    try {
      await firebase.registrar(nombre, email, password);
      Router.push("/perfil");
    } catch (error) {
      setErrorAuth(error.message);
    }
  }
  console.log(errorAuth);
  const handleChange = (e) => {
    setValores({
      ...valores,
      [e.target.name]: e.target.value
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if(errores.email || errores.password || errores.confirmar || errores.nombre){
      return
    }
    crearCuenta();
  };

  const handleBlur = () => {
    setErrores(validarCrearCuenta(valores))
    setErrorAuth("")
  };
  const validar = (e1, e2) => {
    return (e1 != "" || e2 != "") ? "" : "invisible"
  }
  return (
    <Layout>
      <div className="container align-middle mt-3 vh-75">
        <div className="row mx-1 justify-content-center">
          <form
            className="card py-4 py-lg-0 py-xxl-4 col-12 col-lg-5 m-5vh"
            onSubmit={handleSubmit}
          >
            <h2 className="card-header fw-light text-center bg-secondary shadow m-3">
              Bienvenido
            </h2>

            <div className="form-floating mx-3 my-2 shadow">
              <input
                type="nombre"
                className={`form-control ${errores.nombre && "is-invalid"}`}
                placeholder="Bryan Santos"
                id="nombre"
                name="nombre"
                value={nombre}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <div className={`invalid-feedback ms-2 ${!errores.nombre && "invisible"}`}>{errores.nombre}</div>
              <label htmlFor="nombre">Ingrese su nombre</label>
            </div>

            <div className="form-floating mx-3 my-2 shadow">
              <input
                type="email"
                className={`form-control ${errores.email && "is-invalid"} ${errorAuth && "is-invalid"}`}
                placeholder="ejemplo@mail.com"
                id="email"
                name="email"
                value={email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <label htmlFor="email">Ingrese su correo</label>
              <div className={`invalid-feedback ms-2 
                ${validar(errores.email, errorAuth)}`}
              >{errores.email ? errores.email : ""} {errorAuth ? "El correo ya esta registrado" : ""}</div>

            </div>

            <div className="form-floating mx-3 my-2 shadow">
              <input
                type="password"
                className={`form-control ${errores.password && "is-invalid"}`}
                placeholder="********"
                id="password"
                name="password"
                value={password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <label htmlFor="password">Ingrese su contraseña</label>
              <div className={`invalid-feedback ms-2 ${!errores.password && "invisible"}`}>{errores.password}</div>

            </div>

            <div className="form-floating mx-3 my-2 shadow">
              <input
                type="password"
                className={`form-control ${errores.confirmar && "is-invalid"}`}
                placeholder="********"
                id="confirmar"
                name="confirmar"
                value={confirmar}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <label htmlFor="confirmar">Confirme su contraseña</label>
              <div className={`invalid-feedback ms-2 ${!errores.confirmar && "invisible"}`}>{errores.confirmar}</div>

            </div>

            <input
              type="submit"
              className="mx-3 my-2 btn btn-info"
              aria-describedby="submit"
              value="Crear Cuenta"
            />
            <div id="submit" className="form-text mx-3 text-center">
              ¿Ya tienes una cuenta?{" "}
              <Link href="/iniciar-sesion">
                <a>Iniciar Sesión</a>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default NuevaCuenta;
