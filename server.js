const express = require("express");
const app = express();
const bodyParser = require('body-parser');

const serveStatic = require('serve-static')
const path = require('path')

const db = require("./DB/DataController");
const Wf = require("./WeatherForecast/WeatherForecast");
const Coords = require("./WeatherForecast/Coords");
const Measurment = require("./WeatherForecast/measurments");
const schedule = require('node-schedule');
const cors = require('cors');

// Function call
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors());

const job = schedule.scheduleJob('30 * * * *', function(){
    Measurment.createMeasurment();
  });

//here we are configuring dist to serve app files
app.use('/', serveStatic(path.join(__dirname, '/dist')))

// this * route is to serve project on different page routes except root `/`
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, "/dist/index.html"));
});

//adding city with coordinates to database ( this enable weather check for new city )
app.post("/AddCoords",async (req,res)=>{
    const checkForExisting = await db.selectSpecific("Coords","Name",req.body.Name);
    if(checkForExisting.length == 0)
    {
        const Data = await db.createData(req.body,"Coords");
        res.status(201).send("Pomyślnie dodano nowe miasto");
    }else
    {
        res.status(202).send("Byczq takie miasto juz mamy");
    }
});

//return current temperature on given coords
app.get("/WeatherFromCoords",async (req,res)=>{
    Wf.forecast(function(Temperature){
        res.status(200).json({Temperature})
    },
    req.body.latitude,
    req.body.longitude)
});

//return current temperature in warsaw
app.get("/CurrentTemp",async (req,res)=>{
    Wf.forecast(function(Temperature){
        res.status(200).json({Temperature});
    },
    Coords.latitude,
    Coords.longitude)
});
//return current temperature in city with given name (if in database)
app.get("/CurrentTemp/:name",async (req,res)=>{
    const Data = await db.getLongitudeLatitude(req.params.name);
    Wf.forecast(function(Temperature){
        res.status(200).json({Temperature});
    },
    Data.Latitude,Data.Longitude)
});
//return all cities from database
app.get("/Cities",async (req,res)=>{
    const Data = await db.getCities();
    res.status(200).json({Data});
})

//return given number of measurments
app.get("/Measurments/:nr",async (req ,res)=>{
    const Measurments = await db.getWeather(req.params.nr);
    res.status(200).json({Measurments});
})


const port = process.env.PORT || 8080;
app.listen(port,()=> console.log('server is running on port '+port,));