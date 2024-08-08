const mongoose = require('mongoose');
const {Schema} = mongoose;

const BookSchema = new Schema({
    title: {
        type: String,
        required: true,
        maxLength: 100
    },
    author: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Author'
    },
    genre: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Genre'
        }
    ],
    summary: {
        type: String,
        required: true
    },
    isbn: {
        type: String,
        required: true
    }
});

BookSchema.virtual('url').get(function() {
    return `/catalog/book/${this._id}`;
})

const Book = mongoose.model('Book', BookSchema);

module.exports = Book;