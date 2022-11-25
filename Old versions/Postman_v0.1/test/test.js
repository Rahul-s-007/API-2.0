import data from './shefield_Incidents.json' assert{type:'json'};
// console.log(data);

let latitude = [];
let longitude = [];

latitude = data.map((lat) =>
{
    return lat.location.latitude;
});

longitude = data.map((long) =>
{
    return long.location.longitude;
});

console.log(latitude);
console.log(longitude);

var latLong = 
[

];