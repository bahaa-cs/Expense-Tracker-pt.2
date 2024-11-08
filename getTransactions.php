<?php

include ("connection.php");

$id = $_GET["id"] ?? null;
if($id != null){
    $query = $connection->prepare("SELECT * FROM transactions WHERE users_id = $id");
    $query->execute();

    $result = $query->get_result();

    if($result->num_rows > 0){
        $transactions_array = [];
        while($resultObject = $result->fetch_assoc()){
            $transactions_array[] = $resultObject;
        }

        echo json_encode($transactions_array);
    }

}