<?php

$connection = mysqli_connect('localhost','root','','flower_power');

if($connection){
    // echo "We are connected to the database";
}
else{
    echo("Database connection failed");
}


$email = $_POST['email'];

$query = "SELECT * FROM users WHERE email = '".$email."'";

$result = mysqli_query($connection,$query);

if(!$result){
    die('Query failed');
}
else
{
    $row = mysqli_fetch_assoc($result);

    $id = $row["id"];

    $query = "SELECT * FROM plants WHERE user_id = '$id'";
    $result = mysqli_query($connection,$query);

    if(!$result){
        die('Query failed');
    }
    else
    {
        $rows = array();
        while($r = mysqli_fetch_assoc($result)) {
            $rows[] = $r;
        }

        echo json_encode($rows);

        // $string = JSONParse($result);
        // echo $string;

        // echo '{"classification":'.'[{"name":"Algae"}]}';
    }

}





?>