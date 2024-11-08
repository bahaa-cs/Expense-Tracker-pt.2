<?php

include ("connection.php");

$users_id = 1;
$price = 30;
$type= "income";
$date = "2024-01-01";
$notes = "my notes";



$query = $connection->prepare(
    "INSERT INTO transactions (price, type , date, notes,users_id)
VALUES ('$price','$type','$date','$notes', '$users_id')"
);

if ($query) {
    if ($query->execute())
        echo "Inserted successfully";
    else
        echo "Error executing insert query: " . $query->error;
} else
    echo "Error preparing insert query: " . $connect->error;