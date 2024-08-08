const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {DateTime} = require('luxon');

const AuthorSchema = new Schema({
    first_name: {
        type: String,
        required: true,
        maxLength: 100,
    },
    family_name: {
        type: String,
        required: true,
        maxLength: 100
    },
    date_of_birth: Date,
    date_of_death: Date,
});

AuthorSchema.virtual('name').get(function () {
    let fullname = '';
    if(this.first_name && this.family_name) {
        fullname = `${this.family_name}, ${this.first_name}`;
    }

    return fullname;
});

AuthorSchema.virtual('date_of_birth_formatted').get(function() {
    return this.date_of_birth?  DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED): 'DOB: NA';
})

AuthorSchema.virtual('date_of_death_formatted').get(function() {
    return this.date_of_death?  DateTime.fromJSDate(this.date_of_death).toLocaleString(DateTime.DATE_MED): 'present';
})

// virtual for Author's url
AuthorSchema.virtual('url').get(function() {
    return `/catalog/author/${this._id}`;
});

const Author = mongoose.model('Author', AuthorSchema);
module.exports = Author;