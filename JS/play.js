const content = document.getElementsByClassName("table")[0];
document.querySelector("#status").value = "";
let deletedArray = [];

let counter = 0;
function add_emp() {
  counter++;
  var nameField = document.getElementById("name");
  var nameText = nameField.value;

  var roleField = document.getElementById("role");
  var roleText = roleField.value;

  var statusField = document.getElementById("status");
  var statusText = statusField.value;

  if (nameText != "" && roleText != "" && statusText != "") {
    // validate empty fields

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


    empDiv.append(nameSpan,roleSpan,editButton,deleteButton)
  
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

    console.log(nameText, roleText, statusText, counter, empDiv);

    nameField.value = "";
    roleField.value = "";
    statusField.value = "";

  } else {
    window.alert("empty Fields");
  }
}

function edit_emp(id) {
  console.log(id, "hello");
}

function delete_emp(id) {
  console.log(id, "delete");
  var element = document.getElementById(`emp-${id}`);
  console.log(element);
}
