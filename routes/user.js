const express = require("express")
const router = express.Router()
const db = require("../config/db")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
require("dotenv").config()
const checkJWT = require("../middleware/jwt")

// Première route en POST -> Adapter pour le login en React donc renvoyer vers l'app React 
// un message de confirmation si le body de la requete bien reçu

// Faire fonctionner le login 
router.post('/login', (req, res) => {
    let { email, password } = req.body
    // res.json({ email, password }).status(200)

    let sql = "SELECT * FROM users WHERE email = ?"

    db.query(sql, [email], (error, results) => {

        if (error) {
            res.status(500).json("erreur lors du login")
        } else {
            if (results.length) {
                console.log(results)

                bcrypt.compare(password, results[0].password, (error, bool) => {
                    if (error) {
                        res.status(500).json("Erreur lors de la comparaison des mots de passe")
                    } else {
                        if (bool) {
                            // On génére un JWToken contenant l'id du user et qui expire dans 24h
                            let token = jwt.sign({ userId : results[0].id }, process.env.JWT_SECRET_KEY, { expiresIn: '1d'})

                            // On renvoit un cookie vers le front qui contient le JWT et permettra de valider les actions 
                            // les actions du user qui est login. httpOnly signifie que le cookie n'est pas accessible avec JS coté front 
                            // et le secure veut dire que la communication du cookie est chiffrée avec https
                            // Avec sameSite on se protège des attaques de type CSRF
                            res.cookie('token', token, { expires: new Date(Date.now() + 86400000) , httpOnly: true, secure: true, sameSite: 'strict' })

                            res.status(200).json("Login successful !!")

                        } else {
                            res.status(500).json("Mdp sont différents...")
                        }
                    }
                })
            } else {
                res.json("Aucun user trouvé en BDD")
            }
        }
    })
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


router.get('/protected', checkJWT, (req, res) => {

    res.json("JWT valide !!")

})


module.exports = router