// se crea la instancia de firebase
import app from "firebase/app";
import "firebase/auth"; // autenticacion de firebase
import "firebase/firestore"
import "firebase/storage"
import firebaseConfig from "./config";

class Firebase {
  constructor() {
    if (!app.apps.length) {
      app.initializeApp(firebaseConfig);
    }
    this.auth = app.auth();
    this.db = app.firestore();
    this.storage = app.storage();
  }

  // regitrar usuario
  async registrar(nombre, email, password) {
    // se crea el usuario
    const nuevoUsuario = await this.auth.createUserWithEmailAndPassword(
      email,
      password
    );
    // se actualizar el nombre del usuario nuevo
    return await nuevoUsuario.user.updateProfile({
      displayName: nombre,
      photoURL: "/images/usuario.png"   
    });
  }

  // iniciar sesion
  async login(email, password) {
    return await this.auth.signInWithEmailAndPassword(email, password);
  }

  // cerrar sesion
  async cerrarSesion() {
    this.auth.signOut();
  }
}

const firebase = new Firebase();
export default firebase;
