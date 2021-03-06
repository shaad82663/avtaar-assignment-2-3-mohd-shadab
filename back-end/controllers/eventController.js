const mongoose = require('mongoose');
const Event = require('../models/event');

//Error Handler for catching async errors separately.
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
  
//Query 4 : Insert into Events table          POST => /api/v1/event/new  
exports.newEvent =  catchAsyncErrors (async (req, res, next) => {  
    const event = await Event.create(req.body);

    res.status(200).json({
        success : true,
        event
    })
})

//Query 7 : To get the all the events for given uid    GET => /api/v1/events
exports.getEvents = catchAsyncErrors (async (req, res, next) => {
    const events = await Event.find({});
    
    let eventsForUid = events.filter(function(event) {
        return (event.uid).equals(req.body.uid);
    });
     res.status(200).json({
         success : true,
         count : eventsForUid.length,
         eventsForUid
     })
})


//Query 5 : to get all events for today  GET =>/api/v1/events/today
exports.getTodaysEvents = catchAsyncErrors (async (req, res, next) => {
    var start = new Date();
    start.setHours(0,0,0,0);

    var end = new Date();
    end.setHours(23,59,59,999);

    const events = await Event.find({
        startDate : {$gte: start, $lt: end}
    })   

    res.status(200).json({
        success : true,
        count : events.length,
        events
    })
})


// Query 8 : To get all the events for the next 7 days.  => /api/v1//events/week
exports.getWeekEvents = catchAsyncErrors (async (req, res, next) => {
    var start = new Date();
    start.setHours(0,0,0,0);

    var end = new Date();
    end.setDate(end.getDate() + 7);
    end.setHours(23,59,59,999);

    const events = await Event.find({
        startDate : {$gte: start, $lt: end}
    })   

    res.status(200).json({
        success : true,
        count : events.length,
        events
    })
})

