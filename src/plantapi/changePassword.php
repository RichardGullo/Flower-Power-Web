<?php

$connection = mysqli_connect('localhost','root','','flower_power');

if(!$connection){
    echo "Connection has failed";
    return;
}

$oldPass = $_POST['oldPass'];
$newPass = $_POST['newPass'];
$email = $_POST['email'];

$payload = array("error" => "", "success" => "");


$query = "SELECT * FROM users WHERE email='$email' AND pass='$oldPass'";

$result = mysqli_query($connection,$query);

if(!$result){
    die('Query failed');
}
else{

    if(mysqli_num_rows($result) == 0){
        $payload["error"] = "Invalid Password";
    }
    else{
        $query = "UPDATE users SET pass='$newPass' WHERE email='$email'";
        $result = mysqli_query($connection,$query);
    
        if(!$result){
            die('Query failed');
        }
        else{
            $payload["success"] = "Password has been changed";
        }
    }

    $payload = json_encode($payload);

    echo $payload;



}


?>