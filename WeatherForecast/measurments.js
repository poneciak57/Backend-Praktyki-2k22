const db = require("../DB/DataController");
const Wf = require("./WeatherForecast");
const Coords = require("./Coords");

function getCurrentDate()
{
    let date_ob = new Date();
    let day = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

    let date = date_ob.getFullYear()+ "-" + month+"-"+day+ " "+date_ob.getHours() + ":"+date_ob.getMinutes();
    return date;
}

function createMeasurment()
{
    Wf.forecast(async function(Temperature){
        Temperature.Date = getCurrentDate(); 
        await db.createData(Temperature,"Weather");
        console.log("Created New Measurment");
    },
    Coords.latitude,
    Coords.longitude)
}

module.exports = {
    createMeasurment
}


