export default function validarCrearCuenta(valores) {
  let errores = {};

  // validar  nombre
  if (!valores.nombre) {
    errores.nombre = "El nombre es Obligatorio";
  }
  // validar  email
  if (!valores.email) {
    errores.email = "El email es Obligatorio";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(valores.email)) {
    errores.email = "El email no es Valido";
  }
  // validar  password
  if (!valores.password) {
    errores.password = "El password es Obligatorio";
  } else if (valores.password.length < 6) {
    errores.password = "El password debe contener al menos 6 caracteres";
  }
  if (valores.password != valores.confirmar){
    errores.confirmar = "Las contraseñas no coinciden";
  }

  return errores;
}
