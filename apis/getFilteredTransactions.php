<?php

include("connection.php");

$users_id = $_POST["users_id"] ?? null;
$minPrice = $_POST["minPrice"] ?? null;
$maxPrice = $_POST["maxPrice"] ?? null;
$type = $_POST["type"] ?? null;
$date = $_POST["date"] ?? null;
$notes = $_POST["notes"] ?? null;

$query_script = "SELECT * FROM transactions WHERE users_id = ?";
$params = [$users_id];
$types = "i";

if ($minPrice !== null) {
    $query_script .= " AND price >= ?";
    $params[] = $minPrice;
    $types .= "i";
}

if ($maxPrice !== null) {
    $query_script .= " AND price <= ?";
    $params[] = $maxPrice;
    $types .= "i";
}

if ($type !== null) {
    $query_script .= " AND type = ?";
    $params[] = $type;
    $types .= "s";
}

if ($date !== null) {
    $query_script .= " AND date = ?";
    $params[] = $date;
    $types .= "s";
}

if ($notes !== null) {
    $query_script .= " AND notes LIKE ?";
    $params[] = "%$notes%";
    $types .= "s";
}

$query = $connection->prepare($query_script);
$query->bind_param($types, ...$params);

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
