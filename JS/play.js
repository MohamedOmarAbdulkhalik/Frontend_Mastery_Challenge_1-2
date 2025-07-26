const content = document.getElementsByClassName("table")[0];
document.querySelector("#status").value = "";
let deletedArray = [];
let empsArray = [];

let counter = 0;

function add_emp() {
  counter++;
  var nameField = document.getElementById("name");
  var nameText = nameField.value;

  var roleField = document.getElementById("role");
  var roleText = roleField.value;

  var statusField = document.getElementById("status");
  var statusText = statusField.value;

const salaryField = document.getElementById("salary");
const salaryValue = salaryField.value;


  let errorDiv = document.getElementById("errorMsg");
  if (!errorDiv) {
    errorDiv = document.createElement("div");
    errorDiv.setAttribute("id", "errorMsg");
    errorDiv.style.color = "red";
    document.querySelector("form").appendChild(errorDiv);
  }
  errorDiv.innerText = "";

  const nameRegex = /^[A-Za-z ]{3,}$/;
  const roleRegex = /^[A-Za-z ]{3,}$/;
  const salaryRegex = /^[0-9]{1,7}$/;

  if (
    !nameRegex.test(nameText) ||
    !roleRegex.test(roleText) ||
    !salaryRegex.test(salaryValue)
  ) {
    errorDiv.innerText = "⚠ Please fill out all fields correctly!";
    return;
  }

  if (nameText != "" && roleText != "" && statusText != "") {
    // validate empty fields
    if (content.classList.contains("emp")) {
      // create an employee container
      var empDiv = document.createElement("div");
      empDiv.setAttribute("id", `emp-${counter}`);

      // create employee's data one by one
      var nameSpan = document.createElement("span"); //id
      nameSpan.setAttribute("id", `name-${counter}`);
      nameSpan.innerText = nameText;

      var roleSpan = document.createElement("span");
      roleSpan.setAttribute("id", `role-${counter}`);
      roleSpan.innerText = roleText;

      var salarySpan = document.createElement("span");
      salarySpan.setAttribute("id", `salary-${counter}`);
      salarySpan.innerText = salaryValue + " R";

      var editButton = document.createElement("input");
      editButton.setAttribute("type", "button");
      editButton.setAttribute("value", "Edit");
      editButton.setAttribute("id", `edit-${counter}`);
      editButton.setAttribute("onclick", `edit_emp(${counter})`);

      var deleteButton = document.createElement("input");
      deleteButton.setAttribute("type", "button");
      deleteButton.setAttribute("value", "Delete");
      deleteButton.setAttribute("id", `delete-${counter}`);
      deleteButton.setAttribute("onclick", `delete_emp(${counter})`);

      var bonusButton = document.createElement("input");
      bonusButton.setAttribute("type", "button");
      bonusButton.setAttribute("value", "Bonus");
      bonusButton.setAttribute("onclick", `add_bonus(${counter})`);

      empDiv.append(
        nameSpan,
        roleSpan,
        editButton,
        deleteButton,
        salarySpan,
        bonusButton
      );

      switch (statusText) {
        case "active":
          empDiv.classList.add("active");
          break;
        case "onLeave":
          empDiv.classList.add("onLeave");

          break;
        case "terminated":
          empDiv.classList.add("terminated");

          break;
      }

      content.appendChild(empDiv);
      updatePayroll();

      if (parseFloat(salaryValue) >= 100000) {
        nameSpan.style.background = "lightgreen";
        nameSpan.style.padding = "3px";
      }

      //empsArray.push(empDiv)

      //console.log(nameText, roleText, statusText, counter, empDiv);

      // nameField.value = "";
      // roleField.value = "";
      // statusField.value = "";
    } else {
      window.alert("go to emps page");
    }
  } else {
    window.alert("empty Fields");
  }
}

function edit_emp(id) {
  const empDiv = document.getElementById(`emp-${id}`);

  const nameSpan = document.getElementById(`name-${id}`);
  const roleSpan = document.getElementById(`role-${id}`);
  const statusList = document.getElementById("status").cloneNode(true);

  const editButton = document.getElementById(`edit-${id}`);

  const statuse = empDiv.getAttribute("class");
  console.log(statuse);
  console.log(statusList);
  editButton.setAttribute("value", "Save");
  editButton.setAttribute("onclick", `save(${id})`);

  empDiv.removeChild(nameSpan);
  empDiv.removeChild(roleSpan);

  const nameField = document.createElement("input");
  nameField.setAttribute("type", "text");
  nameField.setAttribute("value", nameSpan.innerText);
  nameField.setAttribute("id", `nameField-${id}`);

  const roleField = document.createElement("input");
  roleField.setAttribute("type", "text");
  roleField.setAttribute("value", roleSpan.innerText);
  roleField.setAttribute("id", `roleField-${id}`);

  statusList.setAttribute("id", `status-${id}`);
  statusList.value = statuse;
  editButton.before(nameField, roleField, statusList);
  //console.log(empDiv, nameSpan, roleSpan, editButton, statuse);
}

function save(id) {
  var empName = document.getElementById(`nameField-${id}`);
  var empRole = document.getElementById(`roleField-${id}`);
  var empSatatus = document.getElementById(`status-${id}`);
  const editButton = document.getElementById(`edit-${id}`);
  const empDiv = document.getElementById(`emp-${id}`);

  var nameText = empName.value;
  var roleText = empRole.value;
  var statuseVale = empSatatus.value;

  var nameSpan = document.createElement("span"); //id
  nameSpan.setAttribute("id", `name-${id}`);
  nameSpan.innerText = nameText;

  var roleSpan = document.createElement("span");
  roleSpan.setAttribute("id", `role-${id}`);
  roleSpan.innerText = roleText;

  switch (statuseVale) {
    case "active":
      empDiv.setAttribute("class", "active");
      // empDiv.classList.add("active");
      break;
    case "onLeave":
      // empDiv.classList.add("onLeave");
      empDiv.setAttribute("class", "onLeave");

      break;
    case "terminated":
      // empDiv.classList.add("terminated");
      empDiv.setAttribute("class", "terminated");

      break;
  }

  empDiv.removeChild(empName);
  empDiv.removeChild(empRole);
  empDiv.removeChild(empSatatus);

  editButton.before(nameSpan);
  editButton.before(roleSpan);

  editButton.setAttribute("onclick", `edit_emp(${id})`);
  editButton.setAttribute("value", "Edit");
}

function delete_emp(id) {
  const empDiv = document.getElementById(`emp-${id}`);
  deletedArray.push(empDiv);
  content.removeChild(empDiv);

  // console.log(deletedArray[0]);
}

function show_trash() {
  empsArray.length = 0;
  content.classList.add("del");
  content.classList.remove("emp");
  const temp = [];

  for (var i = 0; i < content.children.length; i++) {
    temp.push(content.children[i]);
  }

  for (var i = 0; i < temp.length; i++) {
    empsArray.push(temp[i]);
    content.removeChild(temp[i]);
  }

  for (var i = 0; i < deletedArray.length; i++) {
    content.appendChild(deletedArray[i]);
  }

  for (var i = 0; i < deletedArray.length; i++) {
    const item = deletedArray[i];

    const editBtn = item.querySelector(`#edit-${item.id.split("-")[1]}`);
    const deleteBtn = item.querySelector(`#delete-${item.id.split("-")[1]}`);

    editBtn.value = "Restore";
    editBtn.onclick = function () {
      empsArray.push(item);
      deletedArray.splice(deletedArray.indexOf(item), 1);
      content.removeChild(item);
    };

    deleteBtn.value = "Premenent Deletion";
    deleteBtn.onclick = function () {
      deletedArray.splice(deletedArray.indexOf(item), 1);
      content.removeChild(item);
    };
  }
}

function show_emps() {
  if (!content.classList.contains("emp")) {
    deletedArray.length = 0;
    content.classList.add("emp");
    content.classList.remove("del");

    const temp = [];

    for (var i = 0; i < content.children.length; i++) {
      temp.push(content.children[i]);
    }

    for (var i = 0; i < temp.length; i++) {
      deletedArray.push(temp[i]);
      content.removeChild(temp[i]);
    }

    for (var i = 0; i < empsArray.length; i++) {
      content.appendChild(empsArray[i]);
    }

    for (var i = 0; i < empsArray.length; i++) {
      const item = empsArray[i];
      const id = item.id.split("-")[1];

      const editBtn = item.querySelector(`#edit-${id}`);
      const deleteBtn = item.querySelector(`#delete-${id}`);

      if (editBtn && deleteBtn) {
        editBtn.value = "Edit";
        editBtn.setAttribute("onclick", `edit_emp(${id})`);

        deleteBtn.value = "Delete";
        deleteBtn.setAttribute("onclick", `delete_emp(${id})`);
      }
    }
  }
}

function add_bonus(id) {
  let percentage = prompt("Enter bonus percentage:");
  if (percentage !== null && !isNaN(percentage) && percentage !== "") {
    let salaryText = document.getElementById(`salary-${id}`).innerText;
    let salary = parseFloat(salaryText);
    let bonus = (salary * parseFloat(percentage)) / 100;

    let bonusSpan = document.getElementById(`bonus-${id}`);
    if (!bonusSpan) {
      bonusSpan = document.createElement("span");
      bonusSpan.setAttribute("id", `bonus-${id}`);
      document.getElementById(`emp-${id}`).appendChild(bonusSpan);
    }
    bonusSpan.innerText = `Bonus: ${bonus.toFixed(2)} R`;
    bonusSpan.style.color = "deeppink";
  }
  document.getElementById(`name-${id}`).style.background = "pink";
}

function updatePayroll() {
  let total = [...content.children]
    .map(emp => parseFloat(emp.querySelector(`[id^='salary-']`).innerText))
    .reduce((acc, val) => acc + val, 0);

  document.getElementById("totalPayroll").innerText = total + " R";
}

function applyFilter() {
  let nameVal = document.getElementById("filterName").value.toLowerCase();
  let roleVal = document.getElementById("filterRole").value.toLowerCase();
  let minSalary = parseFloat(document.getElementById("filterSalaryMin").value) || 0;
  let maxSalary = parseFloat(document.getElementById("filterSalaryMax").value) || Infinity;

  [...content.children].forEach(emp => {
    emp.style.display = "none"; // إخفاء الكل أولاً
  });

  [...content.children]
    .filter(emp => {
      let name = emp.querySelector(`[id^='name-']`).innerText.toLowerCase();
      let role = emp.querySelector(`[id^='role-']`).innerText.toLowerCase();
      let salary = parseFloat(emp.querySelector(`[id^='salary-']`).innerText);

      return name.includes(nameVal) &&
             role.includes(roleVal) &&
             salary >= minSalary &&
             salary <= maxSalary;
    })
    .forEach(emp => emp.style.display = "block");
}


function searchEmployee() {
  let searchVal = document.getElementById("searchName").value.toLowerCase();
  let result = empsArray.find((emp) => {
    let name = emp.querySelector(`[id^='name-']`).innerText.toLowerCase();
    return name === searchVal;
  });

  let resultDiv = document.getElementById("searchResult");
  if (result) {
    resultDiv.innerText =
      "Employee Found: " + result.querySelector(`[id^='role-']`).innerText;
    resultDiv.style.color = "green";
  } else {
    resultDiv.innerText = "Employee Not Found!";
    resultDiv.style.color = "red";
  }
}
