const {Router} = require('express')
//shortid
const shortid = require('shortid')
//model
const Book = require('../models/Book')
//auth middleware
const auth = require('../middleware/auth.middleware')
//router
const router = Router()

router.post('/create', auth, async (req, res) => {

    try {

        const {book} = req.body.book
        const {author} = req.body.author
        const {link} = req.body.link
        const {max_available_chapter} = req.body.max_available_chapter
        const {last_readed_chapter} = req.body.last_readed_chapter
        const code = shortid.generate()

        const existing = await Book.findOne({book})
        if (existing) {
            return res.json({book: existing})
        }

        const newBook = new Book({
            book, author, link, max_available_chapter, last_readed_chapter, code, owner: req.user.userId
        })
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