# 💉 Vaccination Management System

A simple web-based **Vaccination Management System** developed using **PHP, MySQL, HTML, CSS, JavaScript, and Bootstrap**.
The system allows users to **log in**, **add vaccination records**, and **view/search vaccination data** stored in a MySQL database.

---

## 🚀 Features

* 🔐 User Login Authentication
* ➕ Add Vaccination Records
* 📄 View Vaccination Records
* 🔍 Search Vaccines using AJAX
* 🗄️ MySQL Database Integration
* 📦 REST-style JSON API (PHP)
* 💻 Responsive UI using Bootstrap

---

## 🛠️ Tech Stack

| Layer    | Technology                       |
| -------- | -------------------------------- |
| Frontend | HTML, CSS, JavaScript |
| Backend  | PHP                              |
| Database | MySQL                            |
| Server   | Apache (XAMPP / WAMP)            |

---

## 📂 Project Structure

```
VACCINE APPOINTMENT SYSTEM/
│
├── img/                     # Images and assets
│
├── .gitignore               # Git ignore file
├── final.sql                # Database schema and sample data
├── setup.txt                # Setup instructions
│
├── index.html               # Main landing page
├── login.html               # Login page (UI)
├── registration.html        # Doctor registration page
├── user.html                # User dashboard page
│
├── style.css                # Main stylesheet
│
├── app.js                   # Global JS logic
├── index.js                 # Index page JS
├── loadData.js              # Load data from backend (AJAX)
├── saveData.js              # Save data to database (AJAX)
├── user.js                  # User-side JS logic
├── vaccinedetails.js        # Vaccine details handling
│
├── login.php                # Login backend logic
├── register_doctor.php      # Doctor registration backend
├── dashboard.php            # Admin/Doctor dashboard
├── storeappointments.php    # Store appointment records
├── search.php               # Search vaccines/doctors API
│
└── Readme.md                # Project documentation
```


---

## 🗄️ Database Setup

### 1️⃣ Create Database

```sql
CREATE DATABASE IF NOT EXISTS hospital_db;
USE hospital_db;
```sql
CREATE DATABASE hospital_db;
USE hospital_db;
````

### 2️⃣ Tables

```sql
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
```

```sql
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
```

```sql
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
    FOREIGN KEY (doctor_id) REFERENCES doctors(id),
    FOREIGN KEY (vaccine_id) REFERENCES vaccines(id)
);
```

---

## ▶️ How to Run the Project

### Step 1: Install XAMPP

Download and install **XAMPP**.

### Step 2: Start Server

Open XAMPP Control Panel and start:

* Apache
* MySQL

### Step 3: Place Project

Copy the project folder into:

```
C:\xampp\htdocs\
```

### Step 4: Import Database

* Open **phpMyAdmin**
* Create database `hospital_db`
* Run the SQL queries above

### Step 5: Run in Browser

```
http://localhost/vaccination-management-system/
```

---

## 🔌 API Usage Example

```http
GET /fetch_vaccines.php?query=co
```

### Sample Response

```json
[
  {
    "id": "1",
    "vaccine_name": "Covishield",
    "disease": "COVID-19",
    "manufacturer": "Serum Institute",
    "hospital_add": "Pune",
    "available": "150",
    "doctor_name": "Dr. Sharma"
  }
]
```

---

## 🧪 Common Issues

* ❌ JSON.parse error → Check PHP warnings or database connection
* ❌ MySQL port issue → Update `$port` in `db.php`
* ❌ Blank page → Enable error reporting in PHP

---

## 📈 Future Enhancements

* Role-based access (Admin / Doctor / Staff)
* Edit & Delete Vaccination Records
* Vaccine Stock Management
* Charts & Analytics Dashboard
* Email/SMS Notifications

---

## 👨‍💻 Author

**Somesh Kate**
Computer Science Student

---

## ⭐ Support

If you like this project, please ⭐ star the repository on GitHub!
