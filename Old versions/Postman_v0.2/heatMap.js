import data from './birm.json' assert{type:'json'};
import stats from './crime_report.json' assert{type:'json'};

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
}
google.maps.event.addDomListener(window,'load',initialize);

var nums = document.getElementById("list");
var listItem = nums.getElementsByTagName("li");


document.getElementById("Violent crime").innerHTML = stats['violent-crime'];
document.getElementById("Public order").innerHTML = stats['public-order'];
document.getElementById("Anti-social behaviour").innerHTML = stats['anti-social-behaviour'];
document.getElementById("Criminal damage arson").innerHTML = stats['criminal-damage-arson'];
document.getElementById("other-theft").innerHTML = stats['other-theft'];
document.getElementById("Vehicle crime").innerHTML = stats['vehicle-crime'];
document.getElementById("Shoplifting").innerHTML = stats['shoplifting'];
document.getElementById("Robbery").innerHTML = stats['robbery'];
document.getElementById("Drugs").innerHTML = stats['drugs'];
document.getElementById("other-crime").innerHTML = stats['other-crime'];

document.getElementById("cityName").innerHTML = "London";

