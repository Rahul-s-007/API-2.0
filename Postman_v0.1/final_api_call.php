<?php
$location=$_POST['location'];
// $location='manchester';
//pass location to osm api to retrive bounding box of the city
$location=$location.' United Kingdom';//add united kingdom to ensure results are from united kingdom only
$location=trim(strtolower($location));
$location=str_replace(' ','+',$location);
//api call
$api_url='https://nominatim.openstreetmap.org/search.php?q='.$location.'&format=jsonv2';
$curl = curl_init();
curl_setopt_array($curl, array(
  CURLOPT_URL => $api_url,
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => '',
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 0,
  CURLOPT_FOLLOWLOCATION => true,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => 'GET',
));
curl_setopt($curl, CURLOPT_USERAGENT, $_SERVER['HTTP_USER_AGENT']);
$map_response = curl_exec($curl);//json response from api
curl_close($curl);

$map_response_decode=json_decode($map_response,true);//deocde json response into associative array
if(sizeof($map_response_decode)==0)
{
  echo 'Error in osm api call';
  die;
}

$data=$map_response_decode[0]['boundingbox'];//store bounding box of first location returned by osm api
$call_ctr=0;
// $data=array('51.2867601','51.6918741','-0.5103751','0.3340155');//bounding box for london
// $data=array("52.381053","52.6087058","-2.0336486","-1.7288417");//bounding box for birmingham
sort($data,1);

$coordinates=array(
    0 => array('lat'=>$data[2],'lon'=>$data[0]),
    1 => array('lat'=>$data[3],'lon'=>$data[0]),
    2 => array('lat'=>$data[3],'lon'=>$data[1]),
    3 => array('lat'=>$data[2],'lon'=>$data[1])
);
$json_file = fopen('test/crime_incidents.json','w') or die('unable to write into file');
fwrite($json_file,'[');
fclose($json_file);

half_points($coordinates);

$json_file = fopen('test/crime_incidents.json','a') or die('unable to write into file');
fseek($json_file, 0);
$stat = fstat($json_file);
ftruncate($json_file, $stat['size']-1);
fclose($json_file);
$json_file2 = fopen('test/crime_incidents.json','a') or die('unable to write into file');
fwrite($json_file2,']');
fclose($json_file2);

//redirect to display page after crime incidents are generated
$base_url="http://localhost:8080/Postman_v0.1/";
header('Location:'.$base_url.'test/heatMap.html');
function half_points($coordinates)//takes a bounding box and divides it into 4 smaller boxes
{
    sort($coordinates,1);
    //find mid points of lat long between each pair of coordinates
    $lon_half_left=strval(((double)$coordinates[0]['lon']+(double)$coordinates[1]['lon'])/2);
    $lat_half_left=strval(((double)$coordinates[0]['lat']+(double)$coordinates[1]['lat'])/2);
    $lat_half_top=strval(((double)$coordinates[1]['lat']+(double)$coordinates[2]['lat'])/2);
    $lon_half_top=strval(((double)$coordinates[1]['lon']+(double)$coordinates[2]['lon'])/2);
    $lat_half_right=strval(((double)$coordinates[2]['lat']+(double)$coordinates[3]['lat'])/2);
    $lon_half_right=strval(((double)$coordinates[2]['lon']+(double)$coordinates[3]['lon'])/2);
    $lat_half_bottom=strval(((double)$coordinates[3]['lat']+(double)$coordinates[0]['lat'])/2);
    $lon_half_bottom=strval(((double)$coordinates[3]['lon']+(double)$coordinates[0]['lon'])/2);

    $lon_centre=$lon_half_top;
    $lat_centre=$lat_half_left;
    //dividing box into 4 smaller boxes
    $sub_box_1=array(
        0 => array('lon'=>$lon_half_left,'lat'=>$lat_half_left),
        1 => array('lon'=>$coordinates[1]['lon'],'lat'=>$coordinates[1]['lat']),
        2 => array('lon'=>$lon_half_top,'lat'=>$lat_half_top),
        3 => array('lon'=>$lon_centre,'lat'=>$lat_centre),
        4 => array('lon'=>$lon_half_left,'lat'=>$lat_half_left)
    );
    $sub_box_2=array(
        0 => array('lon'=>$lon_centre,'lat'=>$lat_centre),
        1 => array('lon'=>$lon_half_top,'lat'=>$lat_half_top),
        2 => array('lon'=>$coordinates[2]['lon'],'lat'=>$coordinates[2]['lat']),
        3 => array('lon'=>$lon_half_right,'lat'=>$lat_half_right),
        4 => array('lon'=>$lon_centre,'lat'=>$lat_centre),
    );
    $sub_box_3=array(
        0 => array('lon'=>$lon_half_bottom,'lat'=>$lat_half_bottom),
        1 => array('lon'=>$lon_centre,'lat'=>$lat_centre),
        2 => array('lon'=>$lon_half_right,'lat'=>$lat_half_right),
        3 => array('lon'=>$coordinates[3]['lon'],'lat'=>$coordinates[3]['lat']),
        4 => array('lon'=>$lon_half_bottom,'lat'=>$lat_half_bottom)
    );
    $sub_box_4=array(
        0 => array('lon'=>$coordinates[0]['lon'],'lat'=>$coordinates[0]['lat']),
        1 => array('lon'=>$lon_half_left,'lat'=>$lat_half_left),
        2 => array('lon'=>$lon_centre,'lat'=>$lat_centre),
        3 => array('lon'=>$lon_half_bottom,'lat'=>$lat_half_bottom),
        4 => array('lon'=>$coordinates[0]['lon'],'lat'=>$coordinates[0]['lat'])
    );
    //pass each of the boxes to the crime api
    //if crime api does not return a value(happens if bounding box is too big) then this function is called
    //recursively and the sub box will further get divided unitl the crime api reutrn incidents
    if(!api_call($sub_box_1))
    {
        half_points($sub_box_1);
    }
    if(!api_call($sub_box_2))
    {
        half_points($sub_box_2);
    }
    if(!api_call($sub_box_3))
    {
        half_points($sub_box_3);
    }
    if(!api_call($sub_box_4))
    {
        half_points($sub_box_4);
    }
}

function api_call(&$box)
{
    //takes a bounding box a input and returns crime incidents within that bounding box
    //if bounding box is too large, api will return 503 error and return value will be empty
    //api takes polygon input as [lat],[long]:[lat],[long]:[lat],[long]...
    $poly=$box[0]['lat'].','.$box[0]['lon'].':'.$box[1]['lat'].','.$box[1]['lon'].':'.$box[2]['lat'].','.$box[2]['lon'].':'.$box[3]['lat'].','.$box[3]['lon'].':'.$box[4]['lat'].','.$box[4]['lon'];
    //api call
    $curl = curl_init();
    curl_setopt_array($curl, array(
    CURLOPT_URL => 'https://data.police.uk/api/crimes-street/all-crime?poly='.$poly.'=&date=2022-01',
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => '',
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 0,
    CURLOPT_FOLLOWLOCATION => true,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => 'POST',
    ));
    curl_setopt($curl, CURLOPT_USERAGENT, $_SERVER['HTTP_USER_AGENT']);
    $crime_response = curl_exec($curl);

    curl_close($curl);
    //server returns empty value or error message then api called failed, return false to half_points function
    if(empty($crime_response))
        return false;
    else if($crime_response=='<h1>Server Error (500)</h1>')
        return false;

    //sanitise returned json data and write to file
    $crime_response=ltrim($crime_response,'[');
    $crime_response=rtrim($crime_response,']');
    $crime_response=$crime_response.',';

    //write crime incidents to json file
    // $json_file = fopen('test/crime_incidents_'.$GLOBALS['ctr'].'.json','w') or die('unable to write into file'); //write in separate file for each api call
    $json_file = fopen('test/crime_incidents.json','a') or die('unable to write into file'); //write all incidents from each api call in one file
    fwrite($json_file,$crime_response);
    echo('successfully written into file');
    echo "<br>";
    $GLOBALS['ctr']++;
    fclose($json_file);
    return true;
}
?>
