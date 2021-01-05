const { match } = require('assert');
const fs = require('fs');
const { Query } = require('mongoose');
const Tour = require('../Model/tourModel');
const APIFeatures = require('../utils/apiFeatures');
const appError = require('../utils/appError');
const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));
const catchAsync = require('../utils/catchAsync');


exports.getAlltours = catchAsync(async (req, res, next) => {

    const features = new APIFeatures (Tour.find(), req.query)
            .filter()
            .sort()
            .limitFields()
            .paginate();
    const tours = await features.query;

    res.status(200).json({
        message : 'success',
        result : tours.length,
        data : {
            tours
            }
        }); 
    
});

exports.getTour = catchAsync(async (req, res, next) => {
   
    const tour = await Tour.findById(req.params.id)
    //const tour = await Tour.find({_id: req.params.id})
    //adding 404
    if(!tour) {
        return next(new appError('No tour found with that ID', 404));
    }
    res.status(200).json({
        status : 'success',
        data : {
            tour
        }
    })
    
});

exports.createTour = catchAsync(async (req, res, next) => {

    const newTour = await Tour.create(req.body);

    res.status(201).json({
        message : 'success',
        data : {
            tours : newTour
        }
    });

});


exports.updateTour = catchAsync(async (req, res, next) => {

    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators:true
    });

    //adding 404
    if(!tour) {
        return next(new appError('No tour found with that ID', 404));
    }

    res.status(200).json({
        status : 'success',
        data : {
            tour
        }
    })
    
});


exports.deleteTour = catchAsync(async (req, res) => {

    const tour = await Tour.findByIdAndDelete(req.params.id);

    //adding 404
    if(!tour) {
        return next(new appError('No tour found with that ID', 404));
    }

        res.status(204).json({
            status : 'succes',
            data : null
        })

});