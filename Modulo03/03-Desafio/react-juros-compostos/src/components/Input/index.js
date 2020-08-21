import React from "react"

export default function Input({ name, label, value, step, handleInputChange }) {
  return (
    <div className="input-field col s4">
      <input
        type="number"
        id={name}
        name={name}
        value={value}
        step={step}
        onChange={handleInputChange}
      />
      <label htmlFor={name}>{label}</label>
    </div>
  )
}
