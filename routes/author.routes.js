const {Router} = require('express')
//shortid
const shortid = require('shortid')
//model
const Author = require('../models/Author')
const Book = require('../models/Book')
//auth middleware
const auth = require('../middleware/auth.middleware')
//router
const router = Router()

router.get('/:id', auth, async (req, res) => {
    try {
        const result = []
        result.push({author: await Author.findById(req.params.id), books: await Book.find({author_id: req.params.id})})

        res.json(result)
    } catch (e) {
        res.status(500).json({message: 'Something goes wrong, please try again!'})
    }
})

//EXPORT!!! DO NOT  FORGET!!!
module.exports = router