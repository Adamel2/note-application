let counter = 1;
function addNote() {
  let someNote = document.getElementById("content-add").value;
  let date = document.getElementById("date-input").value;
  let time = document.getElementById("time-input").value;
  console.log(typeof new Date().getTime());
  let fullDate = Date.parse(date + " " + time);
  console.log(typeof fullDate);
  if (someNote != "" && fullDate >= new Date().getTime() && fullDate != null) {
    localStorage.setItem(
      counter,
      JSON.stringify({ date: fullDate, title: someNote.toString() })
    );
    document.getElementById(
      "list"
    ).innerHTML += `<li id=${counter}><div class="item-div">${
      JSON.parse(localStorage.getItem(counter)).title
    } </div><input class="input-date" type="text" disabled value=${
      new Date(
        JSON.parse(localStorage.getItem(counter)).date
      ).toLocaleDateString() +
      "-" +
      new Date(JSON.parse(localStorage.getItem(counter)).date).toTimeString()
    }> <button id=${counter} type="button" class="btn btn-warning btn-add btn-place" onclick="removeItemFromUnOrderList(this.id)"}>
                <span class="add-note">X</span>
            </button></li>`;

    $("#click-add").click(function () {
      $(".notify").toggleClass("active");
      $("#notifyType").toggleClass("success");

      setTimeout(function () {
        $(".notify").removeClass("active");
        $("#notifyType").removeClass("success");
      }, 2000);
    });

    $("#failure").click(function () {
      $(".notify").addClass("active");
      $("#notifyType").addClass("failure");

      setTimeout(function () {
        $(".notify").removeClass("active");
        $("#notifyType").removeClass("failure");
      }, 2000);
    });

    counter++;
    setTimeout(() => {
      $(function () {
        $("#click-add").focus();
      });
    }, 1);
  }
  document.getElementById("content-add").value = ``;
}

function clearSession() {
  localStorage.clear();
}
function removeItemFromUnOrderList(id) {
  localStorage.removeItem(id);
  document.getElementById(id).remove();
}
