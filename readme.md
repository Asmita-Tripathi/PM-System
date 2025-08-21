# Preventive Maintenance System

A *web-based application* designed to streamline *preventive maintenance management* for IT infrastructure and equipment.  
The system enables organizations to *add, schedule, track, and analyze* equipment maintenance tasks, improving efficiency and reducing downtime.  

---

## 📌 Overview

This project was developed as an *internship project* with the goal of creating a *simple but practical preventive maintenance tracking system*.  
It provides basic CRUD operations, feedback collection, and reporting features with a clean separation of frontend, backend, and database.  

---

## ✨ Core Features

-  *User Authentication* – basic login with username/password validation  
-  *Add Equipment* – register new equipment with details (ID, asset code, department, location, etc.)  
-  *View & Manage Equipment* – interactive table populated from backend data  
-  *Feedback Collection* – capture user feedback and store it in the database  
-  *PDF Export* – generate equipment reports using jsPDF & AutoTable  
-  *REST API* – frontend communicates with backend over JSON-based APIs  

---

## 🧰 Tech Stack

| Layer      | Technology |
|------------|------------|
| *Frontend* | HTML, CSS, JavaScript (Fetch API, DOM) |
| *Backend*  | Node.js, Express.js |
| *Database* | MySQL (via XAMPP, managed in phpMyAdmin) |
| *Tools*    | XAMPP (Apache + MySQL), jsPDF, AutoTable |

---

## 🗂 Project Structure

```text
preventive-maintenance-system/
│
├── frontend/         # Client-side files
│   ├── index.html
│   ├── login.html
│   ├── add-equipment.html
│   ├── view-equipment.html
│   ├── schedule.html
│   ├── history.html
│   ├── feedback.html
│   ├── css/
│   │   └── style.css
│   └── script.js
│
├── backend/          # Server-side logic
│   ├── server.js
│   └── package.json
│
├── database/         # SQL schema & seed data
│   └── maintenance_form.sql
│
└── README.md 