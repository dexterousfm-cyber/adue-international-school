// Dummy data for testing
if (!localStorage.getItem("users")) {
    const users = [
        {role: "admin", email: "admin@adue.com", password: "admin123"},
        {role: "teacher", email: "teacher@adue.com", password: "teacher123"},
        {role: "student", email: "student@adue.com", password: "student123"}
    ];
    localStorage.setItem("users", JSON.stringify(users));
}

const loginForm = document.getElementById("loginForm");

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
