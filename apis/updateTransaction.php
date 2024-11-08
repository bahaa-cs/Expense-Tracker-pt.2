<?php

include("connection.php");

$json = file_get_contents('php://input');
$data = json_decode($json, true);

$id = $data['id'];
$price = $data['price'];
$type = $data['type'];
$date = $data['date'];
$notes = $data['notes'];
$users_id = $data['users_id'];

$query = $connection->prepare("UPDATE transactions
                                SET price = '$price', type='$type' , date='$date' , notes = '$notes' , users_id = $users_id
                                WHERE id='$id'");

if($query){

    if($query->execute())
        echo "Updated Successfully!";
    else
        echo "Error executing update query: ".$query.error;

}
else
echo "Error preparing update query: ".$query->error ;