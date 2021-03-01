const {Router} = require('express')
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

        const {book, desc, author, link, max_available_chapter,last_readed_chapter, total} = req.body
        const code = shortid.generate()
        if (!total) {
          let total = 100
        }

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
        //all books
        const libBooks = await Book.find()

        //my books
        const myBooks = await BookUser.find({user: req.user.userId})

        //add flag 'already in my books'
        if (libBooks && myBooks) {
            for (let i = 0; i < libBooks.length; i++) {
                for (let j = 0; j< myBooks.length; j++) {
                    //if my book present in library
                    if (JSON.stringify(libBooks[i]._id) === JSON.stringify(myBooks[j].book)){
                        //mark book as existed
                        libBooks[i]=Object.assign({}, libBooks[i]._doc, {exist: 1})
                    }
                }
            }
        }
        res.json(libBooks)
    } catch (e) {
        res.status(500).json({message: 'Getting libs book goes wrong, please try again!'})
    }
})

//get user books
router.get('/mybooks', auth, async (req, res) => {
    try {

        //my books
        const myBooks = await BookUser.find({user: req.user.userId})
        //books ids
        const ids = myBooks.map(item => item.book);

        //all my books by ID
        const books = await Book.find({'_id': ids})
        res.json(books)



    } catch (e) {
        res.status(500).json({message: 'Something goes wrong, please try again!'})
    }
})

router.get('/:id', auth, async (req, res) => {
    try {
        let  book = await Book.findById(req.params.id)

        //my books
        const bookDetail = await BookUser.find({user: req.user.userId, book: req.params.id})
            const last_readed_chapter = bookDetail.map(item=>item.last_readed_chapter) || 0
            const itemID = bookDetail.map(item=>item._id)

        book=Object.assign({}, book._doc, {'last_readed_chapter': last_readed_chapter.toString()})
        book=Object.assign({}, book, {'item_id': itemID.toString()})
        //console.log(book)

        res.json(book)
    } catch (e) {
        res.status(500).json({message: 'Something goes wrong, please try again!'})
    }
})

router.post('/updatestat/:id', auth, async (req, res) => {
    try {
        const {last_readed_chapter} = req.body

        const filter = {  _id: req.params.id }
        const newvalues = {$set: { last_readed_chapter: last_readed_chapter } }
        await BookUser.updateOne(filter, newvalues)
        res.json(null)
        res.status(200)
    } catch (e) {
        res.status(500).json({message: 'Details updaiting goes wrong, please try again!'})
    }
})

//bookUser delete
router.post('/delete/:id', auth, async (req, res) => {
    try {
        await BookUser.deleteOne({book: req.params.id})
        res.json(null)
        res.status(200)
    } catch (e) {
        res.status(500).json({message: 'Deleting book from my lib goes wrong, please try again!'})
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

        res.json(null)
        res.status(200)
    } catch (e) {
        res.status(500).json({message: 'Adding book ti my lib goes wrong, please try again!'})
    }
})

//EXPORT!!! DO NOT  FORGET!!!
module.exports = router