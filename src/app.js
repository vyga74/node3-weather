const path = require('path')
const express = require('express')
const hbs=require('hbs')
const forecast = require('./utils/forecast')

const app = express()

// Direktoriju aprasymas Express'ui
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partitialsPath = path.join(__dirname, '../templates/partitials')


// handellbars nustatymas is kur paimt
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partitialsPath)

// stacionarios patarnavimo direktorijos nustatymas
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        pavadinimas: 'Orai apsas',
        vardas: 'Vyga'
    })
})

app.get('/apie', (req, res) => {
    res.render('apie', {
        pavadinimas: 'Apie mane',
        vardas: 'Vyga'
    })
})

app.get('/pagalba', (req, res) => {
    res.render('pagalba', {
        pavadinimas: 'Pagalba',
        tekstas: 'Kazkoks tekstas ar parasymas',
        vardas: 'Vyga'
    })
})

app.get('/oras', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Reikia ivest adresa'
        })   
    }
    miestas = req.query.address
    forecast( miestas, (error, forecastData) => {
        if (error) {
            return console.log( error)
        }
        res.send({
            Vieta: miestas,
            forecastData
        })
            
            
          })


    // res.send({
    //     Vieta: 'Kursenai',
    //     Oras: miestas + ': Dabar yra ' + atsakymas.temperatura +' C, jausmas kaip ' + atsakymas.jaucias + ' C, vėjo gritis ' + atsakymas.vejas,
    //     adresas: req.query.address
    // })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'reikia ivest ko ieskot'
        })
    } else {

    }
    console.log(req.query)
    res.send ({
        products: []
    })
})

app.get('/pagalba/*', (req, res) => {
    res.render('klaida', {
        pranesimas: 'Tokia pagalba nerasta',
        pavadinimas: 'KLAIDA !!!',
        vardas: 'Vyga'
    })
})


app.get('*', (req, res) => {
    res.render('klaida', {
        pranesimas: 'Puslapis nerastas',
        pavadinimas: 'KLAIDA !!!',
        vardas: 'Vyga'
    })
})

//app.com
//app.com/helpa
//app.com/about

app.listen(3000, () => {
    console.log('Serveris veikia 300 portas')
})