<?php
session_start();
$host='localhost'; $port=3307; $db='hospital_db'; $user='root'; $pass='';
$pdo = new PDO("mysql:host=$host;port=$port;dbname=$db",$user,$pass);
$pdo->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);

if($_SERVER['REQUEST_METHOD']==='POST'){
    $email=$_POST['email'];
    $password=$_POST['password'];

    $stmt=$pdo->prepare("SELECT * FROM doctors WHERE email=?");
    $stmt->execute([$email]);
    $doctor=$stmt->fetch(PDO::FETCH_ASSOC);

    if($doctor && password_verify($password,$doctor['password_hash'])){
        $_SESSION['doctor_id']=$doctor['id'];
        $_SESSION['doctor_name']=$doctor['name'];
        header("Location: dashboard.php");
        exit;
    } else {
        $_SESSION['login_error']="Invalid email or password.";
        header("Location: login.html");
        exit;
    }
}
?>
