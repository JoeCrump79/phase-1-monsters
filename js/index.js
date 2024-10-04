const createMonster = document.getElementById('create-monster')
const monsterContainter = document.getElementById('monster-container')
const back = document.getElementById("back")
const forward = document.getElementById("forward")
let pageNumber = 1

function grabAndaddMonsters() {
    console.log(pageNumber)
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${pageNumber}`)
        .then(response => {
            if (!response.ok) {
                console.log(response.status)
            }
            return response.json()
        })
        .then(results => {
            console.log(results)
            monsterContainter.innerHTML = ""
            results.forEach(monster => {
                //console.log(monster)
                const monsterDiv = document.createElement('div')
                monsterContainter.append(monsterDiv)
                const monsterH2 = document.createElement('h2')
                monsterH2.textContent = monster.name
                monsterDiv.append(monsterH2)
                const monsterH4 = document.createElement('h4')
                monsterDiv.append(monsterH4)
                monsterH4.textContent = `Age: ${monster.age}`
                const monsterP = document.createElement('p')
                monsterDiv.append(monsterP)
                monsterP.textContent = `Bio: ${monster.description}`
            })
        })
}

window.addEventListener('load', grabAndaddMonsters)

forward.addEventListener('click', (e) => {
    e.preventDefault()
    console.log('forward')
    pageNumber = pageNumber + 1
    grabAndaddMonsters()
})

back.addEventListener('click', (e) => {
    e.preventDefault()
    console.log('back')
    if (pageNumber > 1) {
        pageNumber = pageNumber - 1
    }
    grabAndaddMonsters()
})

const monsterForm = document.createElement('form')
monsterForm.id = 'monster-form' 
createMonster.append(monsterForm)
const nameInput = document.createElement('input')
nameInput.id = 'name'
nameInput.placeholder = 'name'
monsterForm.append(nameInput)
const ageInput = document.createElement('input')
ageInput.id = 'age'
ageInput.placeholder = 'age'
monsterForm.append(ageInput)
const descriptionInput = document.createElement('input')
descriptionInput.id = 'description'
descriptionInput.placeholder = 'description'
monsterForm.append(descriptionInput)
const createButton = document.createElement('button')
createButton.textContent = 'Create'
monsterForm.append(createButton)

monsterForm.addEventListener('submit', (e) => {
        console.log(nameInput.value)
        console.log(descriptionInput.value)
        console.log(ageInput.value)
        e.preventDefault()
        const configurationObject = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                name: nameInput.value,
                description: descriptionInput.value,
                age: parseFloat(ageInput.value)
                
            }),
        }
        fetch("http://localhost:3000/monsters", configurationObject)
        .then(response => {
            if (!response.ok) {
                console.log(response.status)
            }
            return response.json()
        })
        .then(monster => {
            const monsterDiv = document.createElement('div')
                monsterContainter.append(monsterDiv)
                const monsterH2 = document.createElement('h2')
                monsterH2.textContent = monster.name
                monsterDiv.append(monsterH2)
                const monsterH4 = document.createElement('h4')
                monsterDiv.append(monsterH4)
                monsterH4.textContent = `Age: ${monster.age}`
                const monsterP = document.createElement('p')
                monsterDiv.append(monsterP)
                monsterP.textContent = `Bio: ${monster.description}`
            })
        .catch(function (error) {
            alert("Bad things! Ragnarők!");
            console.log(error.message);
          });
})