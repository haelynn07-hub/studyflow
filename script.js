let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let timer;
let timeLeft = 1500;

function renderTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  let completed = 0;

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <input type="checkbox" ${task.done ? "checked" : ""} onchange="toggleTask(${index})">
      ${task.text}
    `;

    if (task.done) completed++;
    taskList.appendChild(li);
  });

  let progress = tasks.length === 0 ? 0 : (completed / tasks.length) * 100;
  document.getElementById("progress").style.width = progress + "%";
  document.getElementById("progressText").innerText = Math.round(progress) + "%";

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
  const input = document.getElementById("taskInput");
  if (input.value.trim() === "") return;

  tasks.push({
    text: input.value,
    done: false
  });

  input.value = "";
  renderTasks();
}

function toggleTask(index) {
  tasks[index].done = !tasks[index].done;
  renderTasks();
}

function startTimer() {
  clearInterval(timer);

  timer = setInterval(() => {
    if (timeLeft <= 0) {
      clearInterval(timer);
      alert("집중 완료! 🎉");
      timeLeft = 1500;
      updateTimer();
      return;
    }

    timeLeft--;
    updateTimer();
  }, 1000);
}

function updateTimer() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  document.getElementById("timer").innerText =
    `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

renderTasks();
