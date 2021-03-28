function addNote(event) {
  event.preventDefault();
  let key = uuidV4(); // UUID ID function
  let newNote = document.getElementById("contentAdd").value;
  let date = document.getElementById("dateInput").value;
  let time = document.getElementById("timeInput").value;
  if (time == "") {
    time = "23:59";
  }
  let fullDate = Date.parse(date + " " + time);

  //Validation
  (newNote === "" || newNote.trim() == "" || newNote == null) &&
    Swal.fire("Error!", "Please enter your task details!", "error");
  {
    fullDate < new Date().getTime() &&
      Swal.fire("Error!", "Please enter correct date !", "error");
    fullDate === null && Swal.fire("Error!", "The date is empty!", "error");
  }
  if (
    newNote != "" &&
    newNote != null &&
    fullDate >= new Date().getTime() &&
    fullDate != null &&
    newNote.trim() != ""
  ) {
    localStorage.setItem(
      key,
      JSON.stringify({
        date: fullDate,
        title: newNote.toString(),
        time: new Date().getTime(),
      })
    );
    document.getElementById(
      "list"
    ).innerHTML += `<li id=${key} onmouseover="unHidden(this.id)" onmouseout="appendHiddenAttribute(this.id)"><div id="style-6" class="item-div">${
      JSON.parse(localStorage.getItem(key)).title
    } </div><input class="input-date" type="text" disabled value=${
      new Date(
        JSON.parse(localStorage.getItem(key)).date
      ).toLocaleDateString() +
      "-" +
      new Date(JSON.parse(localStorage.getItem(key)).date).toTimeString()
    }> <button id=${key} type="button" class="btn btn-warning btn-add btn-place" onclick="removeItemFromUnOrderList(this.id)" hidden>
                <span class="glyphicon glyphicon-remove"></span>
            </button></li>`;
    document.getElementById("contentAdd").value = ``;
    Swal.fire("Good job!", "Thank you for adding a new task", "success");
  }
}
//Sorting and display item task list
window.onload = function () {
  document.getElementById(
    "dateInput"
  ).value = new Date().toISOString().substring(0, 10);
  (keys = Object.keys(localStorage)), (indexKey = keys.length);
  document.getElementById("list").innerHTML = "";
  const listItems = [];
  while (indexKey--) {
    if (
      JSON.parse(localStorage.getItem(keys[indexKey])).date <
      new Date().getTime()
    ) {
      localStorage.removeItem(keys[indexKey]);
    } else {
      listItems.push({
        id: keys[indexKey],
        title: JSON.parse(localStorage.getItem(keys[indexKey])).title,
        date: JSON.parse(localStorage.getItem(keys[indexKey])).date,
        time: JSON.parse(localStorage.getItem(keys[indexKey])).time,
      });
    }
  }
  listItems.sort((a, b) => a.time - b.time);
  listItems.forEach((element) => {
    document.getElementById("list").innerHTML += `<li id=${
      element.id
    } onmouseover="unHidden(this.id)" onmouseout="appendHiddenAttribute(this.id)"><div id="style-6" class="item-div">${
      element.title
    } </div><input class="input-date" type="text" disabled value=${
      new Date(element.date).toLocaleDateString() +
      "-" +
      new Date(element.date).toTimeString()
    }> <button id=${
      element.id
    } type="button" class="btn btn-warning btn-add btn-place" onclick="removeItemFromUnOrderList(this.id)" hidden>
                        <span class="glyphicon glyphicon-remove"></span>
                    </button></li>`;
  });
};
//Clear Local Storage
function clearStorage() {
  localStorage.clear();
  Swal.fire("Carefully!", "All The tasks are removed!", "warning");
  window.onload();
}
//Remove item list by id;
function removeItemFromUnOrderList(id) {
  localStorage.removeItem(id);
  document.getElementById(id).remove();
}
//clear input
function clearInput() {
  document.getElementById("contentAdd").value = ``;
}
//Create UUID
function uuidV4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
    /[xy]/g,
    function (character) {
      let randomIndex = (Math.random() * 16) | 0,
        HashId = character == "x" ? randomIndex : (randomIndex & 0x3) | 0x8;
      return HashId.toString(16);
    }
  );
}
//Remove hidden attribute from button
function unHidden(id) {
  let myItem = document.getElementById(id);
  let buttonChild = myItem.querySelector("button");
  buttonChild.removeAttribute("hidden");
}
// Add hidden attribute to button
function appendHiddenAttribute(id) {
  let myItem = document.getElementById(id);
  let buttonChild = myItem.querySelector("button");
  buttonChild.setAttribute("hidden", "");
}
