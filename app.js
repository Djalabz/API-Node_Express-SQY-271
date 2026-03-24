//// DIFFERE?TS REQUIRE 
// app.js -> Fichier d'entrée de notre API Express/Node
const express = require('express')
// On require les cors qui vont nous permettre de configurer qui peut effectuer des requetes vers l'API
const cors = require("cors")


//// CONFIGURATION API
// On crée notre app express 
const app = express()

// On définit le port d'écoute -> sur quel port l'API tourne ?
const port = 3000

// Configuration des cors avec les options
const corsOptions = {
    origin: "*",
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
} 

// On utilise les cors dans notre app express en passant les options en param
app.use(cors(corsOptions))

// On convertit toutes nos données reçues via des requetes en JSON
app.use(express.json())


//// ROUTES DE L'API
// Une première route en GET 
app.get('/', (req, res) => {
  res.send('Hello World!')
})

// Une route /bonsoir qui nous envoir en réponse la string "bonsoir"
app.get('/bonsoir', (req, res) => {
    res.send("bonsoir")
})


//// ECOUTE SUR LE PORT 3000
app.listen(port, () => {
  console.log(`Notre app Express écoute le port ${port}`)
})
