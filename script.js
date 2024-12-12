const minsDisplay = document.querySelector("#mins");
const secsDisplay = document.querySelector("#secs");
const msDisplay = document.querySelector("#ms");

const startButton = document.querySelector("#startBtn");
const stopButton = document.querySelector("#stopBtn");
const pauseButton = document.querySelector("#pauseBtn");
const resetButton = document.querySelector("#resetBtn");

const lapList = document.querySelector("#lap-list");
const laptime = document.querySelector(".laptime");
const lapTitle = document.querySelector(".lap-title");

// stopwatch variables
let minutes = 0;
let seconds = 0;
let milliseconds = 0;
let interval;
let running = false;

startButton.addEventListener("click", startTimer);
stopButton.addEventListener("click", stopTimer);
pauseButton.addEventListener("click", pauseTimer);
resetButton.addEventListener("click", resetTimer);
lapList.addEventListener("click", deleteLap);

// Functions
function startTimer() {
  // updateTimer runs every 10ms
  running = true;
  interval = setInterval(updateTimer, 10);
  startButton.disabled = true;
}

function stopTimer() {
  clearInterval(interval);
  if (running) {
    addToLapList();
  }
  resetTimerData();
  startButton.disabled = false;
  running = false;
}

function pauseTimer() {
  clearInterval(interval);
  startButton.disabled = false;
}

function resetTimer() {
  clearInterval(interval);
  resetTimerData();
  startButton.disabled = false;
}

function updateTimer() {
  //  As timer runs every 10ms, at each run, ms increments by 1
  //  So it only has to increment 100 times to have changed by 1000ms, hence why below
  //  the condition is set to 100
  milliseconds++;
  if (milliseconds === 100) {
    milliseconds = 0;
    seconds++;
    if (seconds === 60) {
      seconds = 0;
      minutes++;
    }
  }

  displayTimer();
}

function displayTimer() {
  msDisplay.textContent = padTime(milliseconds);
  secsDisplay.textContent = padTime(seconds);
  minsDisplay.textContent = padTime(minutes);
}

function padTime(time) {
  return time.toString().padStart(2, "0");
}

function resetTimerData() {
  minutes = 0;
  seconds = 0;
  milliseconds = 0;
  displayTimer();
}

function addToLapList() {
  const lapTime = `${padTime(minutes)}:${padTime(seconds)}:${padTime(
    milliseconds
  )}`;

  const listLength = lapList.childElementCount;
  const listItem = document.createElement("li");
  listItem.setAttribute("class", "laptime");

  listItem.innerHTML = `<span>Lap ${
    listLength + 1
  }: ${lapTime}</span><button class="deleteBtn" data-list-value=${
    listLength + 1
  }>Delete</button>`;
  lapList.appendChild(listItem);

  lapTitle.innerHTML =
    lapList.children.length > 0 ? "Showing Recorded Laps" : "No laps recorded";
}

function deleteLap(e) {
  const element = e.target.parentElement;
  element.remove();
  if (lapList.children.length === 0) {
    lapTitle.innerHTML = "No laps recorded";
  }
}
