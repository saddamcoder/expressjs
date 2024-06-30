const express = require('express');
const router = express.Router();


router.get('/', function (req, res) {
    res.send('Welcome to the posts page!');
})

router.get('/new', function (req, res) {
    res.send('Welcome to the new post page!');
})

module.exports = router;