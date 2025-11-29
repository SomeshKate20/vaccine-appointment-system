<?php
session_start();
if (!isset($_SESSION['doctor_id'])) {
    header('Location: login.html');
    exit;
}

$doctor_id = $_SESSION['doctor_id'];
$doctor_name = $_SESSION['doctor_name'];

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "hospital_db";
$port = 3307;

$conn = new mysqli($servername, $username, $password, $dbname, $port);
if ($conn->connect_error) {
    die("Database connection failed: " . $conn->connect_error);
}
$conn->set_charset("utf8mb4");

$sql = "SELECT a.patient_name, a.patient_age, a.patient_gender, a.patient_phone, a.patient_disease, v.vaccine_name, v.manufacturer, v.hospital_add, a.date_time
        FROM appointments a
        JOIN vaccines v ON a.vaccine_id = v.id
        WHERE a.doctor_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $doctor_id);
$stmt->execute();
$result = $stmt->get_result();
$appointments = $result->fetch_all(MYSQLI_ASSOC);

$stmt->close();
$conn->close();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Doctor Dashboard - Appointments</title>
    <meta name="description" content="Doctor appointment management dashboard">
    <meta name="keywords" content="doctor, appointments, dashboard, healthcare">
    <meta property="og:title" content="Doctor Dashboard">
    <meta property="og:description" content="Modern appointment management for healthcare professionals">
    <meta name="twitter:title" content="Doctor Dashboard">
    <meta name="twitter:description" content="Modern appointment management for healthcare professionals">

    <script src="https://resource.trickle.so/vendor_lib/unpkg/react@18/umd/react.production.min.js"></script>
    <script src="https://resource.trickle.so/vendor_lib/unpkg/react-dom@18/umd/react-dom.production.min.js"></script>
    <script src="https://resource.trickle.so/vendor_lib/unpkg/@babel/standalone/babel.min.js"></script>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://resource.trickle.so/vendor_lib/unpkg/lucide-static@0.516.0/font/lucide.css" rel="stylesheet">

    <style type="text/tailwindcss">
    @layer theme {
        :root {
            --primary-color: #165d75;
            --secondary-color: #2e6476;
            --accent-color: #4dd0e1;
            --bg-light: #f0f7f9;
        }
    }

    @layer base {
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            background: linear-gradient(135deg, var(--bg-light) 0%, #e0f2f7 100%);
        }
    }

    @layer components {
        .stat-card {
            @apply bg-white rounded-xl p-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105;
        }

        .appointment-card {
            @apply bg-white rounded-lg p-6 shadow-md transition-all duration-300 hover:shadow-xl border-l-4;
        }
    }
    </style>
    <script>
        window.doctorData = {
            name: "<?= htmlspecialchars($doctor_name) ?>",
            appointments: <?= json_encode($appointments) ?>
        };
    </script>
</head>
<body>
    <div id="root"></div>
    <script type="text/babel" src="app.js"></script>
</body>
</html>