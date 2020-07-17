/**
 * Estado da aplicação(state)
 */
let tabCountries = null
let tabFavorites = null

let allCountries = []
let allFavoriteCountries = []

let countCountries = 0
let countFavorites = 0

let totalPopulationList = 0
let totalPopulationFavorites = 0

let numberFormat = null


window.addEventListener('load', ()=> {
    tabCountries = document.querySelector('#tab-countries')
    tabFavorites = document.querySelector('#tab-favorites')
    countCountries = document.querySelector('#count-countries')
    countFavorites = document.querySelector('#count-favorites')
    
    totalPopulationList = document.querySelector('#total-population-list')
    totalPopulationFavorites= document.querySelector('#total-population-favorites')

    numberFormat = Intl.NumberFormat('pt-BR')

    fetchCountries()
})

async function fetchCountries() {
   const res = await fetch('http://restcountries.eu/rest/v2/all')
   const json = await res.json()
   allCountries = json.map(country => {
       const {numericCode, translations, population, flag} = country

       return  {
           id: numericCode,
           name: translations.pt,
           population,
           formattedPopulation: formatNumber(population),
           flag
       }
   })

   render()
}

function render() {
    renderCountryList()
    renderFavorites()
    renderSummary()
    
    handleCountryButtons()
}

function renderCountryList() {
    let countriesHTML = '<div>'

    allCountries.forEach(country => {
        const { name, flag, id, population, formattedPopulation } = country

        const countryHTML = `
            <div class="country">
                <div>
                    <a id="${id}" class="waves-effect waves-light btn">+</a>
                </div>
                <div>
                    <img src="${flag}" alt="${name}">
                </div>
                <div>
                    <ul>
                        <li>${name}</li>
                        <li>${formattedPopulation}</li>
                    </ul>
                </div>
            </div>
        `
        countriesHTML += countryHTML
    })

    countriesHTML += '</div>'
    tabCountries.innerHTML = countriesHTML
}

function renderFavorites() {
    let favoritesHTML = '<div>'

    allFavoriteCountries.forEach(country => { 
        const { name, flag, id, population, formattedPopulation } = country

        const favoriteHTML = `
            <div class="country">
                <div>
                    <a id="${id}" class="waves-effect waves-light btn red darken-4">-</a>
                </div>
                <div>
                    <img src="${flag}" alt="${name}">
                </div>
                <div>
                    <ul>
                        <li>${name}</li>
                        <li>${formattedPopulation}</li>
                    </ul>
                </div>
            </div>
        `
        favoritesHTML += favoriteHTML
    })
    

    favoritesHTML += '</div>'
    tabFavorites.innerHTML = favoritesHTML
}

function renderSummary() {
    countCountries.textContent = allCountries.length
    countFavorites.textContent = allFavoriteCountries.length
    
    const totalPopulation = allCountries.reduce((acc, curr) => {
        return acc + curr.population
    }, 0)
    
    const totalFavorites = allFavoriteCountries.reduce((acc, curr) => {
        return acc + curr.population
    }, 0)

    totalPopulationList.textContent = formatNumber(totalPopulation)
    totalPopulationFavorites.textContent = formatNumber(totalFavorites)
}

function handleCountryButtons() {
    const countryButtons = Array.from(tabCountries.querySelectorAll('.btn'))
    const favoriteButtons = Array.from(tabFavorites.querySelectorAll('.btn'))

    countryButtons.forEach(button => {
        button.addEventListener('click', ()=> addToFavorites(button.id))
    })

    favoriteButtons.forEach(button => {
        button.addEventListener('click', ()=> removeFromFavorites(button.id))
    })
}

function addToFavorites(id) {
    const countryToAdd = allCountries.find(country => country.id === id)
    allFavoriteCountries = [...allFavoriteCountries, countryToAdd]
    allFavoriteCountries.sort((a, b)=> {
        return a.name.localeCompare(b.name)
    })

    allCountries = allCountries.filter(country => country.id !== id)

    render()
}

function removeFromFavorites(id) {
    const countryToRemove = allFavoriteCountries.find(button => button.id === id)

    allCountries = [...allCountries, countryToRemove]
    allCountries.sort((a, b)=> {
        return a.name.localeCompare(b.name)
    })

    allFavoriteCountries = allFavoriteCountries.filter(country => country.id !== id)

    render()
}

function formatNumber(number) {
    return numberFormat.format(number)   
}