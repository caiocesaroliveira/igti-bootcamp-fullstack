// const mongoose = require("mongoose")
// const ObjectId = mongoose.Types.ObjectId

// // Aqui havia um erro difícil de pegar. Importei como "transactionModel",
// // com "t" minúsculo. No Windows, isso não faz diferença. Mas como no Heroku
// // o servidor é Linux, isso faz diferença. Gastei umas boas horas tentando
// // descobrir esse erro :-/

const TransactionModel = require("../models/TransactionModel")

module.exports = {
  async index(req, res) {
    const { period } = req.query

    if (!period)
      return res
        .status(400)
        .json({ messagem: "Parâmetro 'períod' não informado" })

    try {
      const transaction = await TransactionModel.find({
        yearMonth: period,
      }).sort({ yearMonthDay: 1 })

      return res.status(200).json(transaction)
    } catch (error) {
      return res.status(400).json({ erro: error })
    }
  },

  async details(req, res) {
    const { id } = req.params
    // const { period } = req.query

    if (!id)
      return res
        .status(400)
        .json({ messagem: "ID do registro deve ser informado." })

    // if (!period)
    //   return res
    //     .status(400)
    //     .json({ messagem: "Parâmetro 'períod' não informado." })

    try {
      const transaction = await TransactionModel.find({ _id: id })

      return res.status(200).json(transaction)
    } catch (error) {
      return res.status(400).json({ erro: error })
    }
  },

  async store(req, res) {
    const { description, value, category, yearMonthDay, type } = req.body

    if (!description)
      return res
        .status(400)
        .json({ messagem: "Description do registro deve ser informado." })

    try {
      const dateTransaction = new Date(yearMonthDay)
      const day = dateTransaction.getDate().toString().padStart(2, "0")
      const month = (dateTransaction.getMonth() + 1).toString().padStart(2, "0")
      const year = dateTransaction.getFullYear()
      const yearMonth = `${dateTransaction.getFullYear()}-${month}`

      // return res.status(200).json({ day, month, year, yearMonth, yearMonthDay })

      const transaction = await TransactionModel.create({
        description,
        value,
        category,
        day,
        month,
        year,
        yearMonth,
        yearMonthDay,
        type,
      })

      return res.status(200).json(transaction)
    } catch (error) {
      return res.status(400).json({ erro: error })
    }
  },

  async update(req, res) {
    const { id } = req.params
    const { description, value, category, yearMonthDay, type } = req.body

    if (!id)
      return res
        .status(400)
        .json({ messagem: "ID do registro deve ser informado." })

    try {
      const dateTransaction = new Date(yearMonthDay)
      const day = dateTransaction.getDate().toString().padStart(2, "0")
      const month = (dateTransaction.getMonth() + 1).toString().padStart(2, "0")
      const year = dateTransaction.getFullYear()
      const yearMonth = `${dateTransaction.getFullYear()}-${month}`

      const transaction = await TransactionModel.findByIdAndUpdate(
        { _id: id },
        {
          description,
          value,
          category,
          day,
          month,
          year,
          yearMonth,
          yearMonthDay,
          type,
        },
        { new: true }
      )

      return res.status(200).json(transaction)
    } catch (error) {
      return res.status(400).json({ erro: error })
    }
  },

  async destroy(req, res) {
    const { id } = req.params

    if (!id)
      return res
        .status(400)
        .json({ messagem: "ID do registro deve ser informado." })

    try {
      await TransactionModel.deleteOne({ _id: id })

      return res
        .status(200)
        .json({ messagem: `Registro ${id} excluído com sucesso.` })
    } catch (error) {
      return res.status(400).json({ erro: error })
    }
  },
}
