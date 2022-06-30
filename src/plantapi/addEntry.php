<?php

$connection = mysqli_connect('localhost','root','','flower_power');

if($connection){
    // echo "We are connected to the database";
}
else{
    echo("Database connection failed");
}

$nickname = $_POST['nickname'];
$species = $_POST['species'];
$acquiredDate = $_POST['acquiredDate'];
$expiredDate = $_POST['expireDate'];
$class = $_POST['class'];
$imgUri = $_POST['imageUri'];
$imgBase64 = $_POST['imageBase64'];
$notes = $_POST['notes'];
$water = $_POST['water'];

$email = $_POST['email'];

$query = "SELECT * FROM users WHERE email = '".$email."'";


$result = mysqli_query($connection,$query);

if(!$result){
    die('Query failed');
}
else{

    $row = mysqli_fetch_assoc($result);

    $id = $row["id"];

    $image_name = generateImageName($imgUri);
    
	
	$query = "INSERT INTO plants (nickname, species, date_acquired, classification, image, notes, water, expire_date, user_id) 
VALUES ('$nickname', '$species', '$acquiredDate', '$class','$image_name','$notes', $water, '$expiredDate',$id)";

    $result = mysqli_query($connection,$query);

    if(!$result){
        die('Query failed');
    }
    else{
        echo $result;
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



?>