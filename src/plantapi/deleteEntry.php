<?php

$connection = mysqli_connect('localhost','root','','flower_power');

if($connection){
    // echo "We are connected to the database";
}
else{
    echo("Database connection failed");
}

$id = $_POST['id'];
$img_name = $_POST['image'];

$query = "DELETE FROM plants WHERE id='$id'";

$result = mysqli_query($connection,$query);

if(!$result){
    die('Query failed');
}
else
{
    deleteImage($img_name);
}


function deleteImage($img_name){

    $path = 'D:\xampp7.4\htdocs\plantapi\plant-images\\';

    if(!unlink($path.$img_name)){
        echo "File Pointer could not be deleted";
    }
    else
        echo "File has been deleted";

}


?>