const express = require("express")
const TransactionService = require("../services/TransactionService")

const routes = express.Router()

routes.get("/", TransactionService.index)
routes.get("/:id", TransactionService.details)
routes.post("/", TransactionService.store)
routes.put("/:id", TransactionService.update)
routes.delete("/:id", TransactionService.destroy)

module.exports = routes
