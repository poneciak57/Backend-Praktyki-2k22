const express = require("express");
const app = express();
const bodyParser = require('body-parser');

const db = require("./DB/DataController");
const Wf = require("./WeatherForecast/WeatherForecast");

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
const job2 = schedule.scheduleJob('*/2 * * * *', async function(){
    const select = await db.allCoords();
    select.forEach(async e => {
        Wf.forecast(async function(Data){
            await db.updateCity(e.Name,Data);
        },
        e.Latitude,
        e.Longitude);
    });
});

//adding city with coordinates to database ( this enable weather check for new city )
app.post("/AddCoords",async (req,res)=>{
    const checkForExisting = await db.selectSpecific("Coords","Name",req.body.Name);
    if(checkForExisting.length == 0)
    {
        const Data = await db.createData(req.body,"Coords");
        Wf.forecast(async function(Data){
            await db.updateCity(req.body.Name,Data);
        },
        req.body.Latitude,
        req.body.Longitude);
        res.status(201).send("Pomyślnie dodano nowe miasto");
    }else
    {
        res.status(202).send("Byczq takie miasto juz mamy");
    }
});

//return current temperature in warsaw
app.get("/CurrentTemp",async (req,res)=>{
    const Data = await db.getCurrentWeather("Warszawa");
    res.status(200).json({Data});
});
//return current temperature in city with given name (if in database)
app.get("/CurrentTemp/:name",async (req,res)=>{
    const Data = await db.getCurrentWeather(req.params.name);
    res.status(200).json({Data});
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