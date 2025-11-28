<?php
header('Content-Type: application/json');

$host='localhost';
$port=3307;
$db='hospital_db';
$user='root';
$pass='';

try {
    $pdo = new PDO("mysql:host=$host;port=$port;dbname=$db", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    date_default_timezone_set('Asia/Kolkata'); // set timezone once at the top

    $data = json_decode(file_get_contents('php://input'), true);

    //  Validate required fields
    $required = ['patient_name','patient_age','patient_gender','patient_phone','vaccine_name','doctor'];
    foreach ($required as $field) {
        if (empty($data[$field])) {
            echo json_encode(['success' => false, 'message' => "Missing required field: $field"]);
            exit;
        }
    }

    //  Get vaccine_id from vaccine_name
    $stmt = $pdo->prepare("SELECT id FROM vaccines WHERE vaccine_name = ?");
    $stmt->execute([$data['vaccine_name']]);
    $vaccine = $stmt->fetch(PDO::FETCH_ASSOC);
    if (!$vaccine) {
        echo json_encode(['success' => false, 'message' => 'Vaccine not found']);
        exit;
    }
    $vaccine_id = $vaccine['id'];

    //  Get doctor_id from doctor name
    $stmt = $pdo->prepare("SELECT id FROM doctors WHERE name = ?");
    $stmt->execute([$data['doctor']]);
    $doctor = $stmt->fetch(PDO::FETCH_ASSOC);
    if (!$doctor) {
        echo json_encode(['success' => false, 'message' => 'Doctor not found']);
        exit;
    }
    $doctor_id = $doctor['id'];

    // Use current date/time if none provided
    $date_time = !empty($data['date_time']) ? $data['date_time'] : date('Y-m-d H:i:s');

    // Insert appointment
    $stmt = $pdo->prepare("INSERT INTO appointments (patient_name, patient_age, patient_gender, patient_phone, patient_disease, vaccine_id, doctor_id)
    VALUES (?, ?, ?, ?, ?, ?, ?)");
        $stmt->execute([
            $data['patient_name'],
            $data['patient_age'],
            $data['patient_gender'],
            $data['patient_phone'],
            $data['patient_disease'] ?? null,
            $vaccine_id,
            $doctor_id
        ]);


    echo json_encode(['success' => true, 'inserted_datetime' => $date_time]);

} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
?>
