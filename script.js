// Subjects and study parameters
const subjects = ['Math', 'Science', 'History', 'English'];
const dailyStudyHours = 2;
const daysInWeek = 7;

// Pomodoro parameters
const pomodoroWorkDuration = 25 * 60; // 25 minutes in seconds
const pomodoroBreakDuration = 5 * 60; // 5 minutes in seconds
let pomodoroTimer = null;
let pomodoroSeconds = 0;
let isWorkSession = true;

// Generate weekly study schedule
function generateStudySchedule() {
  const schedule = [];
  const hoursPerSubject = dailyStudyHours / subjects.length;

  for (let day = 0; day < daysInWeek; day++) {
    const daySchedule = {};
    subjects.forEach(subject => {
      daySchedule[subject] = hoursPerSubject.toFixed(2);
    });
    schedule.push(daySchedule);
  }
  return schedule;
}

// Render calendar with study schedule
function renderCalendar(schedule) {
  const calendarDiv = document.getElementById('calendar');
  calendarDiv.innerHTML = '';

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  for (let i = 0; i < daysInWeek; i++) {
    const dayDiv = document.createElement('div');
    dayDiv.className = 'day';

    const dayTitle = document.createElement('h3');
    dayTitle.textContent = days[i];
    dayDiv.appendChild(dayTitle);

    const subjectsList = document.createElement('ul');
    for (const subject of subjects) {
      const li = document.createElement('li');
      li.textContent = `${subject}: ${schedule[i][subject]} hrs`;
      subjectsList.appendChild(li);
    }
    dayDiv.appendChild(subjectsList);

    calendarDiv.appendChild(dayDiv);
  }
}

// Format seconds to HH:MM:SS
function formatTime(seconds) {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${hrs.toString().padStart(2,'0')}:${mins.toString().padStart(2,'0')}:${secs.toString().padStart(2,'0')}`;
}

// Update timer display
function updateTimerDisplay() {
  const display = document.getElementById('timer-display');
  display.textContent = formatTime(pomodoroSeconds);
}

// Update Pomodoro status display
function updatePomodoroStatus(status) {
  const statusDiv = document.getElementById('pomodoro-status');
  statusDiv.textContent = `Status: ${status}`;
}

// Pomodoro timer tick
function pomodoroTick() {
  if (pomodoroSeconds > 0) {
    pomodoroSeconds--;
    updateTimerDisplay();
  } else {
    clearInterval(pomodoroTimer);
    pomodoroTimer = null;
    if (isWorkSession) {
      alert('Work session complete! Time for a break.');
      updatePomodoroStatus('Break');
      pomodoroSeconds = pomodoroBreakDuration;
    } else {
      alert('Break over! Time to work.');
      updatePomodoroStatus('Work');
      pomodoroSeconds = pomodoroWorkDuration;
    }
    isWorkSession = !isWorkSession;
    pomodoroTimer = setInterval(pomodoroTick, 1000);
  }
}

// Start Pomodoro timer
function startTimer() {
  if (pomodoroTimer) return;
  if (pomodoroSeconds === 0) {
    pomodoroSeconds = isWorkSession ? pomodoroWorkDuration : pomodoroBreakDuration;
  }
  updatePomodoroStatus(isWorkSession ? 'Work' : 'Break');
  pomodoroTimer = setInterval(pomodoroTick, 1000);
  document.getElementById('start-timer').disabled = true;
  document.getElementById('stop-timer').disabled = false;
  document.getElementById('reset-timer').disabled = false;
}

// Stop Pomodoro timer
function stopTimer() {
  clearInterval(pomodoroTimer);
  pomodoroTimer = null;
  updatePomodoroStatus('Paused');
  document.getElementById('start-timer').disabled = false;
  document.getElementById('stop-timer').disabled = true;
}

// Reset Pomodoro timer
function resetTimer() {
  stopTimer();
  pomodoroSeconds = 0;
  updateTimerDisplay();
  updatePomodoroStatus('Idle');
  document.getElementById('reset-timer').disabled = true;
}

// Motivational quotes
const quotes = [
  "The future depends on what you do today. – Mahatma Gandhi",
  "Don’t watch the clock; do what it does. Keep going. – Sam Levenson",
  "Success is the sum of small efforts, repeated day in and day out. – Robert Collier",
  "The secret of getting ahead is getting started. – Mark Twain",
  "It always seems impossible until it’s done. – Nelson Mandela"
];

// Display a random quote
function displayRandomQuote() {
  const quoteBlock = document.getElementById('motivational-quote');
  const randomIndex = Math.floor(Math.random() * quotes.length);
  quoteBlock.textContent = quotes[randomIndex];
}

// Suggest a daily routine for a college student using Pomodoro technique
function suggestDailyRoutine() {
  const suggestionDiv = document.getElementById('daily-routine-suggestion');
  const routine = `
    <h3>Suggested Daily Routine (Pomodoro Technique)</h3>
    <ul>
      <li>8:00 AM - 9:00 AM: Exercise</li>
      <li>9:00 AM - 12:00 PM: Study (Pomodoro sessions with breaks)</li>
      <li>12:00 PM - 1:00 PM: Lunch Break</li>
      <li>1:00 PM - 3:00 PM: Study (Pomodoro sessions with breaks)</li>
      <li>3:00 PM - 3:30 PM: Short Break / Relax</li>
      <li>3:30 PM - 5:00 PM: Study / Assignments</li>
      <li>5:00 PM - 6:00 PM: Free Time / Hobbies</li>
      <li>6:00 PM - 7:00 PM: Dinner</li>
      <li>7:00 PM - 9:00 PM: Review and light study</li>
      <li>9:00 PM onwards: Relax and sleep preparation</li>
    </ul>
    <p>Use 25-minute focused study sessions followed by 5-minute breaks to maximize productivity.</p>
  `;
  suggestionDiv.innerHTML = routine;
}

// Initialize app
function init() {
  const schedule = generateStudySchedule();
  renderCalendar(schedule);
  displayRandomQuote();
  updateTimerDisplay();
  updatePomodoroStatus('Idle');
  suggestDailyRoutine();

  document.getElementById('start-timer').addEventListener('click', startTimer);
  document.getElementById('stop-timer').addEventListener('click', stopTimer);
  document.getElementById('reset-timer').addEventListener('click', resetTimer);
  document.getElementById('new-quote').addEventListener('click', displayRandomQuote);
}

window.onload = init;
