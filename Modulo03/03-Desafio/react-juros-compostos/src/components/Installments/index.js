import React from "react"
import Installment from "../Installment"

import "./styles.css"

export default function Installments({ installments }) {
  return (
    <div className="cards">
      {installments.map(({ number, finalCapital, balance, percent }) => {
        return (
          <Installment
            key={number}
            number={number}
            finalCapital={finalCapital}
            balance={balance}
            percent={percent}
          />
        )
      })}
    </div>
  )
}
