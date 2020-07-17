# Capítulo 4 - JavaScript Moderno - Aula 10

## Var x Let x Const

## Arrow Functions

## Template Literals

## Default Parameters


# Capítulo 4 - JavaScript Moderno - Aula 11
## Arrays com ES6+
- ```map``` ➡ gera um novo array transformando os dados.
```
const nameArray = people.map(person => {
    return {
        name: person.name,
        email: person.email
    }
})
console.log(nameArray)
```
- ```filter``` ➡ gera um novo array filtrando elementos com base em proposição.
- ```forEach``` ➡ percorre todos os elementos do array, aplicando lógica.
- ```reduce``` ➡ realiza cálculo iterativo com base nos elementos.
```
function doReduce(){
    const totalAges = people.results.reduce((accumulator, current) => {}, 0)
    return accumulator + current
}

console.log(doReduce())
```
- ```find``` ➡ encontra elementos com base em proposições.
- ```some``` ➡ verifica se há pelo menos um elemento que atenda à proposição.
- ```every``` ➡ verifica se todos os elementos atendem à proposição.
- ```sort``` ➡ ordena os elementos com base em um critério.



# Capítulo 4 - JavaScript Moderno - Aula 12
## Spred Operator 
- Muito útil para trabalhar com arrays e objetos.
- Em arrays, este operador espalha os itens do array, que podem ser recuperados para compor outro array, por exemplo.

## Rest Operator 
- Muito útil para trabalhar com arrays e objetos.
- Como rest, é comum a utilização em funções, agrupando os parâmetros em um array.
- Principal aplicação ➡ permitir funções com número infinito de parâmetros

## Destructuring
- Facilita a escrita ao trabalhar com objetos.
- Torna o código mais claro.
- É também possível utilizar a técnica de destructuring com arrays, usando [].


# Capítulo 4 - JavaScript Moderno - Aula 1
4
## Funções Assíncronas

### ```SetTimeout```
 - Utiliza para postergar a execução de uma função.
 - Tempo de atraso configurável em milisegundos

### ```SetInterval```
- Semelhante ao SetTimeout, mas repete a execução a cada X milisegundos.
- Pode ser cancelada com ```clearInterval```.
- Para isso, devemos guardar a referência em uma variável.