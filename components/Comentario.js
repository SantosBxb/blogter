import Image from "next/image";
import React from "react";
import { intlFormat, toDate } from "date-fns";
import { es } from "date-fns/locale";

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
    <div className="card mx-4 my-3 bg-secondary shadow">
      <div className="m-2 d-flex align-items-center">
        <div className="mx-2 pt-1">
          <Image
            className="rounded-circle"
            src={comentario.urlFoto}
            alt="Picture of the author"
            width={40}
            height={40}
          />
        </div>
        <div className="mx-2">
          <h6 className="mb-0">{comentario.nombreUsuario}</h6>
          <small className="">{creado}</small>
        </div>
      </div>
      <div className="mx-5 border shadow rounded-3 my-1 ">
        <p className="mx-3 my-auto">{comentario.comentario}</p>
        {/* {true ? (
          <div className="mx-4 mb-2">
            <Image
              src="/images/perfil.jpg"
              alt="Picture of the author"
              width={100}
              height={100}
            />
          </div>
        ) : null} */}
      </div>
    </div>
  );
};

export default Comentario;
