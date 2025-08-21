document.addEventListener("DOMContentLoaded", function () {
    console.log("NTPC Preventive Maintenance System Loaded.");

    highlightCurrentNavLink();
    handleLoginForm();
    handleEquipmentForm(); // now connects to backend
    handleFeedbackForm();
    validateLoginForm();
    validateEquipmentForm();
    loadEquipmentTable(); // loads from backend
});

// Highlight current navigation link
function highlightCurrentNavLink() {
    const currentPage = window.location.pathname.split("/").pop();
    const navLinks = document.querySelectorAll("nav ul li a");

    navLinks.forEach(link => {
        if (link.getAttribute("href") === currentPage) {
            link.classList.add("active");
        }
    });
}

// Simulated Login
function handleLoginForm() {
    const loginForm = document.querySelector("form");
    if (!loginForm) return;

    const heading = document.querySelector("h2")?.textContent || "";
    if (!heading.includes("Login")) return;

    loginForm.addEventListener("submit", async function (e) {
        e.preventDefault();

        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();

        if (!username || !password) {
            alert("Please enter both username and password.");
            return;
        }

        try {
            const response = await fetch("http://localhost:3000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username, password })
            });

            const msg = await response.text();

            if (response.ok) {
                alert("✅ Login successful!");
                // Optional: Save login status to localStorage
                localStorage.setItem("isLoggedIn", "true");
                window.location.href = "index.html";
            } else {
                alert(msg); // shows 'Invalid username or password'
            }
        } catch (error) {
            console.error("❌ Login error:", error);
            alert("❌ Server error. Try again later.");
        }
    });
}


// ✅ Backend-connected Add Equipment form submission
function handleEquipmentForm() {
    const equipmentForm = document.querySelector("form");
    if (!equipmentForm) return;

    const heading = document.querySelector("h2")?.textContent || "";
    if (!heading.includes("Add Equipment")) return;

    equipmentForm.addEventListener("submit", async function (e) {
        e.preventDefault();

        const formData = {
            equipment_name: document.getElementById("equipment-name").value,
            equipment_number: document.getElementById("equipment-number").value,
            asset_code: document.getElementById("asset-code").value,
            location: document.getElementById("location").value,
            department: document.getElementById("department").value,
            remarks: document.getElementById("remarks").value,
            username: document.getElementById("username").value,
            bmc_staff_name: document.getElementById("bmc-staff-name").value,
            date: document.getElementById("date").value
        };

        try {
            const response = await fetch("http://localhost:3000/submit-form", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            const result = await response.text();
            alert(result);
            equipmentForm.reset();
        } catch (error) {
            console.error("❌ Error submitting form:", error);
            alert("❌ Error submitting equipment. Try again.");
        }
    });
}

// ✅ Load equipment data from backend into table
function loadEquipmentTable() {
    const tableBody = document.querySelector("#equipmentTable tbody");
    if (!tableBody) return;

    fetch("http://localhost:3000/get-equipment")
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to fetch equipment data");
            }
            return response.json();
        })
        .then(equipmentList => {
            tableBody.innerHTML = "";
            equipmentList.forEach(equipment => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${equipment.equipment_name}</td>
                    <td>${equipment.asset_code}</td>
                    <td>${equipment.location}</td>
                    <td>${equipment.department}</td>
                    <td>Active</td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => {
            console.error("❌ Error loading data:", error);
            alert("❌ Could not load equipment from server.");
        });
}

// Feedback
function handleFeedbackForm() {
    const feedbackForm = document.getElementById("feedbackForm");
    const responseMsg = document.getElementById("responseMsg");
    if (!feedbackForm) return;

    feedbackForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const feedback = document.getElementById("feedback").value.trim();

        if (!name || !email || !feedback) {
            responseMsg.textContent = "All fields are required!";
            responseMsg.style.color = "red";
            return;
        }

        const emailPattern = /^[^@]+@[^@]+\.[^@]+$/;
        if (!emailPattern.test(email)) {
            responseMsg.textContent = "Please enter a valid email.";
            responseMsg.style.color = "red";
            return;
        }

        console.log("Feedback submitted:", { name, email, feedback });
        responseMsg.textContent = "Thank you for your feedback!";
        responseMsg.style.color = "green";
        feedbackForm.reset();
    });
}

// ✅ Search function for equipment table
function searchTable() {
    const input = document.getElementById("searchInput");
    const filter = input.value.toUpperCase();
    const table = document.getElementById("equipmentTable");
    const trs = table.getElementsByTagName("tr");

    for (let i = 1; i < trs.length; i++) {
        const td = trs[i].getElementsByTagName("td")[0];
        if (td) {
            const txtValue = td.textContent || td.innerText;
            trs[i].style.display = txtValue.toUpperCase().indexOf(filter) > -1 ? "" : "none";
        }
    }
}

// Validation
function validateLoginForm() {
    const loginForm = document.querySelector('form');
    const heading = document.querySelector('h2')?.textContent || "";
    if (!loginForm || !heading.includes("Login")) return;

    loginForm.addEventListener('submit', function (e) {
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();

        if (!username || !password) {
            alert("Please enter both username and password.");
            e.preventDefault();
        }
    });
}

function validateEquipmentForm() {
    const addForm = document.querySelector('form');
    const heading = document.querySelector('h2')?.textContent || "";

    if (!addForm || !heading.includes("Add Equipment")) return;

    addForm.addEventListener('submit', function (event) {
        const requiredFields = [
            'equipment-name',
            'equipment-number',
            'asset-code',
            'location',
            'department',
            'username',
            'bmc-staff-name',
            'date'
        ];

        let formIsValid = true;

        requiredFields.forEach(id => {
            const input = document.getElementById(id);
            if (!input.value.trim()) {
                input.style.border = "2px solid red";
                formIsValid = false;
            } else {
                input.style.border = "";
            }
        });

        if (!formIsValid) {
            alert("Please fill out all required fields.");
            event.preventDefault();
        }
    });
} 
