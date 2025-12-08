<?php

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "hospital_db";
$port = 3307;

$conn = new mysqli($servername, $username, $password, $dbname, $port);
if ($conn->connect_error) {
    die(json_encode(["error" => "DB connection failed."]));
}

$result = $conn->query("SELECT patient_name, patient_age,patient_gender,patient_phone,patient_disease,vaccine_name,doctor,date_time FROM appointments ");

$appointments = [];
while ($row = $result->fetch_assoc()) {
    $appointments[] = $row;
}

echo json_encode($appointments);

$conn->close();
?>
