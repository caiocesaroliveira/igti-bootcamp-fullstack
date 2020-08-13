import React, { Component } from "react"
import { formatPercentageUS } from "../../helpers/utils"

export default class Bar extends Component {
  render() {
    const {
      color_base,
      percentageINSS,
      inssColor,
      percentageIRPF,
      irpfColor,
    } = this.props

    return (
      <div className={`progress ${color_base}`}>
        <div
          className={`determinate`}
          style={{
            width: `${formatPercentageUS(percentageIRPF + percentageINSS)}`,
            backgroundColor: inssColor,
          }}
        ></div>
        <div
          className={`determinate`}
          style={{
            width: `${formatPercentageUS(percentageIRPF)}`,
            backgroundColor: irpfColor,
          }}
        ></div>
      </div>
    )
  }
}
