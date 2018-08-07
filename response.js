 
module.exports = {
    errorResponse: function(err,res) {
        res.status(err.status || 500);
        res.end(JSON.stringify({
            message: err.message,
            error: err,
            status: 0
          }));
    },
    successResponse: function(message,res,data) {
        res.status(200);
        res.end(JSON.stringify({
            message: message,
            data: data,
            status: 1
          }));
    }
}