// Aqui debemos crear nuestro contexto y nuestro provider.

import React, { useReducer } from "react";
import propTypes from "prop-types";

/**
 * De esta forma se inicializa el estado del formulario
 * @type {{
 *    entrenador:{
 *      nombre: string,
 *      apellido: string,
 *      email: string
 *    },
 *    pokemon: {
 *      nombrePokemon: string,
 *      tipoPokemon: string,
 *      elementoPokemon: string,
 *      alturaPokemon: string,
 *      edadPokemon: string
 *   }
 * }}}
 */

const initialState = {
  entrenador: {
    nombre: "",
    apellido: "",
    email: "",
  },
  pokemon: {
    nombrePokemon: "",
    tipoPokemon: "",
    elementoPokemon: "",
    alturaPokemon: "",
    edadPokemon: "",
    especiePokemon: "",
  },
};

/**
 * Esta función actualiza el estado previamente definido en base al tipo de dato proveniente del formulario.
 *
 * @param {initialState} state
 * @param {{
 *    type: string,
 *   payload: {
 *    [string]: string,
 * }} action
 *
 * @returns {initialState}
 */

const reducer = (state, action) => {
  switch (action.type) {
    case "ACTUALIZAR_ENTRENADOR":
      return {
        ...state,
        entrenador: {
          ...state.entrenador,
          ...action.payload,
        },
      };
    case "ACTUALIZAR_POKEMON":
      return {
        ...state,
        pokemon: {
          ...state.pokemon,
          ...action.payload,
        },
      };
    default:
      return state;
  }
};

export const ContextoFormulario = React.createContext();

/**
 * Mediante el provider pasamos la información del estado y la función para manejar los inputs al resto de la aplicación
 *
 * @param {{
 *  children: React.ReactNode,
 * }} props
 * @returns {JSX.Element}
 */

const ProviderFormulario = ({ children }) => {
  const [formulario, dispatch] = useReducer(reducer, initialState);

  /**
   * Esta función actualiza el estado mediante el dispatch en base a los datos ingresados.
   *
   * @param {String} type
   * @param {{
   *    [string]: string,
   * }} value
   */

  const handleInputBlur = (type, value) => {
    const { campo, valor } = value;
    dispatch({
      type,
      payload: {
        [campo]: valor,
      },
    });
  };

  return (
    <ContextoFormulario.Provider
      value={{
        formulario,
        handleInputBlur,
      }}
    >
      {children}
    </ContextoFormulario.Provider>
  );
};

ProviderFormulario.propTypes = {
  children: propTypes.node.isRequired,
};

export default ProviderFormulario;
