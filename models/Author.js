const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    name: {type: String, required: true},
    code: {type: String, required: true, unique: true},
    date: {type: Date, default: Date.now},
    books: [{type: Types.ObjectId, ref: 'Book'}],
    added_by: {type: Types.ObjectId, ref: 'User'}
})

module.exports = model('Author', schema)