import React, { useContext, useEffect } from "react";
import { ContextoFormulario } from "../../context/ContextoFormulario";
import { useMutation } from "react-query";

const sendForm = async (data) => {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    return response.json();
  } else {
    throw new Error("Your info couldn't be sent");
  }
};

const Detalle = () => {
  // Aqui deberíamos obtener los datos del formulario para poder mostrarlo en
  // la vista previa.

  /**
 * Este componente renderiza la información que viene del global context a modo de vista previa
 
 */

  const { data, isLoading, isError, mutate, isSuccess } = useMutation(sendForm);

  const { formulario } = useContext(ContextoFormulario);

  const { nombre, apellido, email } = formulario.entrenador;
  const {
    nombrePokemon,
    tipoPokemon,
    elementoPokemon,
    alturaPokemon,
    edadPokemon,
    especiePokemon,
  } = formulario.pokemon;

  useEffect(() => {
    if (isSuccess) {
      alert(`Formulario enviado correctamente, id ${data ? data?.id : ""}`);
    } else if (isError) {
      alert("Error al enviar el formulario. Por favor intente nuevamente");
    }
  }, [isSuccess, data, isError]);

  return (
    <div className="detalle-formulario">
      <div className="encabezado">
        <h3>Vista Previa de la Solicitud</h3>
      </div>
      <section className="datos-cliente">
        <h4>Datos del Entrenador</h4>
        <div className="fila">
          <p>Nombre: {nombre}</p>
          <p>Apellido: {apellido}</p>
          <p>Email: {email}</p>
        </div>
      </section>
      <section className="datos-cliente">
        <h4>Datos del Pokémon</h4>
        <div className="fila">
          <p>Nombre: {nombrePokemon}</p>
          <p>Tipo de Pokemon: {tipoPokemon}</p>
          <p>Elemento: {elementoPokemon}</p>
          <p>Altura: {alturaPokemon}</p>
          <p>Edad: {edadPokemon}</p>
          <p>Especie: {especiePokemon}</p>
        </div>
      </section>
      <button className="boton-enviar" onClick={() => mutate(formulario)}>
        {isLoading ? "Enviando formulario..." : "Enviar Solicitud"}
      </button>
    </div>
  );
};

export default Detalle;
