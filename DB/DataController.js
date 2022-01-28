const knex = require("./knex");

// knex("name of the table").operation("argument");
function createData(Data,Tname){
    return knex(Tname).insert(Data);
};
async function getWeather(nrRows){
    if(nrRows == "All")
        return knex("Weather").select("*").orderBy("id","desc");

    const maxId = await knex("Weather").select("id");
    return knex("Weather").select("*").where("id",'>',maxId.length - nrRows).orderBy("id","desc");
}
function getLongitudeLatitude(name){
    return knex("Coords").select(['Latitude' ,'Longitude']).where("Name",'=',name).then(result => result[0]);
};
function getCities(){
    return knex("Coords").select("*").orderBy("Name","asc");
}
function selectSpecific(Tname,Rname,Content){
    return knex(Tname).select(Rname).where(Rname,'=',Content);
};

module.exports = {
    createData,
    getWeather,
    getLongitudeLatitude,
    getCities,
    selectSpecific
}