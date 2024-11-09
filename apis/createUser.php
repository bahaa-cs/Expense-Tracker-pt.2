<?php

include ("connection.php");


$username = $_POST['username'];

if($username != null){
    $query = $connection->prepare("INSERT INTO users (username) VALUES(?)");
    $query->bind_param("s",$username);
    $query->execute();
    }
