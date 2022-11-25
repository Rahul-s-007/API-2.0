fetch("city_name.json")
.then(cn => cn.json())
.then(cnData => work2(cnData));

function work2(cnData)
{
    document.getElementById("cityName").innerHTML = cnData['city_name'];
}
