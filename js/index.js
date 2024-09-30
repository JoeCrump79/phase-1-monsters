const createMonster = document.getElementById('create-monster')
const monsterContainter = document.getElementById('monster-container')
const back = document.getElementById("back")
const forward = document.getElementById("forward")

window.addEventListener('load', (e) => {
    // TODO: Add paging
    fetch(`http://localhost:3000/monsters/?_limit=50`)
    .then(response => {
        if (!response.ok) {
            console.log(response.status)
        }
        return response.json()
    })
    .then(results => {
        results.forEach(monster => {
            console.log(monster)

            // TODO: Create elements to show monster 
        })
    })
})