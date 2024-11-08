<?php

include("connection.php");

$id = 5;
$price = 50;
$type= "expense";

$query = $connection->prepare("UPDATE transactions
                                SET price = '$price', type='$type'
                                WHERE id='$id'");

if($query){

    if($query->execute())
        echo "Updated Successfully!";
    else
        echo "Error executing update query: ".$query.error;

}
else
echo "Error preparing update query: ".$query->error ;