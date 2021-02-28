const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    book: {type: Types.ObjectId, ref: 'Book'},
    user: {type: Types.ObjectId, ref: 'User'},
    last_readed_chapter: {type: String, required: false} //my last chapter
})

module.exports = model('BookUser', schema)