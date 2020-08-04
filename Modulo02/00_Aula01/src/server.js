import { promises as fs } from "fs"

init()

const teams = []

async function init() {
  try {
    // leitura do arquivo 2003.json
    const data = JSON.parse(await fs.readFile("src/database/2003.json"))

    // inicializando o array de times
    data[0].partidas.forEach(({ mandante, visitante }) => {
      teams.push({ team: mandante, score: 0 })
      teams.push({ team: visitante, score: 0 })
    })

    //preenchendo a pontuação dos times no array de times
    data.forEach(({ partidas }) => {
      partidas.forEach(
        ({ placar_mandante, placar_visitante, mandante, visitante }) => {
          const homeTeam = teams.find(({ team }) => team === mandante)
          const visitorTeam = teams.find(({ team }) => team === visitante)

          if (placar_mandante > placar_visitante) {
            //3pontos pro mandante
            homeTeam.score += 3
          } else if (placar_visitante > placar_mandante) {
            //3pontos pro visitante
            visitorTeam.score += 3
          } else {
            //1 ponto para cada
            homeTeam.score += 1
            visitorTeam.score += 1
          }
        }
      )
    })

    teams.sort((a, b) => {
      return b.score - a.score
    })

    await saveTeams()
  } catch (error) {
    console.log(error)
  }
}

async function saveTeams() {
  await fs.writeFile("src/database/times.json", JSON.stringify(teams))
}
