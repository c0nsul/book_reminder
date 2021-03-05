const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    books: [{type: Types.ObjectId, ref: 'Book'}],
    role: {type: String, required: true}
})

module.exports = model('User', schema)