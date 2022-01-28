const request = require('request'); 
const API_KEY = '31205224be5780b275da435258517fba'; 
function forecast(callback,latitude, longitude ) { 
    var url = `http://api.openweathermap.org/data/2.5/weather?`
                +`lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
    request({ url: url, json: true }, function (error, response) { 
        if (error) { 
            console.log('Unable to connect to Forecast API'); 
        } 
        const record = '{"Temp":1,"Feels_like":1,"MaxTemp":1,"MinTemp":1,"Pressure":1,"Humidity":1}';
        const obj = JSON.parse(record);
        obj.Temp = Math.round((response.body.main.temp - 273.15)*100)/100;
        obj.Feels_like = Math.round((response.body.main.feels_like - 273.15)*100)/100;
        obj.MaxTemp = Math.round((response.body.main.temp_max - 273.15)*100)/100;
        obj.MinTemp = Math.round((response.body.main.temp_min - 273.15)*100)/100;
        obj.Pressure = response.body.main.pressure;
        obj.Humidity = response.body.main.humidity;
        return callback(obj);
    });
    } 
module.exports ={
    forecast
}