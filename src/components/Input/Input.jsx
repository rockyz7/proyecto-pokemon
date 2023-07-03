import React, { useContext, useState } from "react";
import { ContextoFormulario } from "../../context/ContextoFormulario";
import propTypes from "prop-types";

const Input = ({ name, label, type = "text", isPokemon = false }) => {
  /**
   * Aquí se manejan todos los inputs del formulario
   *
   * @param {{
   *     name: string,
   *    label: string,
   *    type: string,
   *    isPokemon: boolean,
   * }} props
   */

  const { handleInputBlur } = useContext(ContextoFormulario);
  const [value, setValue] = useState("");
  // Aqui deberíamos acceder al estado global para poder obtener los datos
  // del formulario y una manera de actualizar los mismos.

  // También, utilizaremos un estado local para manejar el estado del input.

  /**
   * Esta función obtiene la información del input y la almacena en un estado.
   *
   * @param {Event} e
   */

  const onChange = (e) => {
    // Aquí deberíamos actualizar el estado local del input.
    setValue(e.target.value);
  };

  /**
   * Esta función dispara el dispatch del reducer actualizando el estado global dependiendo de si el dato
   * pertenece a un entrenador o a un pokemon. Se ejecuta cuando nos vamos del input.
   *
   * @param {Event} e
   */

  const onBlur = (e) => {
    e.preventDefault();
    handleInputBlur(
      isPokemon ? "ACTUALIZAR_POKEMON" : "ACTUALIZAR_ENTRENADOR",
      {
        campo: name,
        valor: value,
      }
    );
    // Aqui deberíamos actualizar el estado global con los datos de
    // cada input.
    // TIP: Podemos utilizar el nombre de cada input para guardar
    // los datos en el estado global usando una notación de { clave: valor }
  };

  return (
    <div className="input-contenedor">
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e)}
        id={name}
        onBlur={onBlur}
      />
    </div>
  );
};

Input.propTypes = {
  name: propTypes.string.isRequired,
  label: propTypes.string.isRequired,
  type: propTypes.string,
  isPokemon: propTypes.bool,
};

export default Input;
