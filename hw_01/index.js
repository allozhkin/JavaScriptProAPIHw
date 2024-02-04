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

divEl.addEventListener("click", function ({ target }) {
  const fatherEl = target.closest(".schedule");
  const currentParticipants = fatherEl.querySelector(".participants-current");
  const maxParticipants = fatherEl.querySelector(".participants-max");
  let btn = target.closest(".btn-register");
  if (target.matches(".btn-register")) {
    if (currentParticipants.textContent === maxParticipants.textContent) {
      alert("Группа полная");
    }
    const newCur = ++currentParticipants.textContent;
    saveData(schedule);
    btn.disabled = true;
  }

});
divEl.addEventListener("click", function ({ target }) {
  const fatherEl = target.closest(".schedule");
  const currentParticipants = fatherEl.querySelector(".participants-current");
  if (target.matches(".btn-cancel")) {
    const newCur = --currentParticipants.textContent;
    target.closest(".btn-cancel").disabled = true;
    saveData(schedule);
  }
});

function showSchedule(element) {
  divEl.insertAdjacentHTML(
    "beforeend",
    `
      <div class="schedule" data-id ="${element.id}">
            <div class="title">название занятия: ${element.name}</div>
            <div class="time">время проведения занятия: ${element.time}</div>
            <div class="participants-max">максимальное количество участников: ${element.maxParticipants}</div>
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
