import React, { useEffect, useState } from 'react'

const useValidacion = (stateInicial, validar, fn) => {
  const [valores, setvalores] = useState(stateInicial);
  const [errores, seterrores] = useState({});
  const [submitForm, setsubmitForm] = useState(false);

  useEffect(() => {
    if(submitForm){
      const sinErrores = Object.keys(errores).length === 0;
      if (sinErrores) {
        fn();
      }
      setsubmitForm(false);
      setvalores({})
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errores]);

  const handleChange = (e) => {
    setvalores({
      ...valores,
      [e.target.name]: e.target.value
    })
  }
  const handleSubmit = (e) => {
    e.preventDefault()

    const errorValidacion = validar(valores)
    seterrores(errorValidacion)
    setsubmitForm(true)
  }
  const handleBlur = () => {
    const errorValidacion = validar(valores)
    seterrores(errorValidacion)
  }

  return {
    valores,
    errores,
    handleSubmit,
    handleChange,
    handleBlur
  };
}
 
export default useValidacion;