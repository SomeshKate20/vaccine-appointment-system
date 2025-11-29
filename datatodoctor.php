<?php
$conn = new mysqli("localhost", "root", "", "vaccine_db");

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
