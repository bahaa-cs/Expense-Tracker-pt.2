<?php

include ("connection.php");


$id = $_POST['id'];

if($id != null){
    $query = $connection->prepare("SELECT * FROM transactions WHERE id = ?");
    $query->bind_param("i",$id);
    $query->execute();

    $result = $query->get_result();

    if($result->num_rows > 0){
        $resultObject = $result->fetch_assoc();

        $json_result = json_encode($resultObject );
        echo $json_result;
    }

}
