//Initiallising node modules
var express = require("express");
var bodyParser = require("body-parser");
var sql = require("mssql");
var app = express();

// Setting Base directory
app.use(bodyParser.json());

//CORS Middleware
app.use(function (req, res, next) {
    //Enabling CORS 
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
    next();
});

//Setting up server
 var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
 });

//Initiallising connection string
var config = {
    user: 'Hanif',
    password: 'Narengi646',
    server: 'HANIF-PC2',
    database: 'career'
};

exports.query = async function (value) {
    try {
        let pool = await sql.connect(config)
        let result = await pool.request()
            .input('input_parameter', sql.VarChar(50), value)
            .query(`select top 1 * from dbo.cv where first_name = '${value}'`)

        return result

    } catch (err) {
        console.log(err);
    }
}
