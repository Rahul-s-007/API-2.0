
import data from './crime_incidents.json' assert{type:'json'};
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

// console.log(latitude.length);
// console.log(longitude);


var map, pointArray, heatMap;
var latLong = [
    // new google.maps.LatLng(53.477505,-2.226581),
    // new google.maps.LatLng(53.477505,-2.226581),
    // new google.maps.LatLng(53.477505,-2.226581),
    // new google.maps.LatLng(53.523266,-2.170886),
    // new google.maps.LatLng(53.477505,-2.226581),
    // new google.maps.LatLng(53.477505,-2.226581),
    // new google.maps.LatLng(53.477505,-2.226581),
    // new google.maps.LatLng(53.477505,-2.226581),
    // new google.maps.LatLng(53.488817,-2.241712),
    // new google.maps.LatLng(53.475249,-2.240059),
    // new google.maps.LatLng(53.477505,-2.226581),
    // new google.maps.LatLng(53.477505,-2.226581),
    // new google.maps.LatLng(53.477505,-2.226581),
    // new google.maps.LatLng(53.477505,-2.226581),
];

function addCoordinates()
{
    for(var i = 0;i<latitude.length;i++)
    {
        latLong[i] = new google.maps.LatLng(latitude[i],longitude[i]);
    }
    // latLong[0] = new google.maps.LatLng(latitude[0],longitude[0]);
    // latLong[0] = new google.maps.LatLng(53.477505,-2.226581);

    
}
addCoordinates();
console.log(latLong[0]);

function initialize(){
    var mapOptions = {
        zoom:12,
        center: new google.maps.LatLng(53.3811, -1.4701),
        mapTypeId: google.maps.MapTypeId.MAP
    };

    map = new google.maps.Map(document.getElementById('map'),mapOptions);

    var pointArray = new google.maps.MVCArray(latLong);

    heatMap = new google.maps.visualization.HeatmapLayer({
        data:pointArray
    });
    heatMap.setMap(map);
}
google.maps.event.addDomListener(window,'load',initialize);
