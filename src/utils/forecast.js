const request = require('request')

const forecast = (pavadinimas, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=502fee144b01915793ee50b890927213&query='+pavadinimas

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Nagalima prisijungti!', undefined)
        } else if  (response.body.error ) {
            callback('Nera tokios vietos', undefined)
        } else {
            callback(undefined, 'Dabar yra: ' + response.body.current.temperature + ' C jausmas kaip ' + response.body.current.feelslike + ' Vėjo greitis,  Drėgmė ' + response.body.current.humiditygit
                + response.body.current.wind_speed)
        }
        
    })
}



module.exports = forecast