document.getElementById("coursesBtn").addEventListener("click", () => showSection("courses"));
document.getElementById("studentsBtn").addEventListener("click", () => showSection("students"));

let currentForm = ''; //leköveti hogy a kurzusokat vagy a diákokat mutassa az oldal

// A helyes szekciók kiíratása
function showSection(section) {
  document.getElementById("coursesSection").style.display = 'none';
  document.getElementById("studentsSection").style.display = 'none';
  document.getElementById("formSection").style.display = 'none';

  if (section === "courses") {
    document.getElementById("coursesSection").style.display = 'block';
    fetchData("courses");
  } else {
    document.getElementById("studentsSection").style.display = 'block';
    fetchData("students");
  }
}

// A form előhozása új adat beadásának szándéka esetén
function showForm(type) {
  currentForm = type;
  document.getElementById("formTitle").innerText = `Új ${type === "course" ? "kurzus" : "diák"} létrehozása`;
  document.getElementById("formSection").style.display = 'block';
}

//A form bezárása
function cancelForm() {
  document.getElementById("formSection").style.display = 'none';
}

// Adatok fetch-elése az API-ból
function fetchData(type) {
  fetch(`https://vvri.pythonanywhere.com/api/${type}`)
    .then(response => response.json())
    .then(data => {
      const list = document.getElementById(`${type}List`);
      list.innerHTML = '';
      data.forEach(item => {
        const div = document.createElement("div");
        div.innerHTML = `<strong>${item.name}</strong> (${item.details || "Nincs adat"})`;
        list.appendChild(div);
      });
    });
}

// Kurzus vagy diák létrehozása vagy szerkesztése
document.getElementById("dataForm").addEventListener("submit", function(event) {
  event.preventDefault();
  const name = document.getElementById("name").value;
  const details = document.getElementById("details").value;

  const url = currentForm === "course" ? "https://vvri.pythonanywhere.com/api/courses" : "https://vvri.pythonanywhere.com/api/students";
  const method = currentForm === "course" ? "POST" : "PUT"; // POST létrehoz, PUT frissít
  
  fetch(url, {
    method: method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, details })
  })
  .then(response => response.json())
  .then(() => {
    cancelForm();
    showSection(currentForm);
  });
});
