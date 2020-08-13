import React, { Component } from "react"
import InputFullSalary from "./components/Inputs/InputFullSalary"
import InputReadyOnly from "./components/Inputs/InputReadyOnly"
import Bar from "./components/bars/Bar"
import { calculateSalaryFrom } from "./data/salary"

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      fullSalary: 0,
    }
  }

  handleSalaryChange = (fullSalary) => {
    this.setState({
      fullSalary,
    })
  }

  render() {
    const { fullSalary } = this.state

    const {
      netSalary,
      baseINSS,
      discountINSS,
      percentageINSS,
      baseIRPF,
      percentageIRPF,
      discountIRPF,
    } = calculateSalaryFrom(fullSalary)

    const netColor = "#16a085"
    const inssColor = "#e67e22"
    const irpfColor = "#c0392b"

    return (
      <div className="container">
        <h1 className="center">React Salário</h1>

        <div className="row">
          <div className="row">
            <InputFullSalary
              id="fullSalary"
              label="Salário Bruto:"
              value={fullSalary}
              onChange={this.handleSalaryChange}
            />
          </div>

          <div className="row">
            <InputReadyOnly id="baseINSS" label="Base INSS:" value={baseINSS} />
            <InputReadyOnly
              id="discountINSS"
              label="Desconto INSS:"
              value={discountINSS}
              percentage={percentageINSS}
              color={inssColor}
            />
            <InputReadyOnly id="baseIRPF" label="Base IRPF:" value={baseIRPF} />
            <InputReadyOnly
              id="discountIRPF"
              label="Desconto IRPF:"
              value={discountIRPF}
              percentage={percentageIRPF}
              color={irpfColor}
            />
          </div>

          <div className="row">
            <InputReadyOnly
              id="netSalary"
              label="Salário Líquido:"
              value={netSalary}
              color={netColor}
            />
          </div>

          <div className="row">
            <Bar
              color_base={netColor}
              percentageINSS={percentageINSS}
              inssColor={inssColor}
              percentageIRPF={percentageIRPF}
              irpfColor={irpfColor}
            />
          </div>
        </div>
      </div>
    )
  }
}
