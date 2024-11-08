<?php

include ("connection.php");

$json = file_get_contents('php://input');
$data = json_decode($json, true);

$id = $data['id'];
// $id = $_GET["id"] ?? null;

if($id != null){
    $query = $connection->prepare("SELECT * FROM transactions WHERE id = $id");
    $query->execute();

    $result = $query->get_result();

    if($result->num_rows > 0){
        $resultObject = $result->fetch_assoc();

        $json_result = json_encode($resultObject );
        echo $json_result;
    }

}
