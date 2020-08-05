const fs = require("fs").promises

// Função inicial
init()
async function init() {
  await createFiles()
  
  await getStatesWithMoreOrLessCities(true)
  await getStatesWithMoreOrLessCities(false)

  await getBiggerOrSmallerNameCities(true)
  await getBiggerOrSmallerNameCities(false)

  await getBiggerOrSmallerCityName(true)
  await getBiggerOrSmallerCityName(false)
}

// Item 1 - Criar arquivos de estados separadamente
async function createFiles() {
  const states = JSON.parse(await fs.readFile("./files/Estados.json"))

  const cities = JSON.parse(await fs.readFile("./files/Cidades.json"))

  for (const state of states) {
    const stateCities = cities.filter((city) => city.Estado === state.ID)
    await fs.writeFile(
      `./states/${state.Sigla}.json`,
      JSON.stringify(stateCities)
    )
  }
}

// Item 2 - Criar função que retorne a quantidade de cidades do estado informado no parametro "uf"
async function getCitiesCount(uf) {
  const cities = JSON.parse(await fs.readFile(`./states/${uf}.json`))
  return cities.length
}

// Item 3 - Imprime array com os 5 estados com mais cidades em ordem decrescente
// Item 4 - Imprime array com os 5 estados com menos cidades em ordem decrescente
async function getStatesWithMoreOrLessCities(more) {
  const states = JSON.parse(await fs.readFile("./files/Estados.json"))
  const list = []

  for (const state of states) {
    const count = await getCitiesCount(state.Sigla)
    list.push({ uf: state.Sigla, count })
  }

  //ordena descrescente
  list.sort((a, b) => b.count - a.count)

  const result = []
  //retorna os 5 primeiros
  if (more) {
    list.slice(0, 5).forEach((item) => {
      result.push(`${item.uf} - ${item.count}`)
    })
  } else {
    list.slice(-5).forEach((item) => {
      result.push(`${item.uf} - ${item.count}`)
    })
  }

  console.log(result)
}

// Item 5 - Imprime array com as cidades de maior nome de cada estado
async function getBiggerName(uf) {
  const cities = JSON.parse(await fs.readFile(`./states/${uf}.json`))

  let maxCity = ""
  cities.forEach((city) => {
    if (!maxCity) maxCity = city
    else if (city.Nome.length > maxCity.Nome.length) maxCity = city
    else if (
      city.Nome.length === maxCity.Nome.length &&
      city.Nome.toLowerCase() < maxCity.Nome.toLowerCase()
    )
      maxCity = city
  })

  return maxCity
}

// Item 6 - Imprime array com as cidades de menor nome de cada estado
async function getSmallerName(uf) {
  const cities = JSON.parse(await fs.readFile(`./states/${uf}.json`))

  let maxCity = ""
  cities.forEach((city) => {
    if (!maxCity) maxCity = city
    else if (city.Nome.length < maxCity.Nome.length) maxCity = city
    else if (
      city.Nome.length === maxCity.Nome.length &&
      city.Nome.toLowerCase() < maxCity.Nome.toLowerCase()
    )
      maxCity = city
  })

  return maxCity
}

async function getBiggerOrSmallerNameCities(bigger) {
  const states = JSON.parse(await fs.readFile("./files/Estados.json"))

  const result = []
  for (const state of states) {
    const city = bigger
      ? await getBiggerName(state.Sigla)
      : await getSmallerName(state.Sigla)
    result.push(`${city.Nome} - ${state.Sigla}`)
  }
  console.log(result)
}

// Item 7
async function getBiggerOrSmallerCityName(bigger) {
  const states = JSON.parse(await fs.readFile("./files/Estados.json"))
  const list = []

  for (state of states) {
    const city = bigger
      ? await getBiggerName(state.Sigla)
      : await getSmallerName(state.Sigla)
    list.push({ name: city.Nome, uf: state.Sigla })
  }

  const result = list.reduce((acc, curr) => {
    if (bigger) {
      if (acc.name.length > curr.name.length) return acc
      else if (acc.name.length < curr.name.length) return curr
      else return acc.name.toLowerCase() < curr.name.toLowerCase() ? acc : curr
    } else {
      if (acc.name.length < curr.name.length) return acc
      else if (acc.name.length > curr.name.length) return curr
      else return acc.name.toLowerCase() < curr.name.toLowerCase() ? acc : curr
    }
  })

  console.log(`${result.name} - ${result.uf}`)
}
