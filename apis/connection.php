<?php

$host = "localhost";
$dbuser = "root";
$pass = "";
$dbname = "expense-trackerdb";

$connection = new mysqli($host,$dbuser,$pass,$dbname);

if ($connection->connect_error)
    die("Error occured");
else
echo("Successfully connected!");