const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    Book: {type: String, required: true},
    Author: {type: String, required: true},
    link: {type: String, required: true},
    code: {type: String, required: true, unique: true},
    max_available_chapter: {type: String, required: true},
    last_readed_chapter: {type: String, required: true},
    date: {type: Date, default: Date.now},
    owner: {type: Types.ObjectId, ref: 'User'}
})

module.exports = model('Book', schema)