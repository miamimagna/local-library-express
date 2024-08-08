const mongoose = require('mongoose');
const {Schema} = mongoose;

const GenreSchema = new Schema({
    name: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 100
    }
});

GenreSchema.virtual('url').get(function(){
    return `/catalog/genre/${this._id}`
});

const Genre = mongoose.model('Genre', GenreSchema);
module.exports = Genre;