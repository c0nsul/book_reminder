const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    name: {type: String, required: true},
    author_id: {type: Types.ObjectId, ref: 'Author'},
    desc: {type: String, required: true},
    link: {type: String, required: true},
    code: {type: String, required: true, unique: true},
    max_available_chapter: {type: String, required: true},
    total: {type: String, required: true},
    date: {type: Date, default: Date.now},
    added_by: {type: Types.ObjectId, ref: 'User'}
})

module.exports = model('Book', schema)