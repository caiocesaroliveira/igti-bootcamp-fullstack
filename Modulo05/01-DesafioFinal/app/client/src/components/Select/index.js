import React, { useEffect } from "react"

import M from "materialize-css"

import "./styles.css"

export default function Select({ periods, period, handleSelectChange }) {
  useEffect(() => {
    M.AutoInit()
  })

  const handleChange = (event) => {
    handleSelectChange(event.target.value)
  }

  return (
    <select className="browser-default" value={period} onChange={handleChange}>
      {periods.map(({ id, value }) => {
        return (
          <option key={id} value={id}>
            {value}
          </option>
        )
      })}
    </select>
  )
}
