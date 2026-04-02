//// DIFFERENTS REQUIRE 
// app.js -> Fichier d'entrée de notre API Express/Node
const express = require('express')
// On require les cors qui vont nous permettre de configurer qui peut effectuer des requetes vers l'API
const cors = require("cors")
const cookieParser = require('cookie-parser')

// Je recup mes routers qui contiennent les différentes routes 
const userRouter = require("./routes/user")
const indexRouter = require("./routes/index")
const todoRouter = require("./routes/todo")

//// CONFIGURATION API
// On crée notre app express 
const app = express()

// On définit le port d'écoute -> sur quel port l'API tourne ?
const port = 3000

// Configuration des cors avec les options
const corsOptions = {
    origin: "http://localhost:5173",
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
} 

// On utilise les cors dans notre app express en passant les options en param
app.use(cors(corsOptions))

// On convertit toutes nos données reçues via des requetes en JSON
app.use(express.json())

// On utilise cookie-parser pour accéder aux cookies entrants 
app.use(cookieParser())

//// ROUTES DE L'API (UTILISATION DES ROUTERS)
// Utilisation du router qui regroupe l'ensemble des routes par contexte (contexte du user, de l'index en général etc)
app.use('/', indexRouter)
app.use('/user', userRouter)
app.use('/todo', todoRouter)




//// ECOUTE SUR LE PORT 3000
app.listen(port, () => {
  console.log(`Notre app Express écoute le port ${port}`)
})


/// Pour la todo dans l'API 
// 1 - Créer les bonnes routes en passant par un autre fichier de router 
// (ex : localhost:3000/todo) 
// Actions : Affichage des todos / Ajout de todo / Modif / suppression 
// 2 - Pour chacune des routes réaliser les opérations SQL nécessaires vers la BDD 
// 3 - Bien communiquer vers le front en cas d'erreur / succès.

// BDD
// !! Il faudra aussi créer une table todo avec les colonnes adequatezs dans phpmyadmin