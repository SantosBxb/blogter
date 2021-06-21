import '/styles/styles.css'
import firebase, {FirebaseContext} from '../firebase'
import useAutenticacion from '../hooks/useAutenticacion';
import { useState } from 'react';
// import 'bootstrap/dist/js/bootstrap.bundle'

function MyApp({ Component, pageProps }) {
  
  const usuario = useAutenticacion();


  return (
    <FirebaseContext.Provider
      value={{
        firebase,
        usuario,
      }}
    >
      <Component {...pageProps} />
    </FirebaseContext.Provider>
  )
}

export default MyApp
