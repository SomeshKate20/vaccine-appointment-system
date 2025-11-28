<?php
session_start();
$host='localhost'; $port=3307; $db='hospital_db'; $user='root'; $pass='';

try {
    $pdo = new PDO("mysql:host=$host;port=$port;dbname=$db",$user,$pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);

    if($_SERVER['REQUEST_METHOD'] === 'POST'){
        $name = $_POST['name'];
        $department = $_POST['department'];
        $email = $_POST['email'];
        $age = $_POST['age'];
        $phone = $_POST['phone'];
        $gender = $_POST['gender'];
        $password = password_hash($_POST['password'], PASSWORD_DEFAULT);

        // Vaccine info
        $vaccine_name = $_POST['vaccine_name'];
        $disease      = $_POST['disease'] ?? null;
        $manufacturer = $_POST['manufacturer'];
        $hospital_add = $_POST['hospital_add'];
        $available    = $_POST['available'];

        // Insert doctor
        $stmt = $pdo->prepare("INSERT INTO doctors (name, department, email, age, phone, gender, password_hash) 
                               VALUES (?, ?, ?, ?, ?, ?, ?)");
        $stmt->execute([$name, $department, $email, $age, $phone, $gender, $password]);
        $doctor_id = $pdo->lastInsertId();

        // Insert vaccine
        $stmt2 = $pdo->prepare("INSERT INTO vaccines (vaccine_name, disease, manufacturer, hospital_add, available, doctor_id) 
                                VALUES (?, ?, ?, ?, ?, ?)");
        $stmt2->execute([$vaccine_name, $disease, $manufacturer, $hospital_add, $available, $doctor_id]);

        echo "✅ Doctor and vaccine registered successfully!";
        header("Location: login.html");
        exit;
    }
} catch(PDOException $e){
    echo "❌ Database error: ".$e->getMessage();
}
?>
