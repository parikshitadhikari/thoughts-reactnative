// custom error handler, it'll be an json object that has an error message
// if in dev mode, then stack trace as well

const notFound=(req, res, next)=>{ // for error that occurs when we go to a random url
    const error = new Error(`Not found ${req.originalUrl}`)
    res.status(404)
    next(error)
}
// custom error middleware
const errorHandler = (err, req, res, next)=>{
    // it we are throwing the error and still the status is 200, change it
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode
    let message = err.message; // get the message from err (1st arg)

    // mongoose has smthg called casterror so also check for that
    // and also if we try to get user with the Id that doesnt exist, then throw an error
    if (err.name === 'CastError' && err.kind === "ObjectId") {
        statusCode = 404
        message = "Resource not found"
    }
    res.status(statusCode).json({
        message, // message: message
        stack: process.env.NODE_ENV="production"? null:err.stack // stack trace
    })
}

export { notFound, errorHandler} // these are to be added as middleware in index.js