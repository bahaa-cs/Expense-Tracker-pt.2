<?php

include ("connection.php");

$users_id = 1;
$id = 3;

$query = $connection->prepare("DELETE from transactions WHERE users_id = $users_id and id=$id");

if ($query) {
    if ($query->execute())
        echo "Deleted successfully";
    else
        echo "Error executing query: " . $query->error;
} else
    echo "Error preparing query: " . $connect->error;

