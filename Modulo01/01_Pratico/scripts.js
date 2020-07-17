window.addEventListener("load", () => {
    const inputs = document.querySelectorAll('input[type="range"]')

    inputs.forEach(input => {
        // input.value = 0

        input.addEventListener('input', () => {
            const inputValue = document.querySelectorAll('input[type="text"]')
            const divColor = document.getElementById('color')

            const red = inputs[0].value
            const green = inputs[1].value
            const blue = inputs[2].value

            inputValue[0].value = red
            inputValue[1].value = green
            inputValue[2].value = blue

            inputs[0].style.backgroundColor = `rgb(${red}, 0, 0)`
            inputs[1].style.backgroundColor = `rgb(0, ${green}, 0)`
            inputs[2].style.backgroundColor = `rgb(0, 0, ${blue})`

            divColor.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`
        })
    })
})
