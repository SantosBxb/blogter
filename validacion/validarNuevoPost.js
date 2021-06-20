export default function validarCrearProducto(valores) {
  let errores = {};
  // validar descripcion 
  if (!valores.descripcion) {
    errores.descripcion = "Agrega conntenido a tu Post";
  }

  return errores;
}
