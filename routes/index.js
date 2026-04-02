const express = require("express")
const router = express.Router()


// Une première route en GET en guise d'exemple 
router.get('/', (req, res) => {
    res.send('Hello World!')
})

router.get('/contact', (req, res) => {
    res.send('Ici cest la route pour le contact')
})


module.exports = router