const router = require('express').Router();
let Week = require('../models/week.model'); 

router.route('/').get((req,res) => {
    Week.find()
        .then(weeks => res.json(weeks))
        .catch(err => res.status(400).json("Error: "+err));
});

router.route('/add').post((req, res) => {
    // const accessCode = req.body.accessCode;
    const calenderType = req.body.calenderType;
    const timeZone = req.body.timeZone;
    const daysOfWeek = req.body.daysOfWeek;
    const timeInterval = req.body.timeInterval;
    const startTime = req.body.startTime;
    const endTime = req.body.endTime;
    // const grid = req.body.grid;

    const newWeek = new Week({calenderType,
         timeZone,daysOfWeek, timeInterval, startTime, endTime });
    
    //console.log(newWeek);

    newWeek.save() 
    .then(() => res.json(`Week added [Access Code: ${newWeek.id}]`))
    .catch(err => res.status(400).json("Error: " + err));
})

router.route('/:id').get((req, res) => {
    Week.findById(req.params.id)
        .then(week => res.json(week))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Week.findByIdAndDelete(req.params.id)
        .then(week => res.json("Deleted Week: "+ week.accessCode))
        .catch(err => res.status(400).json('Error: ' + err))
});

router.route('/update/:id').post((req, res) => {
    Week.findById(req.params.id)
        .then(week => {
            week.accessCode = req.body.accessCode;
            week.grid = req.body.grid;

            week.save()
                .then(() => res.json(`Week [${week.accessCode}] updated!`))
                .catch(err => res.status(400).json('Error: '+err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;