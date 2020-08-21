import React, { useState, useEffect } from "react"

import Input from "../Input"
import Installments from "../Installments"

import calculate from "../../helpers/interest"

export default function Form() {
  const [initialCapital, setInitialCapital] = useState("")
  const [rate, setRate] = useState("")
  const [period, setPeriod] = useState("")
  const [objInstallments, setObjInstallments] = useState([])

  useEffect(() => {
    setObjInstallments(calculate(initialCapital, rate, period))
  }, [initialCapital, rate, period])

  return (
    <>
      <section className="row">
        <Input
          label={"Capital Inicial (R$):"}
          name={"initialCapital"}
          value={initialCapital}
          step={100}
          handleInputChange={(e) => setInitialCapital(e.target.value)}
        />
        <Input
          label={"Taxa de Juros Mensal (%):"}
          name={"rate"}
          value={rate}
          handleInputChange={(e) => setRate(e.target.value)}
        />
        <Input
          label={"Período (Meses):"}
          name={"period"}
          value={period}
          handleInputChange={(e) => setPeriod(e.target.value)}
        />
      </section>
      <section className="row">
        <Installments installments={objInstallments} />
      </section>
    </>
  )
}
