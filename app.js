//NPM MODULES:
const express = require('express')
//config configuration
const config = require('config')
//mongo db
const mongoose = require('mongoose')
//routes
const routes = require('./routes/auth.routes')
//path
const path = require('path')

//init
const app = express()
//convert BODY to json!!!!!
app.use(express.json({extended: true}))

//app
app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/book', require('./routes/book.routes'))

if (process.env.NODE_ENV === 'production'){
    app.use('/', express.static(path.join(__dirname, 'client', 'build')))

    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

const PORT = config.get('port') || 5000

async function  start() {
    try {
        await mongoose.connect(
            config.get('mongoURI'), {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true
            })
        app.listen(PORT, ()=>console.log(`App has been started on port ${PORT}...`))
    } catch (e) {
        console.log('server error: ', e.message)
    }
}
start()

