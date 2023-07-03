import React, { useState, useContext } from "react";
import { useQuery } from "react-query";
import { ContextoFormulario } from "../../context/ContextoFormulario";

const InputSpecies = ({ name, label }) => {
  const [mostrarPopup, setMostrarPopup] = useState(false);
  const { handleInputBlur } = useContext(ContextoFormulario);
  const [especiesOffset, setEspeciesOffset] = useState(0);
  /**
   * Esta función realiza un pedido a la API pokemon para obtener las especies
   * @param {array} queryKey array de dos elementos a la cual tenemos acceso gracias a useQuery
   * @param {number} offset número del paginado que va de 20 en 20
   * @param {string} key clave para identificar la petición, en este ejemplo no se utiliza
   * @returns {array}
   */
  const getPokemonEspecies = async ({ queryKey }) => {
    const [key, offset] = queryKey;

    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon-species/?offset=${offset}&limit=20`
    );
    const data = await response.json();
    return data.results;
  };

  /**
   * Implementamos useQuery y le pasamos la función getPokemonEspecies que creamos arriba.
   * Esta función nos devuelve un array: data, que la renombramos como "especies"
   */
  const { data: especies } = useQuery(
    ["especies", especiesOffset],
    getPokemonEspecies
  );

  const elegirEspecie = (e, nombreEspecie) => {
    e.preventDefault();

    handleInputBlur("ACTUALIZAR_POKEMON", {
      campo: "especiePokemon",
      valor: nombreEspecie,
    });
    setMostrarPopup(false);
  };

  const renderizarEspecies = () => (
    <>
      {especies &&
        especies.map((especie) => (
          <button
            key={especie.name}
            className="botones-especie"
            onClick={(e) => elegirEspecie(e, especie.name)}
          >
            {especie.name}
          </button>
        ))}
    </>
  );

  return (
    <div className="input-contenedor">
      {mostrarPopup && (
        <div className="popup-especie">
          <h4>Seleccionar especie</h4>
          <div className="contenedor-especies">{renderizarEspecies()}</div>
          <div className="paginador">
            <button
              className="boton-anterior"
              disabled={especiesOffset <= 0 ? true : false}
              onClick={() => setEspeciesOffset(especiesOffset - 20)}
            >
              Anterior
            </button>
            <button
              className="boton-siguiente"
              onClick={() => setEspeciesOffset(especiesOffset + 20)}
            >
              Siguiente
            </button>
          </div>
        </div>
      )}
      <p htmlFor={name}>{label}</p>
      <button
        className="boton-seleccionar-especies"
        onClick={() => setMostrarPopup(true)}
      >
        Seleccionar
      </button>
    </div>
  );
};

export default InputSpecies;
