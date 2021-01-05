const catchAsync = require('../utils/catchAsync');
const User = require('../Model/userModel');


exports.getAllUser = catchAsync(async (req, res, next) => {
    
    const users = await User.find();

    res.status(200).json({
        message : 'success',
        result : users.length,
        data : {
            users
            }
        }); 
    
});

exports.getUser = catchAsync(async (req, res, next) => {
   
    
    
});

exports.createUser = catchAsync(async (req, res, next) => {

    

});


exports.updateUser = catchAsync(async (req, res, next) => {

    
    
});


exports.deleteUser = catchAsync(async (req, res) => {

    

});