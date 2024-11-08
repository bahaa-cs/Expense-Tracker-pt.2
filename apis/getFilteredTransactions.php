<?php

include("connection.php");


$json = file_get_contents('php://input');
$data = json_decode($json, true);
$users_id = $data["users_id"];
$minPrice = $data["minPrice"];
$maxPrice = $data["maxPrice"];
$type = $data["type"];
$date = $data["date"];
$notes = $data["notes"];

$query_script="SELECT * FROM transactions WHERE users_id = $users_id";

if ($minPrice !== null) {
    $query_script .= " AND price >= $minPrice";

}
if ($maxPrice !== null) {
    $query_script .= " AND price <= $maxPrice";
}
if ($type !== null) {
    $query_script .= " AND type = $type";
}
if ($date !== null) {
    $query_script .= " AND date = $date";
}
if ($notes !== null) {
    $query_script .= " AND notes LIKE '%$notes%'";
}


$query = $connection->prepare($query_script);

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