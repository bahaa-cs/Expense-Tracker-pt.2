<?php

include ("connection.php");

$users_id = $_POST["users_id"];
$id = $_POST["id"];

$query = $connection->prepare("DELETE from transactions WHERE users_id = ? and id = ?");

$query->bind_param("ii",$users_id,$id);

if ($query) {
    if ($query->execute())
        echo "Deleted successfully";
    else
        echo "Error executing delete query: " . $query->error;
} else
    echo "Error preparing delete query: " . $connect->error;

