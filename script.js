// ---------------- INITIAL LOAD ----------------

// Load arrays from localStorage or initialize empty
let admins = JSON.parse(localStorage.getItem('admins')) || [
    { email: "admin@adue.com", password: "12345678", name: "Admin", profilePicture: "admin.png" }
];
let teachers = JSON.parse(localStorage.getItem('teachers')) || [];
let students = JSON.parse(localStorage.getItem('students')) || [];

// Save back to localStorage (in case it was empty)
localStorage.setItem('admins', JSON.stringify(admins));
localStorage.setItem('teachers', JSON.stringify(teachers));
localStorage.setItem('students', JSON.stringify(students));


// ---------------- LOGIN ----------------
function login(input, password){
    // Admin login
    for(let i=0;i<admins.length;i++){
        if(admins[i].email === input && admins[i].password === password){
            localStorage.setItem("currentAdminIndex", i);
            window.location.href = "admin_dashboard.html";
            return true;
        }
    }

    // Teacher login
    for(let i=0;i<teachers.length;i++){
        if((teachers[i].email === input || teachers[i].teacherID === input) && teachers[i].password === password){
            localStorage.setItem("currentTeacherIndex", i);
            window.location.href = "teacher_dashboard.html";
            return true;
        }
    }

    // Student login
    for(let i=0;i<students.length;i++){
        if((students[i].email === input || students[i].studentID === input) && students[i].password === password){
            localStorage.setItem("currentStudentIndex", i);
            window.location.href = "student_dashboard.html";
            return true;
        }
    }

    alert("Invalid login details!");
    return false;
}


// ---------------- ADMIN DASHBOARD ----------------
function registerTeacherAdmin(name,email,id,dept,password,pic){
    teachers.push({name,email,teacherID:id,department:dept,password,profilePicture: pic||'teacher.png'});
    localStorage.setItem('teachers', JSON.stringify(teachers));
}

function registerStudentAdmin(name,email,id,studentClass,year,password,pic,teacherID=null){
    students.push({name,email,studentID:id,studentClass,studentYear:year,password,profilePicture: pic||'student.png', teacherID});
    localStorage.setItem('students', JSON.stringify(students));
}

// Show all teachers
function getAllTeachers(){
    return teachers;
}

// Show all students
function getAllStudents(){
    return students;
}

// ---------------- TEACHER DASHBOARD ----------------
function getCurrentTeacher(){
    let idx = localStorage.getItem("currentTeacherIndex");
    if(idx === null) return null;
    return teachers[idx];
}

// Students for this teacher only
function getMyStudents(){
    let teacher = getCurrentTeacher();
    if(!teacher) return [];
    return students.filter(s => s.teacherID === teacher.teacherID);
}

function registerStudentTeacher(name,email,id,studentClass,year,password,pic){
    let teacher = getCurrentTeacher();
    if(!teacher) return;
    students.push({name,email,studentID:id,studentClass,studentYear:year,password,profilePicture: pic||'student.png', teacherID: teacher.teacherID});
    localStorage.setItem('students', JSON.stringify(students));
}

// ---------------- STUDENT DASHBOARD ----------------
function getCurrentStudent(){
    let idx = localStorage.getItem("currentStudentIndex");
    if(idx === null) return null;
    return students[idx];
}

// ---------------- EDIT / DELETE ----------------
function editTeacher(i,newData){
    teachers[i] = {...teachers[i], ...newData};
    localStorage.setItem('teachers', JSON.stringify(teachers));
}

function deleteTeacher(i){
    teachers.splice(i,1);
    localStorage.setItem('teachers', JSON.stringify(teachers));
}

function editStudent(i,newData){
    students[i] = {...students[i], ...newData};
    localStorage.setItem('students', JSON.stringify(students));
}

function deleteStudent(i){
    students.splice(i,1);
    localStorage.setItem('students', JSON.stringify(students));
}

// ---------------- LOGOUT ----------------
function logout(){
    localStorage.removeItem("currentAdminIndex");
    localStorage.removeItem("currentTeacherIndex");
    localStorage.removeItem("currentStudentIndex");
    window.location.href = "index.html";
}
