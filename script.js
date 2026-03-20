const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const studentId = document.getElementById('studentId').value.trim();
    const password = document.getElementById('password').value.trim();

    const testAccounts = [
        { id: 'student1', password: '1234' },
        { id: 'staff1', password: 'abcd' }
    ];

    const matched = testAccounts.find(acc => acc.id === studentId && acc.password === password);

    if (matched) {
        alert('Login successful! Welcome ' + studentId);
        window.location.href = 'student_dashboard.html';
    } else {
        alert('Invalid Student/Staff ID or password');
    }
});
