const initialValue = `[
    {
        "id": 1,
        "name": "Йога",
        "time": "10:00 - 11:00",
        "maxParticipants": 15,
        "currentParticipants": 8
    },
    {
        "id": 2,
        "name": "Пилатес",
        "time": "11:30 - 12:30",
        "maxParticipants": 10,
        "currentParticipants": 5
    },
    {
        "id": 3,
        "name": "Кроссфит",
        "time": "13:00 - 14:00",
        "maxParticipants": 20,
        "currentParticipants": 15
    },
    {
        "id": 4,
        "name": "Танцы",
        "time": "14:30 - 15:30",
        "maxParticipants": 12,
        "currentParticipants": 10
    },
    {
        "id": 5,
        "name": "Бокс",
        "time": "16:00 - 17:00",
        "maxParticipants": 8,
        "currentParticipants": 6
    }
]`;

const localStorageKey = "schedule";
const divEl = document.querySelector(".list-schedule");
const btnRegister = document.querySelector(".btn-register");
const btnCancel = document.querySelector(".btn-cancel");

if (!localStorage.getItem("localStorageKey")) {
  localStorage.setItem(localStorageKey, initialValue);
}
const schedule = JSON.parse(localStorage.getItem(localStorageKey));

schedule.forEach((element) => {
  showSchedule(element);
});

const registerBtn = document.querySelectorAll(".btn-register");
const cancelBtn = document.querySelectorAll(".btn-cancel");


divEl.addEventListener("click", function ({ target }) {
  const fatherEl = target.closest(".schedule");
  const currentParticipants = fatherEl.querySelector(".participants-current");
  const maxParticipants = fatherEl.querySelector(".participants-max");
  const regBtn = target.matches(".btn-register");
  const cancelBtn = target.matches(".btn-cancel");
  let counter = 0;
  if (regBtn) {
    if (currentParticipants.innerHTML != maxParticipants.innerHTML) {
      counter = ++currentParticipants.textContent;
      target.closest(".btn-register").disabled = true;
    } else if (currentParticipants.innerHTML === maxParticipants.innerHTML) {
      alert("Группа полная");
    }
  } else if (cancelBtn) {
    target.closest(".btn-cancel").disabled = true;
    counter = --currentParticipants.textContent
  }
  const resSchedule = schedule.find((item) => {
    return item.id === +fatherEl.dataset.id;
  });
  resSchedule.currentParticipants = counter;
  saveData(schedule);
});

// cancelBtn.forEach((cancel) => {
//   cancel.disabled = true;
// });


function showSchedule(element) {
  divEl.insertAdjacentHTML(
    "beforeend",
    `
      <div class="schedule" data-id ="${element.id}">
            <div class="title"> ${element.name}</div>
            <div class="time">${element.time}</div>
            <div class="participants-max">${element.maxParticipants}</div>
            <div class="participants-current">${element.currentParticipants}</div>
            <button class="btn-register">записаться</button>
            <button class="btn-cancel">отменить запись</button>
      </div>
      <br>
            `
  );
}

function saveData(array) {
  localStorage.setItem(localStorageKey, JSON.stringify(array));
}
