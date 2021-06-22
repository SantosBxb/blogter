import React from "react";
import { intlFormat, toDate } from "date-fns";
import { es } from "date-fns/locale";
import { Img } from "./ui/Img";

const Comentario = ({ comentario }) => {
  const creado = intlFormat(
    new Date(comentario.creado),
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
  return (
    <div className="card mx-4 my-3 bg-dark shadow">
      <div className="m-2 d-flex align-items-center ">
        <div className="mx-2 pt-1">
          <Img
            className="rounded-circle"
            src={comentario.urlFoto}
            alt="Picture of the author"
            width={40}
            height={40}
          />
        </div>
        <div className="mx-2">
          <h6 className="mb-0 text-primary">{comentario.nombreUsuario}</h6>
          <small className="text-secondary">{creado}</small>
        </div>
      </div>
      <div className="mx-5 border border-dark shadow rounded-3 my-1 ">
        <p className="mx-3 my-auto text-light">{comentario.comentario}</p>

      </div>
    </div>
  );
};

export default Comentario;
