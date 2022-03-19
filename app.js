const express = require('express')
const ExpressError = require('./expressError')
const itemApiRoutes = require('./api-item-routes')

const app = express()

app.use(express.json())

app.use('/items', itemApiRoutes)

// 404 handler
app.use(function(req, res) {
    return new ExpressError("Not Found", 404);
  });


  
  // generic error handler
  app.use(function(err, req, res, next) {
    // the default status is 500 Internal Server Error
    
    let status = err.status || 500;
  
    // set the status and alert the user
    return res.status(status).json({
      error: {
        message: err.message,
        status: status

      }
    });
  });


  module.exports = app