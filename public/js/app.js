const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const zinute1 = document.querySelector('#zinute1')
const zinute2 = document.querySelector('#zinute2')

weatherform.addEventListener('submit', (e) => {
    e.preventDefault()
    const adresas=search.value
    zinute1.textContent = ''
    zinute2.textContent = ''
    fetch('http://localhost:3000/oras?address='+ adresas).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            zinute1.textContent = data.error
        } else {
            zinute1.textContent = data.Vieta
            zinute2.textContent = data.forecastData
        }
        
    })
})
    
})