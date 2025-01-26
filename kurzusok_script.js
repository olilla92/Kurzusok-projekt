const apiUrl = "https://vvri.pythonanywhere.com/api/courses";

// Kursusok megjelenítése
function showCourses() {
  document.getElementById('coursesSection').style.display = 'block';
  document.getElementById('studentsSection').style.display = 'none';
  fetchCourses();
}

// Diákok megjelenítése
function showStudents() {
  document.getElementById('coursesSection').style.display = 'none';
  document.getElementById('studentsSection').style.display = 'block';
  fetchStudents();
}

// Kurzusok listázása
function fetchCourses() {
  axios.get(apiUrl)
    .then(response => {
      const courses = response.data;
      const courseList = document.getElementById('courseList');
      courseList.innerHTML = '';

      courses.forEach(course => {
        const courseItem = document.createElement('div');
        courseItem.innerHTML = `
          <p>${course.name}</p>
          <button onclick="editCourse(${course.id})">Szerkesztés</button>
          <button onclick="deleteCourse(${course.id})">Törlés</button>
        `;
        courseList.appendChild(courseItem);
      });
    })
    .catch(error => console.error("Hiba a kurzusok betöltésekor:", error));
}

// Diákok listázása (helyettesítő API, amíg nincs valódi API a diákokra)
function fetchStudents() {
  // Ha létezik API diákokhoz, akkor azt kell itt meghívni
  // Jelenleg csak egy szimulált lista
  const students = [
    { id: 1, name: "Kovács Péter" },
    { id: 2, name: "Nagy Anna" }
  ];

  const studentList = document.getElementById('studentList');
  studentList.innerHTML = '';

  students.forEach(student => {
    const studentItem = document.createElement('div');
    studentItem.innerHTML = `
      <p>${student.name}</p>
      <button onclick="editStudent(${student.id})">Szerkesztés</button>
      <button onclick="deleteStudent(${student.id})">Törlés</button>
    `;
    studentList.appendChild(studentItem);
  });
}

// Kurzus hozzáadása
function createCourse() {
  const courseName = prompt("Adj meg egy kurzus nevet:");
  if (courseName) {
    axios.post(apiUrl, { name: courseName })
      .then(response => {
        alert("Új kurzus létrehozva!");
        fetchCourses();
      })
      .catch(error => console.error("Hiba a kurzus létrehozásakor:", error));
  }
}

// Diák hozzáadása
function createStudent() {
  const studentName = prompt("Adj meg egy diák nevet:");
  if (studentName) {
    // Itt hasonlóan a diák API-hoz kapcsolódva lehetne a diákot létrehozni.
    alert("Új diák létrehozva!");
    fetchStudents();
  }
}

// Kurzus szerkesztése
function editCourse(courseId) {
  const newName = prompt("Adj meg egy új nevet a kurzusnak:");
  if (newName) {
    axios.put(`${apiUrl}/${courseId}`, { name: newName })
      .then(response => {
        alert("Kurzus módosítva!");
        fetchCourses();
      })
      .catch(error => console.error("Hiba a kurzus módosításakor:", error));
  }
}

// Diák szerkesztése
function editStudent(studentId) {
  const newName = prompt("Adj meg egy új nevet a diáknak:");
  if (newName) {
    // Itt is hasonlóan a diák adatokat módosíthatjuk
    alert("Diák módosítva!");
    fetchStudents();
  }
}

// Kurzus törlése
function deleteCourse(courseId) {
  if (confirm("Biztosan törlöd a kurzust?")) {
    axios.delete(`${apiUrl}/${courseId}`)
      .then(response => {
        alert("Kurzus törölve!");
        fetchCourses();
      })
      .catch(error => console.error("Hiba a kurzus törlésénél:", error));
  }
}

// Diák törlése
function deleteStudent(studentId) {
  if (confirm("Biztosan törlöd a diákot?")) {
    // Itt törölnénk a diákot, ha lenne API
    alert("Diák törölve!");
    fetchStudents();
  }
}
