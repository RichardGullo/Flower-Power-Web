<?php

$connection = mysqli_connect('localhost','root','','flower_power');
$payload = array("error" => "", "success" => "");
if(!$connection){
    $payload['error'] = 'Could not connect to database';
    echo json_encode($payload);
    exit();
}

$nickname = $_POST['nickname'];
$species = $_POST['species'];
$acquiredDate = $_POST['acquiredDate'];
$expiredDate = $_POST['expireDate'];
$class = $_POST['class'];
$notes = $_POST['notes'];
$water = $_POST['water'];
$email = $_POST['email'];

$query = "SELECT * FROM users WHERE email = '".$email."'";


$result = mysqli_query($connection,$query);

if(!$result){
    $payload['error'] = 'Query to table failed';
    echo json_encode($payload);
    exit();
}
else{

    if(!isset($_FILES['file'])){
        $payload['error'] = 'No file uploaded';
        echo json_encode($payload);
        exit();
    }

    $row = mysqli_fetch_assoc($result);

    $id = $row["id"];

    $fileName = $_FILES['file']['name'];
    $tmpName = $_FILES['file']['tmp_name'];

    $img_ex = pathinfo($fileName, PATHINFO_EXTENSION);
    $img_ex_lc = strtolower($img_ex);

    $allowed_exs = array("jpg", "jpeg", "png");

    if(in_array($img_ex_lc, $allowed_exs)){
        $new_img_name = uniqid("IMG-",true).'.'.$img_ex_lc;
        $img_upload_path = 'D:\xampp7.4\htdocs\plantapi\plant-images\\'.$new_img_name;
        move_uploaded_file($tmpName,$img_upload_path);

        // Insert into database

        $query = "INSERT INTO plants (nickname, species, date_acquired, classification, image, notes, water, expire_date, user_id) 
VALUES ('$nickname', '$species', '$acquiredDate', '$class','$new_img_name','$notes', $water, '$expiredDate',$id)";

        $result = mysqli_query($connection, $query);

        if(!$result){
            $payload['error'] = mysqli_error($connection);
            echo json_encode($payload);
            exit();
        }

        $payload['success'] = 'image has been uploaded';
        echo json_encode($payload);
    }
    else{
        $payload['error'] = "We don't accept image with that file extension";
        echo json_encode($payload);
        exit();
    }
    

}

?>