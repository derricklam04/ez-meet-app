const router = require('express').Router();
let Plan = require('../models/plan.model'); 

router.route('/').get((req,res) => {
    Plan.find()
        .then(plans => res.json(plans))
        .catch(err => res.status(400).json("Error: "+err));
});

router.route('/add').post((req, res) => {
    const title = req.body.title;
    const startDate = req.body.startDate;
    const calenderType = req.body.calenderType;
    const timeZone = req.body.timeZone;
    const daysOfWeek = req.body.daysOfWeek;
    const timeInterval = req.body.timeInterval;
    const startTime = req.body.startTime;
    const endTime = req.body.endTime;
    const table = req.body.table;

    const newPlan = new Plan({title, startDate, calenderType,
         timeZone,daysOfWeek, timeInterval, startTime, endTime, table});
    
    newPlan.save() 
    .then(() => res.json(`${newPlan.id}`))
    .catch(err => res.status(400).json("Error: " + err));
})

router.route('/:id').get((req, res) => {
    Plan.findById(req.params.id)
        .then(plan => res.json(plan))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Plan.findByIdAndDelete(req.params.id)
        .then(plan => res.json("Deleted Plan: "+ plan.id))
        .catch(err => res.status(400).json('Error: ' + err))
});

router.route('/update/:id').post((req, res) => {
    Plan.findById(req.params.id)
        .then(plan => {
            plan.table = req.body;

            plan.save()
                .then(() => res.json(`Week [${plan.id}] updated!`))
                .catch(err => res.status(400).json('Error: '+err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;