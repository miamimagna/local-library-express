const mongoose = require('mongoose');
const {Schema} = mongoose;
const {DateTime} = require('luxon');

const BookInstanceSchema = new Schema({
    book: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Book',
    },
    imprint: {
        type: String, 
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: ['Available', 'Maintenance', 'Loaned', 'Reserved'],
        default: 'Maintenance'
    },
    due_date: {
        type: Date,
        default: Date.now
    },
});

BookInstanceSchema.virtual('url').get(function() {
    return `/catalog/bookinstance/${this._id}`;
});


BookInstanceSchema.virtual('due_date_formatted').get(function () {
    return DateTime.fromJSDate(this.due_date).toLocaleString(DateTime.DATE_MED);
})
const BookInstance = mongoose.model('BookInstance', BookInstanceSchema);

module.exports = BookInstance;