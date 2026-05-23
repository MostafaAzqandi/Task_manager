function errorHandler(error, req, res, next){
    console.log(error);
    
    res.status(500).json({
        error: error.message || "Server Error"
    });
}


export default errorHandler;