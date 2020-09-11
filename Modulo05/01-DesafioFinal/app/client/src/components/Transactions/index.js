import React from "react"

import { formatCurrency } from "../../helpers/format"

import "./styles.css"

export default function Transactions({ transactions }) {
  return (
    <div className="center container-transactions">
      {transactions.map(({ _id, day, category, description, value }) => {
        return (
          <div key={_id} className="transactions">
            <span className="day">{day}</span>

            <div className="info-transactions">
              <div className="info-transactions-descriptions">
                <span id="category">{category}</span>
                <span id="description">{description}</span>
              </div>
              <span id="value">{formatCurrency(value)}</span>
            </div>

            <div className="actions">
              <span className="material-icons action">edit</span>
              <span className="material-icons action">delete</span>
            </div>
          </div>
        )
      })}
    </div>
  )
}
