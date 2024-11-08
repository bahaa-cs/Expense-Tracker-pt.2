<?php

include ("connection.php");

$json = file_get_contents('php://input');
$data = json_decode($json, true);

$price = $data['price'];
$type = $data['type'];
$date = $data['date'];
$notes = $data['notes'];
$users_id = $data['users_id'];



$query = $connection->prepare(
    "INSERT INTO transactions (price, type , date, notes, users_id)
VALUES ('$price','$type','$date','$notes', '$users_id')"
);

if ($query) {
    if ($query->execute())
        echo "Inserted successfully";
    else
        echo "Error executing insert query: " . $query->error;
} else
    echo "Error preparing insert query: " . $connect->error;