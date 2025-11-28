<?php
header('Content-Type: application/json');
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "hospital_db";
$port = 3307;

$conn = new mysqli($servername, $username, $password, $dbname, $port);
if ($conn->connect_error) {
    echo json_encode(["error" => "Database connection failed"]);
    exit;
}

$query = isset($_GET['query']) ? trim($_GET['query']) : '';
$searchParam = $query . '%';

//  Join vaccines with doctors to get doctor name
$stmt = $conn->prepare("
    SELECT v.id, v.vaccine_name, v.disease, v.manufacturer, v.hospital_add, v.available, d.name AS doctor_name
    FROM vaccines v
    LEFT JOIN doctors d ON v.doctor_id = d.id
    WHERE v.vaccine_name LIKE ?
");
$stmt->bind_param("s", $searchParam);
$stmt->execute();
$result = $stmt->get_result();

$data = [];
while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}

echo json_encode($data);
$stmt->close();
$conn->close();
?>
