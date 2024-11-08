<?php

include ("connection.php");
$json = file_get_contents('php://input');
$data = json_decode($json, true);

$users_id = 1;
$id = $data["id"];

$query = $connection->prepare("DELETE from transactions WHERE users_id = $users_id and id=$id");

if ($query) {
    if ($query->execute())
        echo "Deleted successfully";
    else
        echo "Error executing delete query: " . $query->error;
} else
    echo "Error preparing delete query: " . $connect->error;

