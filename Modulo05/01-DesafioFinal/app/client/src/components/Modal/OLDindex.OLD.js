import React, { useEffect } from "react"

import M from "materialize-css"

import "./styles.css"

export default function Modal() {
  return (
    <div id="modal1" className="modal open">
      <div>
        <header>
          <h3>Inclusão de Lançamento</h3>
          <button
            className="waves-effect waves-light btn red darken-4"
            onClick={(e) => e.target}
          >
            X
          </button>
        </header>

        <form>
          <div className="container-form">
            <div className="container-input-radio">
              <label className="label">
                <input
                  name="expense-earning"
                  type="radio"
                  value="-"
                  checked=""
                ></input>
                <span className="span">Despesa</span>
              </label>
              <label className="label">
                <input name="expense-earning" type="radio" value="+"></input>
                <span className="span">Receita</span>
              </label>
            </div>

            <div className="input-field ">
              <input
                id="inputDescription"
                type="text"
                required=""
                value=""
              ></input>
              <label for="inputDescription" className="active">
                Descrição:
              </label>
            </div>

            <div className="input-field ">
              <input
                id="inputCategory"
                type="text"
                required=""
                value=""
              ></input>
              <label for="inputCategory" className="active">
                Categoria:
              </label>
            </div>

            <div className="container-input">
              <div className="input-field container-input-value">
                <input
                  id="inputValue"
                  type="number"
                  min="0"
                  step="0.01"
                  required=""
                  value="0"
                ></input>
                <label for="inputValue" className="active">
                  Valor:
                </label>
              </div>

              <input
                placeholder="Data"
                type="date"
                className="browser-default"
                required=""
                value="2020-09-10"
              ></input>
            </div>
          </div>

          <input
            type="submit"
            className="waves-effect waves-light btn"
            disabled=""
            value="Salvar"
          ></input>
        </form>
      </div>
    </div>
  )
}
