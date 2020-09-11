import React from "react"

import "./styles.css"

import { periods } from "../../data/data-select"

export default function Button({
  id,
  label,
  period,
  disabled,
  handleButtonClick,
}) {
  const handleClick = (event) => {
    const { id } = event.target

    let indexPeriod = periods.findIndex((item) => {
      return item.id === period
    })

    if (id === "next") {
      indexPeriod += 1

      if (indexPeriod < periods.length)
        handleButtonClick(periods[indexPeriod].id)
    } else {
      indexPeriod -= 1
      if (indexPeriod >= 0) handleButtonClick(periods[indexPeriod].id)
    }
  }

  return (
    <>
      <button
        className={"waves-effect waves-light btn"}
        id={id}
        disabled={disabled}
        onClick={handleClick}
      >
        {label}
      </button>
    </>
  )
}
