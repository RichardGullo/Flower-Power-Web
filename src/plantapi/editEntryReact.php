<?php

$connection = mysqli_connect('localhost','root','','flower_power');
$payload = array("error" => "", "success" => "");
if(!$connection){
    $payload['error'] = 'Could not connect to database';
    echo json_encode($payload);
    exit();
}

$id = $_POST['id'];
$nickname = $_POST['nickname'];
$species = $_POST['species'];
$acquiredDate = $_POST['acquiredDate'];
$expiredDate = $_POST['expireDate'];
$class = $_POST['class'];
$image = $_POST['image'];

$notes = $_POST['notes'];
$water = $_POST['water'];


if(!isset($_FILES['file'])){
    $query = "UPDATE plants SET date_acquired='$acquiredDate', nickname='$nickname', classification='$class',notes='$notes', species='$species', water='$water',expire_date='$expiredDate' WHERE id='$id'";

    $result = mysqli_query($connection, $query);

    if(!$result){
        $payload['error'] = mysqli_error($connection);
        echo json_encode($payload);
        exit();
    }

    $payload['success'] = 'image has been uploaded';
}
else{
    $fileName = $_FILES['file']['name'];
    $tmpName = $_FILES['file']['tmp_name'];

    $img_ex = pathinfo($fileName, PATHINFO_EXTENSION);
    $img_ex_lc = strtolower($img_ex);

    $allowed_exs = array("jpg", "jpeg", "png");

    if(in_array($img_ex_lc, $allowed_exs)){
        $new_img_name = uniqid("IMG-",true).'.'.$img_ex_lc;
        $img_upload_path = 'D:\xampp7.4\htdocs\plantapi\plant-images\\'.$new_img_name;
        move_uploaded_file($tmpName,$img_upload_path);

    // Update entry into database

    $query = "UPDATE plants SET date_acquired='$acquiredDate', nickname='$nickname', classification='$class',image='$new_img_name',notes='$notes', species='$species', water='$water',expire_date='$expiredDate' WHERE id='$id'";

        $result = mysqli_query($connection, $query);

        if(!$result){
            $payload['error'] = mysqli_error($connection);
            echo json_encode($payload);
            exit();
        }

        $payload['success'] = 'image has been uploaded';
        $payload['delete'] = deleteImage($image);
        echo json_encode($payload);
    }
    else{
        $payload['error'] = "We don't accept image with that file extension";
        echo json_encode($payload);
        exit();
    }

}

function deleteImage($img_name){

    $path = 'D:\xampp7.4\htdocs\plantapi\plant-images\\';

    if(!unlink($path.$img_name)){
        return "File Pointer could not be deleted";
    }
    else
        return "File has been deleted";

}



?>