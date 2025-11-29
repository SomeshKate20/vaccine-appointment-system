CREATE DATABASE IF NOT EXISTS hospital_db;
USE hospital_db;

-- Doctors table
CREATE TABLE doctors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    department VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    age INT NOT NULL,
    phone VARCHAR(15) NOT NULL,
    gender VARCHAR(10) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Vaccines table
CREATE TABLE vaccines (
    id INT AUTO_INCREMENT PRIMARY KEY,
    vaccine_name VARCHAR(100) NOT NULL,
    disease VARCHAR(255),
    manufacturer VARCHAR(255),
    hospital_add VARCHAR(255),
    available INT DEFAULT 0,
    doctor_id INT,
    FOREIGN KEY (doctor_id) REFERENCES doctors(id) ON DELETE SET NULL
);

-- Appointments table
CREATE TABLE appointments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    patient_name VARCHAR(100) NOT NULL,
    patient_age INT NOT NULL,
    patient_gender VARCHAR(10) NOT NULL,
    patient_phone VARCHAR(15) NOT NULL,
    patient_disease VARCHAR(255),
    vaccine_name VARCHAR(100) NOT NULL,
    doctor_name VARCHAR(100) NOT NULL,
    hospital_add VARCHAR(255) NOT NULL,
    date_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
     FOREIGN KEY (doctor_id) REFERENCES doctors(id) ,
    FOREIGN KEY (vaccine_id) REFERENCES vaccines(id)

);
