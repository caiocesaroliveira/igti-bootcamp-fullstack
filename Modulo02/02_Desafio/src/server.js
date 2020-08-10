import express from "express"
import routerGrades from "./routes.js"

const app = express()

app.use(express.json())
app.use("/grades", routerGrades)

app.listen(3000, () => console.log("API Started"))
