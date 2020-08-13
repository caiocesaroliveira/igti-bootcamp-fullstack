import React, { Component } from "react"
import { formatCurrency, formatPercentage } from "../../helpers/utils"

export default class InputReadyOnly extends Component {
  render() {
    const { id, label, value, percentage, color } = this.props

    let formattedValue = percentage
      ? `${formatCurrency(value)} (${formatPercentage(percentage)})`
      : `${formatCurrency(value)}`

    return (
      <div className="input-field col s3">
        <input
          style={{ fontWeight: "bold", color }}
          id={id}
          name={id}
          type="text"
          value={formattedValue}
          placeholder="0,00"
          readOnly
          onChange={this.handleInputChange}
        />
        <label htmlFor={id}>{label}</label>
      </div>
    )
  }
}
