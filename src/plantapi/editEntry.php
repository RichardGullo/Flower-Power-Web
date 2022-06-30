<?php

$connection = mysqli_connect('localhost','root','','flower_power');

if($connection){
    // echo "We are connected to the database";
}
else{
    echo("Database connection failed");
}

$id = $_POST['id'];
$nickname = $_POST['nickname'];
$species = $_POST['species'];
$acquiredDate = $_POST['acquiredDate'];
$expiredDate = $_POST['expireDate'];
$class = $_POST['class'];
$image = $_POST['image'];
$imgUri = $_POST['imageUri'];
$imgBase64 = $_POST['imageBase64'];
$notes = $_POST['notes'];
$water = $_POST['water'];


// $query = "UPDATE contacts SET first_name="."'".$firstName."',"."last_name="."'".$lastName."',"."contactEmail="."'".$contactEmail."',"."address="."'".$address."',"."phone="."'".$phone."'"."WHERE id="."'".$id."'";

$image_name = generateImageName($imgUri);

if(!($imgUri == "null"))
    $query = "UPDATE plants SET date_acquired='$acquiredDate', nickname='$nickname', classification='$class',image='$image_name',notes='$notes', species='$species', water='$water',expire_date='$expiredDate' WHERE id='$id'";
else
    $query = "UPDATE plants SET date_acquired='$acquiredDate', nickname='$nickname', classification='$class',notes='$notes', species='$species', water='$water',expire_date='$expiredDate' WHERE id='$id'";

$result = mysqli_query($connection,$query);

if(!$result){
    die('Query failed');
}
else{

    if(!($imgUri == "null")){
        deleteImage($image);
        generateImage($imgBase64,$image_name);
    }
}

function generateImageName($imgUri)
{
    $ext = strrpos($imgUri, ".");
    $ext = substr($imgUri,$ext);

    $image_name = uniqid("IMG-",true);
    $full_image_name = $image_name.$ext;

    return $full_image_name;
}

function generateImage($imgBase64, $img_name)
{

    $data = base64_decode($imgBase64);
    $path = 'D:\xampp7.4\htdocs\plantapi\plant-images\\';
    file_put_contents($path.$img_name, $data);

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