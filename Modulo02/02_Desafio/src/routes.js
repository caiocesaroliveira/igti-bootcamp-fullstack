import express from "express"
import { promises } from "fs"

const router = express.Router()

const { readFile, writeFile } = promises

const fileName = "src/data/grades.json"

router.get("/all/:student", async (req, res) => {
  try {
    const { student } = req.params
    const data = JSON.parse(await readFile(fileName))

    const grade = data.grades.find((grade) => grade.student === student)
    res.send(grade)
  } catch (error) {
    res.status(400).send({ error: error.message })
  }
})

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params
    const data = JSON.parse(await readFile(fileName))

    const grade = data.grades.find((grade) => grade.id === parseInt(id))
    res.send(grade)
  } catch (error) {
    res.status(400).send({ error: error.message })
  }
})

router.post("/", async (req, res) => {
  const newGrade = req.body
  let grade = null

  try {
    const data = JSON.parse(await readFile(fileName))

    grade = {
      id: data.nextId++,
      timestamp: new Date(),
      ...newGrade,
    }

    data.grades.push(grade)

    await writeFile(fileName, JSON.stringify(data, null, 2))

    return res.send(data)
  } catch (error) {
    res.status(400).send({ error: error.message })
  }
})

router.put("/", async (req, res) => {
  try {
    let grade = req.body

    const data = JSON.parse(await readFile(fileName))
    const index = data.grades.findIndex((g) => g.id === grade.id)

    if (index === -1) {
      throw new Error("Registro não encontrado.")
    }

    data.grades[index].student = grade.student
    data.grades[index].subject = grade.subject
    data.grades[index].type = grade.type
    data.grades[index].value = grade.value

    await writeFile(fileName, JSON.stringify(data, null, 2))

    res.send(grade)
  } catch (error) {
    res.status(400).send({ error: error.message })
  }
})

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params
    const data = JSON.parse(await readFile(fileName))

    data.grades = data.grades.filter((grade) => grade.id !== parseInt(id))

    await writeFile(fileName, JSON.stringify(data, null, 2))

    res.send(data)
  } catch (error) {
    res.status(400).send({ error: error.message })
  }
})

router.get("/total/:student/:subject", async (req, res) => {
  try {
    const { student, subject } = req.params
    const data = JSON.parse(await readFile(fileName))

    const total = data.grades
      .filter((grade) => {
        return grade.student === student && grade.subject === subject
      })
      .reduce((acc, curr) => {
        return acc + curr.value
      }, 0)

    res.status(201).send({ total })
  } catch (error) {
    res.status(400).send({ error: error.message })
  }
})

router.get("/average/:subject/:type", async (req, res) => {
  try {
    const { subject, type } = req.params
    const data = JSON.parse(await readFile(fileName))

    const notas = data.grades.filter((grade) => {
      return grade.subject === subject && grade.type === type
    })

    const sumNotas = notas.reduce((acc, curr) => {
      return acc + curr.value
    }, 0)

    const avgNotas = sumNotas / notas.length

    res.status(201).send({ avgNotas })
  } catch (error) {
    res.status(400).send({ error: error.message })
  }
})

router.get("/best/:subject/:type", async (req, res) => {
  try {
    const { subject, type } = req.params
    const data = JSON.parse(await readFile(fileName))

    let dataNotas = []
    const notas = data.grades
      .filter((grade) => {
        return grade.subject === subject && grade.type === type
      })
      .sort((a, b) => {
        return b.value - a.value
      })
      .slice(0, 3)

    res.status(201).send({ notas })
  } catch (error) {
    res.status(400).send({ error: error.message })
  }
})

export default router
