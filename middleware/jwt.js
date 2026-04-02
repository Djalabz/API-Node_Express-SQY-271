const jwt = require("jsonwebtoken")
require("dotenv").config()

/// Ici nous avons un middleware qui vient vérifier si notre token JWT est bien présent et valide
// Si c'est bon on passe à l'opération suivante avec Next
const checkJWT = (req, res, next) => {
    const token = req.cookies['token'] 

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, results) => {
        if (err) {
            res.status(403).json("token invalide...")
            res.redirect("/login")
        } else {
            // res.json("Check JWT validé on passe à la suite")
            next()
        }
    })
} 


module.exports = checkJWT
