const {Router} = require('express')
//lodash
const _ = require( 'lodash' )
//shortid
const shortid = require('shortid')
//validator
const {check, validationResult} = require('express-validator')
//model
const Book = require('../models/Book')
const BookUser = require('../models/BookUser')
//auth middleware
const auth = require('../middleware/auth.middleware')
//router
const router = Router()

router.post('/create',auth,async (req, res) => {
    try {

        const {book, desc, author, link, max_available_chapter,last_readed_chapter} = req.body
        const code = shortid.generate()
        const total = '100?'

        if (!book || !author || !link || !max_available_chapter || !last_readed_chapter){
            return res.status(400).json({message: 'Please fill all fields'})
        }

        const existing = await Book.findOne({book})
        if (existing) {
            return res.json({newBook: existing})
        }

        //add new book
        const newBook = new Book({
            desc:desc, total:total, book:book, author:author, link, max_available_chapter, code, owner: req.user.userId
        })
        await newBook.save()

        //add book to user
        const newReader = new BookUser({
                book: newBook._id, user:req.user.userId, last_readed_chapter:last_readed_chapter
            }
        )
        await newReader.save()

        res.status(201).json({newBook})

    } catch (e) {
        res.status(500).json({message: 'Something goes wrong while creation, please try again!'})
    }
})

//get all possible books
router.get('/bookslib', auth, async (req, res) => {
    try {
        const libBooks = await Book.find()

        //get mybooks
        const myBooks = await BookUser.find({user: req.user.userId})

        //add flag 'already in my books'
        if (libBooks && myBooks) {
            for (let i = 0; i < libBooks.length; i++) { //проходимся по первому масиву
                for (let j = 0; j< myBooks.length; j++) { // ищем соотвествия во втором массиве
                    if (JSON.stringify(libBooks[i]._id) === JSON.stringify(myBooks[j].book)){
                        libBooks[i]=Object.assign({}, libBooks[i]._doc, {exist: 1})
                    }
                }
            }
        }

        res.json(libBooks)
    } catch (e) {
        res.status(500).json({message: 'Something goes wrong, please try again!'})
    }
})

//get user books
//todo:
//1. books by user
//2 get books data acording book
router.get('/mybooks', auth, async (req, res) => {
    try {

        //get user data from middleware
        const books = await Book.find({owner: req.user.userId})
        //const allUserBooks = await BookUser.find({user: req.user.userId})
        //console.log(allUserBooks)
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

//bookUser delete
router.post('/delete/:id', auth, async (req, res) => {
    try {
        BookUser.deleteOne({book: req.params.id})
        res.status(200)
    } catch (e) {
        res.status(500).json({message: 'Deleting goes wrong, please try again!'})
    }
})

//bookUser add
router.post('/add/:id', auth, async (req, res) => {
    try {

        //add book to user
        const newReader = new BookUser({
                book: req.params.id, user:req.user.userId
            }
        )
        await newReader.save()

        res.status(200)
    } catch (e) {
        res.status(500).json({message: 'Deleting goes wrong, please try again!'})
    }
})

//EXPORT!!! DO NOT  FORGET!!!
module.exports = router