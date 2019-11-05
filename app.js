var mysql = require('mysql');
var express = require('express');
const app = express();

app.use('/', function (req, res, next) {
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

app.get('/', function (req, res) {
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        database: "maps"
    });

    con.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
        con.query("SELECT latitude,longitude,name,meta_desc,country_id FROM objects", function (err, result) {
            if (err) throw err;
            var json={};
            json["latLng"]=result;
            con.query("SELECT * FROM countries", function (err, result) {
                if (err) throw err;
//              json["countries"]=JSON.stringify(result);
                json["countries"]=result;
                res.json(json);
            });
        });
    });
})

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})
