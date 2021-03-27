const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const planSchema = new Schema({
    // accessCode: {
    //     type: String,
    //     require: true,
    //     unique: true,
    //     trim: true,
    //     minlength: 3
    // },
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
        type: String, 
        require: true,
    },
    endTime: {
        type: String,
        require: true
    },
    // grid: {
    //     type: Array,
    //     require: true
    // },
}, {
    timestamps:true,
});

const Plan = mongoose.model('Plan', planSchema);
module.exports = Plan;