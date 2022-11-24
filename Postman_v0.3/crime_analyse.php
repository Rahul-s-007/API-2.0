<?php
// error_reporting(E_ALL);
$file='./crime_incidents.json';

$json = file_get_contents($file);
// echo 'json'.$json;
// die;
$json_data = json_decode($json, true);
// print_r($json_data);
$crime_data=array();
$crime_types=array();
foreach($json_data as $key => $value)
{
    $category=$value['category'];
    // print_r($value);
    array_push($crime_types,$category);
}
$crime_data=array_fill_keys($crime_types,0);
foreach($json_data as $key => $value)
{
    $category=$value['category'];
    $crime_data[$category]++;
}
arsort($crime_data);
// print_r($crime_data);
$myjson = fopen("./crime_report.json", "w") or die("Unable to open file!");
fwrite($myjson,json_encode($crime_data));
fclose($myjson);
header('Location:'.base_url().'/Postman_v0.3/heatMap.html');

//returns base url of the server
function base_url(){
    if(isset($_SERVER['HTTPS'])){
        $protocol = ($_SERVER['HTTPS'] && $_SERVER['HTTPS'] != "off") ? "https" : "http";
    }
    else{
        $protocol = 'http';
    }
    return $protocol . "://" . $_SERVER['HTTP_HOST'];
}
?>