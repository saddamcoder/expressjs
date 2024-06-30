const express = require('express');
const router = express.Router();


router.get('/', function (req, res) {
    res.status(200).send('Welcome to the users page!');
})


router.post('/', function (req, res) {
    res.status(200).send('Welcome to the users page!');
})


router
    .route('/:id')
    .get((req, res) => {
        console.log(req.user)
        res.status(200).send(`Welcome to the new users page! ${req.params.id}`);
    })
    .put((req, res) => {
        res.status(200).send(`Update to the new User id page! ${req.params.id}`);
    })
    .delete((req, res)=> {
        res.status(200).send('Delete to the User ID!')
    })

const users = [{name: "kyle"}, {name:"Sally"}]
router.param("id", (req, res, next, id) =>{
    req.user = users[id]
    next()
})

module.exports = router;