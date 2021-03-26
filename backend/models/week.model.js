const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const weekSchema = new Schema({
    accessCode: {
        type: String,
        require: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    grid: {
        type: Array,
        require: true
    },
}, {
    timestamps:true,
});

const Week = mongoose.model('Week', weekSchema);
module.exports = Week;