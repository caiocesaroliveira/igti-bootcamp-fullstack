import React from "react"

import "./styles.css"

export default function Lancamento({
  filteredValue,
  handleInputChange,
  handleButtonClick,
}) {
  return (
    <div className="container-lancamento">
      <button
        className="waves-effect waves-light btn modal-trigger"
        disabled={filteredValue !== ""}
        href="#modal1"
      >
        + Novo lançamento
      </button>

      <div className="input-field container-input-field">
        <input
          placeholder="Filtro"
          type="text"
          value={filteredValue}
          onChange={handleInputChange}
        ></input>
      </div>
    </div>
  )
}
