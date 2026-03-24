const express = require("express")
const router = express.Router()
const db = require("../config/db")
const bcrypt = require("bcrypt")

// Première route en POST -> Adapter pour le login en React donc renvoyer vers l'app React 
// un message de confirmation si le body de la requete bien reçu
router.post('/login', (req, res) => {
    console.log(req.body)
    let { email, password } = req.body
    res.json({ email, password }).status(200)
})

// Route pour le signup
router.post('/signup', (req, res) => {
    let { email, username, password } = req.body

    // On vient d'abord hasher le mdp avec bcrypt
    bcrypt.hash(password, 10, (error, hash) => {
        if (error) {
            res.status(500).json("erreur lors du hash du mdp")
        } else {
            // Si le hash a fonctionné on fait notre req prpéparée
            const sql = "INSERT INTO users(username, email, password) VALUES(?, ?, ?)"

            // Execution de la requete
            db.query(sql, [email, username, hash], (error, results) => {
                if (error) {
                    res.status(500).json("Erreur survenue lors de l'ajout d'un user")
                } else {
                    // Si succès on renvoit un code au front ainsi qu'un message
                    console.log(results)
                    res.status(200).json("User ajouté avec succès")
                }
            })
        }
    })
})


module.exports = router