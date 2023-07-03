import React, { useContext } from "react";
import propTypes from "prop-types";
import { ContextoFormulario } from "../../context/ContextoFormulario";

const InputType = ({ name, label, options = [], disabled = false }) => {
  const { handleInputBlur } = useContext(ContextoFormulario);

  const onChange = (e) => {
    e.preventDefault();

    handleInputBlur("ACTUALIZAR_POKEMON", {
      campo: "tipoPokemon",
      valor: e.target.value,
    });
  };

  return (
    <div className="input-contenedor">
      <label htmlFor={name}>{label}</label>
      <select name={name} id={name} onChange={onChange} disabled={disabled}>
        <option value="">Seleciona el tipo de pokemon</option>
        {options.map((option) => (
          <option key={option.name} value={option.name}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};

InputType.propTypes = {
  name: propTypes.string.isRequired,
  label: propTypes.string.isRequired,
  options: propTypes.array,
  disabled: propTypes.bool,
};

export default InputType;
