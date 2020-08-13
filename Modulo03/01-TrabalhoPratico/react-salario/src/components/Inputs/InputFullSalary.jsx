import React, { Component } from "react"

export default class InputFullSalary extends Component {
  handleInputChange = (event) => {
    this.props.onChange(event.target.value)
  }

  render() {
    const { id, label, value } = this.props

    return (
      <div className="input-field col s12">
        <input
          id={id}
          name={id}
          value={value || ""}
          type="number"
          min="0"
          placeholder="R$ 0,00"
          onChange={this.handleInputChange}
        />
        <label htmlFor={id}>{label}</label>
      </div>
    )
  }
}
