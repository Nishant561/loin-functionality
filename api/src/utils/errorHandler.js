const error = (statusCode , message)=>{
    const error = new Error()
    error.statusCode = statusCode || 500
    error.message = message || "Internal server error."
    
    return error
}

module.exports = error