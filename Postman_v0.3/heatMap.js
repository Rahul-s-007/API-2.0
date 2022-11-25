getLoc();

async function getLoc()
{
    const response = await fetch('./birm.json');
    const data = await response.json();
    
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

var map, pointArray, heatMap;
var latLong = [];

function addCoordinates()
{
    for(var i = 0;i<latitude.length;i++)
    {
        latLong[i] = new google.maps.LatLng(latitude[i],longitude[i]);
    }
}
addCoordinates();

initialize()
function initialize(){
    var mapOptions = {
        zoom:6,
        center: new google.maps.LatLng(53.4808, -2.2426),
        mapTypeId: google.maps.MapTypeId.MAP
    };

    map = new google.maps.Map(document.getElementById('map'),mapOptions);

    var pointArray = new google.maps.MVCArray(latLong);

    heatMap = new google.maps.visualization.HeatmapLayer({
        data:pointArray
    });
    heatMap.setMap(map);
    console.log(latLong[0])
}
google.maps.event.addDomListener(window,'load',initialize);
}