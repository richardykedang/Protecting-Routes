const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');
dotenv.config({ path:'./config.env'});
//const Tour = require('./Model/tourModel');
const os = require('os');
const osType = os.type();

console.log(osType);



const DB = process.env.DATABASE.replace('<PASSWORD>',process.env.DATABASE_PASSWORD);
mongoose.connect(DB,{
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => console.log("DB connection successful!"));

//Create new document collection
// const Testtour = new Tour({
//     name: "The Forest Hiker",
//     rating: 4.7,
//     price: 497
// });

// Testtour
//     .save()
//     .then(doc => console.log(doc))
//     .catch(err => console.log("ERROR : ", err))

//server    
const PORT = process.env.PORT||3000;
app.listen(3000, ()=>{
    console.log(`App running on port : ${PORT}`)
})
