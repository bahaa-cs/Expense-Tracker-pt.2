<?php

include("connection.php");

$users_id = $_POST["users_id"];

if ($users_id !== null) {
    $query = $connection->prepare("SELECT * FROM transactions WHERE users_id = ?");
    $query->bind_param("s", $users_id);
    $query->execute();
    
    $result = $query->get_result();

    if ($result->num_rows > 0) {
        $transactions_array = [];
        while ($resultObject = $result->fetch_assoc()) {
            $transactions_array[] = $resultObject;
        }

        echo json_encode($transactions_array);
    } else {
        echo json_encode([]);
    }
} else {
    echo json_encode(
        ["error" => "Missing user ID"]
    );
}