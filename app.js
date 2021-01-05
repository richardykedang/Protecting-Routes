const { json } = require('express');
const express = require('express');
const morgan = require('morgan');
const { get } = require('./router/tourRoute');
const appError = require('./utils/appError');
const globalErrorHandler = require('./Controller/errorController');

const tourRouter = require('./router/tourRoute');
const userRouter = require('./router/userRouter');

const app = express();

//1.MIDDLEWARES
app.use(morgan('dev'))
app.use(express.json());

//3 ROUTES
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

//console.log(tours)
//Handling unhandled routes
app.all('*', (req, res, next) => {
     next(new appError (`cant find ${req.originalUrl} on this server`, 404))
});

app.use(globalErrorHandler);

//4. SERVER

module.exports = app;