import React from "react"

import { formatNumber, formatCurrency } from "../../helpers/format"

import "./styles.css"

export default function Summary({ totalTransactions, revenue, costs }) {
  const balance = revenue - costs
  const classNameBalance = balance < 0 ? "negative" : "positive"
  return (
    <div className="container-sumary">
      <span>
        <strong>
          Lançamentos: <span>{formatNumber(totalTransactions)}</span>
        </strong>
      </span>
      <span>
        <strong>
          Receitas: <span className="positive">{formatCurrency(revenue)}</span>
        </strong>
      </span>
      <span>
        <strong>
          Despesas: <span className="negative">{formatCurrency(costs)}</span>
        </strong>
      </span>
      <span>
        <strong>
          Saldo:{" "}
          <span className={classNameBalance}>{formatCurrency(balance)}</span>
        </strong>
      </span>
    </div>
  )
}
