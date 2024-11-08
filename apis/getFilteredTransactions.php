<?php

include("connection.php")


$json = file_get_contents('php://input');
$data = json_decode($json, true);

$users_id = $data["users_id"];


$query = $connection->prepare("SELECT * FROM transactions WHERE users_id = $users_id");





$query->execute();

$result = $query->get_result();


if($result->num_rows > 0){
    $transactions_array = [];
    while($resultObject = $result->fetch_assoc()){
        $transactions_array[] = $resultObject;
    }

    $json_result = json_encode($transactions_array);
    echo $json_result;
}