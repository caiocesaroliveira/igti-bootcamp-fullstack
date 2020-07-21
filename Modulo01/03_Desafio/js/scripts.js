let inputName = null

let tabUsers = null
let tabStatistics = null

let allUsers = []
let allFoundUsers = []

let labelUsers = null
let labelStatistics = null

let numberFormat = null

window.addEventListener('load', () => {
    inputName = document.querySelector("#input-name")
    btnSearch = document.querySelector("#btn-search")

    labelUsers = document.querySelector("#label-users")
    tabUsers = document.querySelector('#tab-users')

    labelStatistics = document.querySelector("#label-statistics")
    tabStatistics = document.querySelector('#tab-statistics')

    numberFormat = Intl.NumberFormat('pt-BR')

    fetchUsers()
})

async function fetchUsers() {
    const res = await fetch('https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo')
    const json = await res.json()
    const results = await json.results

    allUsers = results.map(user => {
        const { gender } = user
        const { first, last } = user.name
        const { thumbnail } = user.picture
        const { age } = user.dob

        return {
            fullName: first + ' ' + last,
            gender,
            age,
            avatarUrl: thumbnail
        }

    })
    allFoundUsers = allUsers
    
    render()
}

function render() {
    renderControls()
    renderUserData()
}

function renderControls() {
    function activateInputName() {
        inputName.addEventListener('keyup', () => {
            const textInput = event.target.value

            if(textInput === '')
                btnSearch.classList.add('disabled')
            else 
                btnSearch.classList.remove('disabled')

            if (event.key === 'Enter')
                findUserByName(event.target.value)
        })
    }

    function activateSearchButton() {
        btnSearch.addEventListener('click', () => {
            // if (event.target.value !== '')
            findUserByName(inputName.value)
        })
    }

    activateInputName()
    activateSearchButton()
}

function renderUserData() {
    function renderLabels() {
        const totalFoundUsers = allUsers.length

        if (totalFoundUsers > 0) {
            labelUsers.textContent = `${totalFoundUsers} usuário(s) encontrado(s)`
            labelStatistics.textContent = "Estatísticas"
        } else {
            labelUsers.textContent = 'Nenhum usuário filtrado'
            labelStatistics.textContent = 'Nada a ser exibido'
        }
    }

    function renderUserList() {
        let usersHTML = '<div>'

        allUsers.forEach(user => {
            const { fullName, gender, age, avatarUrl } = user

            const userHTML = `
            <div class="user">
                <div>
                    <img src="${avatarUrl}" alt="${fullName}">
                </div>
                <div>
                    <span>${fullName}, ${age} anos</span>
                </div>
            </div>
        `
            usersHTML += userHTML
        })

        usersHTML += '</div>'
        tabUsers.innerHTML = usersHTML
    }

    function renderUserStatistics() {
        if(allUsers.length === 0){
            tabStatistics.innerHTML=''
            return
        }

        const countMale = allUsers.filter(user => user.gender === "male").length
        const countFemale = allUsers.filter(user => user.gender === "female").length

        const sumOfAges = allUsers.reduce((acc, { age }) => {
            return acc + age
        }, 0)

        const avgAges = ((allUsers.length > 0) ? (sumOfAges / allUsers.length) : 0)


        const statisticHTML = `
                <div>
                    <div class="statistic"> 
                        <ul>
                            <li>Sexo masculino: <span><strong>${countMale}</strong></span></li>
                            <li>Sexo feminino: <span><strong>${countFemale}</strong></span></li>
                            <li>Soma das idades: <span><strong>${formatNumber(sumOfAges)}</strong></span></li>
                            <li>Média das idades: <span><strong>${formatNumber(avgAges)}</strong></span></li>
                        </ul>
                    </div>
                </div>
                `

        tabStatistics.innerHTML = statisticHTML
    }

    renderLabels()
    renderUserList()
    renderUserStatistics()
}

function findUserByName(userName) {
    console.log(userName);
    if (userName === '')
        allUsers = allFoundUsers
    else
        allUsers = allFoundUsers.filter(user => {
            return user.fullName.toLowerCase().includes(userName.toLowerCase())
        })

    renderUserData()
}

function formatNumber(number) {
    return numberFormat.format(number)
}