function addNote(event) {
  event.preventDefault();
  let key = uuidV4(); // UUID ID function
  let newNote = document.getElementById("content-add").value;
  let date = document.getElementById("date-input").value;
  let time = document.getElementById("time-input").value;
  let fullDate = Date.parse(date + " " + time);
  //Validation
  (newNote === "" || newNote.trim() == '') && alert("Please enter your task details!");{
  (fullDate < new Date().getTime()) && alert("Please enter correct date !");
  (fullDate === null) &&  alert("The date is empty!");
  } ((newNote != "" && newNote !== null) && (fullDate >= new Date().getTime()) && (fullDate != null) ) && (newNote.trim() != '') &&
    localStorage.setItem(
      key,
      JSON.stringify({ date: fullDate, title: newNote.toString() })
    );
    document.getElementById(
      "list"
    ).innerHTML += `<li id=${key} onmouseover="unHidden(this.id)" onmouseout="appendHiddenAttribute(this.id)"><div class="item-div">${
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
    document.getElementById("content-add").value = ``;
  }
//Clear Local Storage
function clearSession() {
  localStorage.clear();
  window.onload();
}
//Remove item list by id;
function removeItemFromUnOrderList(id) {
  localStorage.removeItem(id);
  document.getElementById(id).remove();
}
window.onload = function () {
  // e.preventDefault();
  (keys = Object.keys(localStorage)), (indexKey = keys.length);
  document.getElementById("list").innerHTML = "";
  while (indexKey--) {
    if (JSON.parse(localStorage.getItem(keys[indexKey])).date < new Date().getTime()) {
      localStorage.removeItem(keys[indexKey]);
    } else {
      document.getElementById("list").innerHTML += `<li id=${
        keys[indexKey]
      } onmouseover="unHidden(this.id)" onmouseout="appendHiddenAttribute(this.id)"><div class="item-div">${
        JSON.parse(localStorage.getItem(keys[indexKey])).title
      } </div><input class="input-date" type="text" disabled value=${
        new Date(
          JSON.parse(localStorage.getItem(keys[indexKey])).date
        ).toLocaleDateString() +
        "-" +
        new Date(JSON.parse(localStorage.getItem(keys[indexKey])).date).toTimeString()
      }> <button id=${
        keys[indexKey]
      } type="button" class="btn btn-warning btn-add btn-place" onclick="removeItemFromUnOrderList(this.id)" hidden>
                      <span class="glyphicon glyphicon-remove"></span>
                  </button></li>`;
    }
  }
};
//clear input
function clearInput() {
  document.getElementById("content-add").value = ``;
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
function unHidden(id){
    let myItem = document.getElementById(id);
    let buttonChild = myItem.querySelector("button");
    buttonChild.removeAttribute("hidden");
}
// add hidden attribute to button
function appendHiddenAttribute(id){
    let myItem = document.getElementById(id);
    let buttonChild = myItem.querySelector("button");
    buttonChild.setAttribute("hidden","");
}
