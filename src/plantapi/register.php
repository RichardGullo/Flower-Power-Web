<?php

$connection = mysqli_connect('localhost','root','','flower_power');

if(!$connection){
    echo "Connection has failed";
    return;
}

$username = $_POST['username'];
$password = $_POST['password'];
$email = $_POST['email'];

$payload = array("error" => "", "success" => "");

$query = "SELECT * FROM users WHERE email='$email'";

$result = mysqli_query($connection,$query);

if(!$result){
    $payload['error'] = "Query failed";
    $payload = json_encode($payload);
    die('');
}
else{
    
    if(mysqli_num_rows($result) > 0){
        $payload["error"] = "Email has already been used.";
    }
    else{

        $query = "INSERT INTO users(username,pass,email)
        VALUES('$username','$password','$email')";

        $result = mysqli_query($connection,$query);

        if(!$result){
            $payload['error'] = "Database error";
        }
    }
        

    $payload = json_encode($payload);

    echo $payload;
}




?>



