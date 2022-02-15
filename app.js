const express = require("express");
const app = express();

app.set('view engine', 'ejs');

const ejs = require("ejs");
const https = require("https");
var path = require('path')
const bodyParser = require("body-parser");
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }))
app.get("/", function(req1, res1) {
    res1.sendFile(__dirname + "/index.html")

})
app.post("/", function(req, res) {


    const query = req.body.city;
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=53a1315990b2f1fd47c4e6ecdf274ac1&units=metric";
    https.get(url, function(response) {
        console.log(response.statusCode);
        response.on("data", function(data) {
            const weather_data = JSON.parse(data);
            const icon = weather_data.weather[0].icon;
            const des = weather_data.weather[0].description;
            const temp = weather_data.main.temp.toPrecision(2);
            let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

            const day = new Date().toLocaleString('en-US', options);

            const imageurl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            console.log(imageurl);
            // res.send("<h1>Temparture is in " + query + " is " + weather_data.main.temp + " Degree Celsius.</h1>" +
            //     "<h2>The weather is curently " + weather_data.weather[0].description + "</h2><img src='" + imageurl + "'>"

            // );
            res.render("weather", { day: day, city: query, image: imageurl, temperature: temp, description: des });
        })
    });

})

app.listen(3000, function() {
    console.log("SERVER STARTED ON 3000");

});