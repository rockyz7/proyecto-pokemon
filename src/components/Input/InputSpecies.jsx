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
   * @param {string} key clave para identificar la petición
   */
  const getPokemonEspecies = async ({ queryKey }) => {
    const [key, offset] = queryKey;

    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon-species/?offset=${offset}&limit=20`
    );
    const data = await response.json();
    return data.results;
  };

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
            onClick={(e) => elegirEspecie(e, especie.name)}
          >
            {especie.name}
          </button>
        ))}
    </>
  );

  return (
    <div>
      {mostrarPopup && (
        <div>
          <h4>Seleccionar especie</h4>
          <div>{renderizarEspecies()}</div>
          <div>
            <button
              disabled={especiesOffset <= 0 ? true : false}
              onClick={() => setEspeciesOffset(especiesOffset - 20)}
            >
              Anterior
            </button>
            <button onClick={() => setEspeciesOffset(especiesOffset + 20)}>
              Siguiente
            </button>
          </div>
        </div>
      )}
      <p htmlFor={name}>{label}</p>
      <button onClick={() => setMostrarPopup(true)}>Seleccionar</button>
    </div>
  );
};

export default InputSpecies;
