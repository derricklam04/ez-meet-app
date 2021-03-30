const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const planSchema = new Schema({
    startDate: {
        type: Date,
        require: true
    },
    calenderType: {
        type: Number,
        require: true
    },
    timeZone: {
        type: String,
        require: true

    },
    daysOfWeek: {
        type: Map,
        require: true

    },
    timeInterval: {
        type: Number,
        require: true
    },
    startTime: {
        type: Date, 
        require: true,
    },
    endTime: {
        type: Date,
        require: true
    },
    table: {
        type: Array,
        require: true
    },
}, {
    timestamps:true,
});

const Plan = mongoose.model('Plan', planSchema);
module.exports = Plan;