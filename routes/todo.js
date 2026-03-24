const express = require("express")
const router = express.Router()
const db = require("../config/db")

// Lister les todos 
router.get('/', (req, res) => {
    // Ici on va recup avec SELECT l'ensemble des todos
    const sql = "SELECT * FROM todos"

    db.query(sql, (error, results) => {
        if (error) {
            console.log(error)
            res.status(500).send("Erreur lors de la récupération des todos")
        } else {
            if (results.length) {
                res.status(200).json(results)
            } else {
                res.status(404).send("Aucune todo trouvée en BDD ...")
            }
        }
    })
})

// Ajouter une todo 
router.post('/add', (req, res) => {
    const { content, check }  = req.body

    const sql = "INSERT INTO todos(content, checked) VALUES(?, ?)"

    db.query(sql, [content, check], (err, results) => {
        if (err) {
            console.log(err)
            res.status(500).json("Erreur lors de l'ajout d'une todo")
        } else {
            console.log(results)
            res.status(200).json("Todo ajoutée avec succès !")
        }
    })
})

// Modifier une todo
// router.put('/update/:id', (req, res) => {

// } )

// Supprimer une todo 
// router.delete('/delete/:id', (req, res) => {

// })

module.exports = router