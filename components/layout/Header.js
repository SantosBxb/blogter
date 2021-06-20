import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FirebaseContext } from "../../firebase";
import Image from "next/image";
import Router from 'next/router'

const Header = () => {
  const router = useRouter();
  const actual = router.pathname;

  const [busqueda, setBusqueda] = useState("");

  const [menu, setmenu] = useState({
    estado: false,
    show: "",
  });

  const showMenu = () => {
    setmenu({
      estado: menu.estado ? false : true,
      show: menu.estado ? "" : "show",
    });
  };
  const { firebase, usuario } = useContext(FirebaseContext);

  if (usuario != null){
    var fotoUsuario = usuario.photoURL;
  }

  const buscar = e => {
    e.preventDefault();

    if (busqueda.trim() === '') return 
    // redireccionar a /buscar
    Router.push({
      pathname: "/buscar",
      query:{q : busqueda} 
    })
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-negro g-0 fijo">
      <div className="container-fluid d-flex shadow shadow-info g-0">
        <div className="navbar-brand flex-grow-1 text-center text-primary my-2 ms-5 fst-italic fw-bold rounded-3">
          <Link href="/">
            <a className="text-decoration-none  rounded-3 pb-1">
              <h1 className="d-inline shadow bg-se px-2 pb-1 ">BlogTer</h1>
            </a>
          </Link>
        </div>
        <a
          className="navbar-toggler bg-menu btn"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded={menu.estado}
          aria-label="Toggle navigation"
          onClick={showMenu}
        >
          <span className="navbar-toggler-icon"></span>
        </a>
        <div className="container-fluid  mx-3 m-lg-0 mt-sm-3 mt-lg-0 flex-shrink-1 width-buscar">
          <form className="d-flex" onSubmit={buscar}>
            <input
              type="search"
              className="form-control me-2"
              placeholder="Buscar"
              onChange={e => setBusqueda(e.target.value)}
            />
            <input
              type="submit"
              className="btn btn-outline-success"
              value="Buscar"
            />
          </form>
        </div>

        <div
          className={`collapse navbar-collapse flex-grow ${menu.show}`}
          id="navbarNavAltMarkup"
        >
          {usuario ? (
            <div className="navbar-nav order-2 m-2 d-flex flex-shrink-0 flex-grow-1 align-items-center justify-content-center mx-lg-0 mx-3 mx-xl-3">
              <Link href="/perfil">
                <a className="d-flex align-items-center">
                  <div className="mx-2 pt-1">
                    <Image
                      className="rounded-circle"
                      src={fotoUsuario}
                      alt="Picture of the author"
                      width={40}
                      height={40}
                    />
                  </div>
                  <div className="mx-2">
                    <h6 className="mb-0 text-secondary">
                      {usuario.displayName}
                    </h6>
                  </div>
                </a>
              </Link>
              <Link href="/" passHref>
                <button 
                  onClick={() => firebase.cerrarSesion()} 
                  className="btn btn-outline-danger my-3 mx-1">Cerrar Sesión</button> 
              </Link>
            </div>
          ) : (
            <div className="navbar-nav order-2 flex-shrink-0 flex-grow-1 justify-content-center mx-lg-0 mx-3 mx-xl-3">
              <Link href="/iniciar-sesion">
                <a className="btn btn-outline-primary my-3 mx-1 ">
                  Iniciar Sesión
                </a>
              </Link>

              <Link href="/nueva-cuenta">
                <a
                  className="btn btn-outline-info my-3 mx-1 "
                  onClick={showMenu}
                >
                  Crear Cuenta
                </a>
              </Link>
            </div>
          )}
          <hr className="text-light shadow-lg mx-3 d-lg-none"></hr>
          <div className="g-0 navbar-nav flex-grow-1 flex-shrink-0 flex-xl-shrink-1 text-light justify-content-center">
            <Link href="/">
              <a
                className={`nav-link btn-hover fw-bold  fs-6 text-center text-light  rounded rounded-3 ${
                  actual == "/" ? "active" : ""
                }`}
              >
                Inicio
              </a>
            </Link>
            <Link href="/populares">
              <a
                className={`nav-link  btn-hover fw-bold fs-6 text-center text-light  rounded rounded-3 ${
                  actual == "/populares" ? "active" : ""
                }`}
              >
                Populares
              </a>
            </Link>
            <Link href="/mis-publicaciones">
              <a
                className={`nav-link  btn-hover fw-bold fs-6 text-center text-light rounded rounded-3 ${
                  actual == "/mis-publicaciones" ? "active" : ""
                }`}
              >
                Mis Publicaciones
              </a>
            </Link>
          </div>
        </div>
      </div>
      
    </nav>
  );
};

export default Header;
