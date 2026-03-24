const express = require("express")
const router = express.Router()


// Une première route en GET en guise d'exemple 
router.get('/', (req, res) => {
    res.send('Hello World!')
})


module.exports = router