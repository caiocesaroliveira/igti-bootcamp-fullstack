import React from "react"

import "./styles.css"

export default function Modal() {
  return (
    <div id="modal1" className="modal">
      <div className="modal-content">
        <header>
          <h4>Inclusão de Lançamento</h4>
          <button className="modal-close waves-effect waves-light btn red darken-4">
            X
          </button>
        </header>
      </div>

      <form>
        <div className="container-form">
          <div className="container-input-radio">
            <label className="input-radio">
              <input type="radio" name="typeTransaction" value="+"></input>
              <span>Despesas</span>
            </label>
            <label className="input-radio">
              <input type="radio" name="typeTransaction" value="+"></input>
              <span className="">Receita</span>
            </label>
          </div>
        </div>
      </form>

      <div class="modal-footer">
        <input
          type="submit"
          className="modal-close waves-light btn"
          value="Salvar"
        ></input>
      </div>
    </div>
  )
}
