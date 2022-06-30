<?php

$connection = mysqli_connect('localhost','root','','flower_power');

if(!$connection){
    echo("Database connection failed");
}

$id = $_POST['id'];
$expiredDate = $_POST['expireDate'];


$userEmail = "chi6692@aol.com";


// $query = "UPDATE contacts SET first_name="."'".$firstName."',"."last_name="."'".$lastName."',"."contactEmail="."'".$contactEmail."',"."address="."'".$address."',"."phone="."'".$phone."'"."WHERE id="."'".$id."'";

$query = "UPDATE plants SET expire_date='$expiredDate' WHERE id='$id'";

$result = mysqli_query($connection,$query);

if(!$result){
    die('Query failed');
}


?>