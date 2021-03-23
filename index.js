const express = require("express");
const app = express();
const bodyParser = require('body-parser')
require('dotenv').config()
const sequelize = require('./src/config/db.config')
const port = process.env.port || 3000;

/**
 * Db connection
 */
sequelize
.authenticate()
.then(() => {
  console.log('Connection has been established successfully.');
})
.catch(err => {
  console.error('Unable to connect to the database:', err);
});
if (process.env.ENV === 'development') {
  sequelize.sync({force: false}); //deletes all tables then recreates them
}


app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

/**
 * routes
 */
const userRoute = require('./src/routes/user.model');
const empRoute = require('./src/routes/employee.model');
app.use('/user', userRoute);
app.use('/emp', empRoute);
app.get("/", (req,res) => {
  res.send("working!!")
})

app.listen(port, (err, connect) => {
  if (err) {
    console.log("err");
  } else {
    console.log("server connected at " + `${port}` + " port");
  }
});