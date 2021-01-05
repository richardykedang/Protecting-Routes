const jwt = require('jsonwebtoken');
const User = require('../Model/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// const signToken = id => {
//     jwt.sign({id: newUser._id}, process.env.JWT_SECRET, {
//         expiresIn: process.env.JWT_EXPIRES_IN
//     });
// }

exports.signup = catchAsync(async (req,res,next) => {

        const newUser = await User.create(req.body);
        const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN
        })
        res.status(201).json({
            message : 'success',
            token,
            data : {
                user : newUser
            }
        });
    
});

exports.login = catchAsync(async (req,res,next) => {
    const {email, password} = req.body;

    //1 check if email and password exist
    if(!email || !password) {
        return next(new AppError('Please Provide Email and Password', 400));
    }
    //2 if user exist && password is correct
    const user = await User.findOne({email}).select('+password');
    //compare input password from body into bycript password on db
    const correct = await user.correctPassword(password, user.password);

    if(!user || !correct) {
        return next(new AppError('Incorrect Email or Password', 401));
    }
    //3 if everything ok send token to the client
    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })
    res.status(200).json({
        message : 'success',
        token,
        
    });

});

exports.protect = catchAsync(async (req,res,next) => {
    

    //1 getting token and check of it's there
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    if(!token)
    return next(new AppError('You are Not Login, Please Login to get the Access', 401));
    //2 verify token
   
    //3 check if user still exist
    
    //4 check if user changed password

    next();

});
