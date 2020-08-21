import React from "react"

import { formatCurrency, formatPercent } from "../../helpers/format"

import "./styles.css"

export default function Installment({
  number,
  finalCapital,
  balance,
  percent,
}) {
  const changeColor = (rate) => {
    if (rate === 0) return
    return rate > 0 ? "positive" : "negative"
  }

  return (
    <article>
      <span>{number}</span>
      <div className={changeColor(percent)}>
        <p>{formatCurrency(finalCapital)}</p>
        <p>{formatCurrency(balance)}</p>
        <p>{formatPercent(percent)}</p>
      </div>
    </article>
  )
}
