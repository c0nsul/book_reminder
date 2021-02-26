const {Router} = require('express')
//shortid
const shortid = require('shortid')
//validator
const {check, validationResult} = require('express-validator')
//model
const Book = require('../models/Book')
//auth middleware
const auth = require('../middleware/auth.middleware')
//router
const router = Router()

router.post('/create',auth,async (req, res) => {
    try {

        const {book, author, link, max_available_chapter,last_readed_chapter} = req.body
        const code = shortid.generate()

        if (!book || !author || !link || !max_available_chapter || !last_readed_chapter){
            return res.status(400).json({message: 'Please fill all fields'})
        }

        const existing = await Book.findOne({book})
        if (existing) {
            return res.json({newBook: existing})
        }

        const newBook = new Book({
            book:book, author:author, link, max_available_chapter, last_readed_chapter, code, owner: req.user.userId
        })
        console.log(newBook)
        await newBook.save()

        res.status(201).json({newBook})

    } catch (e) {
        res.status(500).json({message: 'Something goes wrong while creation, please try again!'})
    }
})

router.get('/', auth, async (req, res) => {
    try {
        //get user data from middleware
        const books = await Book.find({owner: req.user.userId})
        res.json(books)
    } catch (e) {
        res.status(500).json({message: 'Something goes wrong, please try again!'})
    }
})

router.get('/:id', auth, async (req, res) => {
    try {
        const book = await Book.findById(req.params.id)
        res.json(book)
    } catch (e) {
        res.status(500).json({message: 'Something goes wrong, please try again!'})
    }
})

//EXPORT!!! DO NOT  FORGET!!!
module.exports = router