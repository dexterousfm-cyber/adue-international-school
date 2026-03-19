// ====== LOGIN FUNCTIONALITY ======
const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", function(e) {
        e.preventDefault();

        const role = document.getElementById("role").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        const users = JSON.parse(localStorage.getItem("users")) || [];
        const user = users.find(u => u.role === role && u.email === email && u.password === password);

        if (user) {
            alert(`Login successful as ${role}`);
            // Redirect to dashboard based on role
            if (role === "admin") window.location.href = "admin_dashboard.html";
            if (role === "teacher") window.location.href = "teacher_dashboard.html";
            if (role === "student") window.location.href = "student_dashboard.html";
        } else {
            alert("Invalid login credentials");
        }
    });
}

// ====== TEACHER REGISTRATION FUNCTIONALITY ======
const teacherRegisterForm = document.getElementById("teacherRegisterForm");

if (teacherRegisterForm) {
    teacherRegisterForm.addEventListener("submit", function(e) {
        e.preventDefault();

        const fullname = document.getElementById("fullname").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const subjects = document.getElementById("subjects").value.split(",").map(s => s.trim());

        let users = JSON.parse(localStorage.getItem("users")) || [];

        // Check if email already exists
        if (users.some(u => u.email === email)) {
            alert("Email already registered!");
            return;
        }

        const newTeacher = {
            role: "teacher",
            fullname,
            email,
            password,
            subjects,
            students: [] // Empty array to hold students assigned later
        };

        users.push(newTeacher);
        localStorage.setItem("users", JSON.stringify(users));

        alert("Teacher registered successfully!");
        window.location.href = "index.html"; // Redirect to login
    });
}

// ====== DUMMY USERS FOR TESTING ======
if (!localStorage.getItem("users")) {
    const users = [
        {role: "admin", email: "admin@adue.com", password: "admin123"},
        {role: "teacher", email: "teacher@adue.com", password: "teacher123"},
        {role: "student", email: "student@adue.com", password: "student123"}
    ];
    localStorage.setItem("users", JSON.stringify(users));
}
// ====== ADMIN DASHBOARD ======
const addAdminForm = document.getElementById("addAdminForm");
const teachersTable = document.getElementById("teachersTable")?.querySelector("tbody");
const studentsTable = document.getElementById("studentsTable")?.querySelector("tbody");
const logoutBtn = document.getElementById("logoutBtn");

// Logout button
if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
        window.location.href = "index.html";
    });
}

// Add new admin
if (addAdminForm) {
    addAdminForm.addEventListener("submit", function(e) {
        e.preventDefault();

        const fullname = document.getElementById("adminName").value;
        const email = document.getElementById("adminEmail").value;
        const password = document.getElementById("adminPassword").value;

        let users = JSON.parse(localStorage.getItem("users")) || [];

        if (users.some(u => u.email === email)) {
            alert("Email already registered!");
            return;
        }

        const newAdmin = { role: "admin", fullname, email, password };
        users.push(newAdmin);
        localStorage.setItem("users", JSON.stringify(users));

        alert("Admin added successfully!");
        addAdminForm.reset();
        renderTeachersAndStudents();
    });
}

// Display all teachers and students
function renderTeachersAndStudents() {
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Teachers
    let teachers = users.filter(u => u.role === "teacher");
    teachersTable.innerHTML = teachers.length ? teachers.map(t => `
        <tr>
            <td>${t.fullname}</td>
            <td>${t.email}</td>
            <td>${t.subjects.join(", ")}</td>
        </tr>
    `).join('') : '<tr><td colspan="3">No teachers yet</td></tr>';

    // Students
    let students = users.filter(u => u.role === "student");
    studentsTable.innerHTML = students.length ? students.map(s => `
        <tr>
            <td>${s.fullname}</td>
            <td>${s.email}</td>
            <td>${s.class || ''}</td>
        </tr>
    `).join('') : '<tr><td colspan="3">No students yet</td></tr>';
}

// Initial render
renderTeachersAndStudents();
