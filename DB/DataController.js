const knex = require("./knex");

// knex("name of the table").operation("argument");
function createData(Data,Tname){
    return knex(Tname).insert(Data);
};
async function getWeather(nrRows){
    if(nrRows == "All")
        return knex("Weather").select("*").orderBy("id","desc");

    const maxid = await knex("Weather").select("id");
    return knex("Weather").select("*").where("id",'>',maxid.length - nrRows).orderBy("id","desc");
}
function getCities(){
    return knex("Coords").select("*").orderBy("Name","asc");
}
function selectSpecific(Tname,Rname,Content){
    return knex(Tname).select(Rname).where(Rname,'=',Content);
};

async function updateCity(Cname,Data){
    const count = await knex("Coords")
    .update(Data)
    .where('Name','=',Cname);
};
function allCoords(){
    return knex("Coords").select("*");
}

function getCurrentWeather(Cname){
    return knex("Coords").select("*").where("Name",'=',Cname);
}
module.exports = {
    createData,
    getWeather,
    getCities,
    selectSpecific,
    updateCity,
    allCoords,
    getCurrentWeather
}