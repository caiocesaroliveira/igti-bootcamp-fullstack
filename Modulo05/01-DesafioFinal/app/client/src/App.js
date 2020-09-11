import React, { useState, useEffect } from "react"
import Header from "./components/Header"
import Button from "./components/Buttons"
import Select from "./components/Select"
import Summary from "./components/Summary"
import Lancamento from "./components/Lancamento"
import Transactions from "./components/Transactions"
import Modal from "./components/Modal"

import api from "./services/TransactionAPI"

import { periods } from "./data/data-select"

export default function App() {
  const [period, setPeriod] = useState("2019-01")
  const [filteredDescription, setFilteredDescription] = useState("")

  const [allTransactions, setAllTransactions] = useState([])

  const [totalTransactions, setTotalTransactions] = useState(0)
  const [revenue, setRevenue] = useState(0)
  const [costs, setCosts] = useState(0)

  useEffect(() => {
    const getData = async () => {
      const response = await api.findByDescription(
        0,
        period,
        filteredDescription
      )
      const json = await response.data

      setAllTransactions(json)
    }

    getData()
  }, [period, filteredDescription])

  useEffect(() => {
    const getTotal = () => {
      setTotalTransactions(allTransactions.length)

      const getTotalRevenueAndCosts = (signal) => {
        return allTransactions
          .filter((item) => {
            return item.type === signal
          })
          .reduce((acc, curr) => {
            return acc + curr.value
          }, 0)
      }
      setRevenue(getTotalRevenueAndCosts("+"))
      setCosts(getTotalRevenueAndCosts("-"))
    }

    getTotal()
  }, [allTransactions])

  const handlePeriodChange = (value) => {
    setPeriod(value)
  }

  // const handleNewTransactionClick = () => {
  //   set
  // }

  return (
    <div className="container">
      <Header />
      <div className="center container-controls">
        <Button
          id="prev"
          label="<"
          period={period}
          disabled={periods[0].id === period}
          handleButtonClick={handlePeriodChange}
        />
        <Select
          periods={periods}
          period={period}
          handleSelectChange={handlePeriodChange}
        />
        <Button
          id="next"
          label=">"
          period={period}
          disabled={periods[35].id === period}
          handleButtonClick={handlePeriodChange}
        />
      </div>
      <Summary
        totalTransactions={totalTransactions}
        revenue={revenue}
        costs={costs}
      />
      <Lancamento
        filteredValue={filteredDescription}
        handleInputChange={(e) => setFilteredDescription(e.target.value)}
      />
      <Transactions transactions={allTransactions} />

      {/* <Modal /> */}
    </div>
  )
}
