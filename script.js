// =======================
// ADMIN LOGIN DETAILS
// =======================
const adminEmail = "admin@adue.com";
const adminPassword = "12345678";

// =======================
// LOGIN SYSTEM
// =======================
document.getElementById('loginForm')?.addEventListener('submit', function(e) {
    e.preventDefault();

    const userId = document.getElementById('userId').value;
    const password = document.getElementById('password').value;

    let teachers = JSON.parse(localStorage.getItem('teachers')) || [];
    let students = JSON.parse(localStorage.getItem('students')) || [];

    // ADMIN LOGIN
    if (userId === adminEmail && password === adminPassword) {
        localStorage.setItem('isAdminLoggedIn', true);
        window.location.href = "admin_dashboard.html";
        return;
    }

    // TEACHER LOGIN
    let teacher = teachers.find(t => t.teacherID === userId && t.password === password);
    if (teacher) {
        localStorage.setItem('loggedInTeacher', JSON.stringify(teacher));
        window.location.href = "teacher_dashboard.html";
        return;
    }

    // STUDENT LOGIN
    let student = students.find(s => s.studentID === userId && s.password === password);
    if (student) {
        localStorage.setItem('loggedInStudent', JSON.stringify(student));
        window.location.href = "student_dashboard.html";
        return;
    }

    alert("Invalid login details");
});
