let counter = 1; //counter for list item -> id
function addNote(event) {
  event.preventDefault();

  let key = uuidV4();
  

  let newNote = document.getElementById("content-add").value;
  let date = document.getElementById("date-input").value;
  let time = document.getElementById("time-input").value;
  let fullDate = Date.parse(date + " " + time);
  //Validation
  if (newNote === "") {
    alert("Please enter your task details!");
  } else if (fullDate < new Date().getTime()) {
    alert("Please enter correct date !");
  } else if (fullDate === null) {
    alert("The date is empty!");
  } else if (
    newNote != "" &&
    fullDate >= new Date().getTime() &&
    fullDate != null
  ) {
    localStorage.setItem(
        key,
      JSON.stringify({ date: fullDate, title: newNote.toString() })
    );
    document.getElementById(
      "list"
    ).innerHTML += `<li id=${key}><div class="item-div">${
      JSON.parse(localStorage.getItem(key)).title
    } </div><input class="input-date" type="text" disabled value=${
      new Date(
        JSON.parse(localStorage.getItem(key)).date
      ).toLocaleDateString() +
      "-" +
      new Date(JSON.parse(localStorage.getItem(key)).date).toTimeString()
    }> <button id=${key} type="button" class="btn btn-warning btn-add btn-place" onclick="removeItemFromUnOrderList(this.id)"}>
                <span class="add-note">X</span>
            </button></li>`;
    document.getElementById("content-add").value = ``;

    counter++;
  }
}
//clear Local Storage
function clearSession() {
  localStorage.clear();
}
//remove Item by list id;
function removeItemFromUnOrderList(id) {
  localStorage.removeItem(id);
  document.getElementById(id).remove();
}
function displayItems(){
    // e.preventDefault();
    keys = Object.keys(localStorage),
    i = keys.length;
    while ( i-- ) {
        document.getElementById(
            "list"
          ).innerHTML = `<li id=${keys[i]}><div class="item-div">${
            JSON.parse(localStorage.getItem( keys[i] )).title
          } </div><input class="input-date" type="text" disabled value=${
            new Date(
              JSON.parse(localStorage.getItem(keys[i])).date
            ).toLocaleDateString() +
            "-" +
            new Date(JSON.parse(localStorage.getItem(keys[i])).date).toTimeString()
          }> <button id=${keys[i]} type="button" class="btn btn-warning btn-add btn-place" onclick="removeItemFromUnOrderList(this.id)"}>
                      <span class="add-note">X</span>
                  </button></li>`;
       
    }
}
function uuidV4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
window.onload = displayItems();
