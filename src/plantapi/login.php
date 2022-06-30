<?php

$connection = mysqli_connect('localhost','root','','flower_power');

if(!$connection){
    echo("Database connection failed");
    die('Could not connect to database');
}

$username = $_POST['username'];
$password = $_POST['password'];
$payload = array("error" => "", "success" => "");

$query = "SELECT * FROM users WHERE username='$username' AND pass='$password'";

$result = mysqli_query($connection,$query);

if(!$result){
    $payload['error'] = "Connection failed";
    echo json_encode($payload);
    die('');
}
else{

    if(mysqli_num_rows($result) < 1)
        $payload['error'] = "Username or password is incorrect.";
    else
        $payload['data'] = parseResult($result);
    
    echo json_encode($payload);
}

function parseResult($result){
    $rows = array();

    while($entry = mysqli_fetch_assoc($result)){
        $rows[] = $entry;
    }

    return $rows;
}

?>



