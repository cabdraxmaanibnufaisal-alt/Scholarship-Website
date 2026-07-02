/* ═══════════════════════════════════════
   UNIVERSAL STUDENT HUB — dashboard.js
   Tasks, Progress, Calendar, Bar Chart
═══════════════════════════════════════ */

/* ── TASKS (LocalStorage) ── */
let tasks = JSON.parse(localStorage.getItem('ush-tasks') || 'null') || [
  { id: 1, text: 'Submit Math assignment',       done: false },
  { id: 2, text: 'Read Chapter 5 – Data Science', done: true  },
  { id: 3, text: 'Apply for Google Scholarship', done: false },
];
let tid = tasks.reduce((m, t) => Math.max(m, t.id), 0) + 1;

function saveTasks() {
  localStorage.setItem('ush-tasks', JSON.stringify(tasks));
}
function renderTasks() {
  const ul = document.getElementById('task-list');
  if (!tasks.length) {
    ul.innerHTML = '<li style="color:var(--muted);font-size:13px;padding:14px 0;text-align:center">No tasks yet — add one above!</li>';
    updateDone(); return;
  }
  ul.innerHTML = tasks.map(t => `
    <li class="task-item${t.done ? ' done' : ''}" id="ti${t.id}">
      <input type="checkbox" class="task-cb" ${t.done ? 'checked' : ''}
        onchange="toggleTask(${t.id})"/>
      <span>${t.text}</span>
      <button class="task-del" onclick="delTask(${t.id})">×</button>
    </li>`).join('');
  updateDone();
}
function addTask() {
  const inp = document.getElementById('task-input');
  const txt = inp.value.trim();
  if (!txt) { toast('Please enter a task name', '#ef4444'); return; }
  tasks.push({ id: tid++, text: txt, done: false });
  inp.value = '';
  saveTasks(); renderTasks();
  toast('Task added ✅', '#10b981');
}
function toggleTask(id) {
  const t = tasks.find(x => x.id === id);
  if (t) {
    t.done = !t.done;
    saveTasks(); renderTasks();
    toast(t.done ? 'Task completed 🎉' : 'Task reopened', '#3b82f6');
  }
}
function delTask(id) {
  tasks = tasks.filter(x => x.id !== id);
  saveTasks(); renderTasks();
  toast('Task deleted', '#64748b');
}
function updateDone() {
  document.getElementById('sc-done').textContent = tasks.filter(t => t.done).length;
}
document.getElementById('task-input')
  .addEventListener('keydown', e => { if (e.key === 'Enter') addTask(); });

window.addTask    = addTask;
window.toggleTask = toggleTask;
window.delTask    = delTask;

/* ── PROGRESS BARS ── */
function initProgress() {
  document.querySelectorAll('.prog-fill').forEach(el => {
    el.style.width = '0%';
    setTimeout(() => el.style.width = el.dataset.w + '%', 150);
  });
}

/* ── BAR CHART ── */
function renderBars() {
  const days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
  const vals = [3, 5, 2, 7, 4, 6, 3];
  const max  = Math.max(...vals);
  document.getElementById('bar-chart').innerHTML = days.map((d, i) => `
    <div class="bar-wrap">
      <div class="bar-val">${vals[i]}h</div>
      <div class="bar"
        style="height:0;background:${i === 3 ? 'var(--gold)' : 'var(--accent)'};opacity:${(0.5 + vals[i]/max * 0.5).toFixed(2)}"
        data-h="${Math.round(vals[i] / max * 72)}"></div>
      <div class="bar-lbl">${d}</div>
    </div>`).join('');
  setTimeout(() =>
    document.querySelectorAll('.bar').forEach(b => b.style.height = b.dataset.h + 'px')
  , 200);
}

/* ── CALENDAR ── */
function renderCalendar() {
  const now   = new Date();
  const y = now.getFullYear(), m = now.getMonth();
  document.getElementById('cal-month').textContent =
    now.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  const dayNames  = ['Su','Mo','Tu','We','Th','Fr','Sa'];
  const firstDay  = new Date(y, m, 1).getDay();
  const daysInMon = new Date(y, m + 1, 0).getDate();
  const events    = [5, 10, 15, 20, 25];

  let h = dayNames.map(d => `<div class="cal-hdr">${d}</div>`).join('');
  for (let i = 0; i < firstDay; i++) h += `<div class="cal-day empty">0</div>`;
  for (let d = 1; d <= daysInMon; d++) {
    const isToday = d === now.getDate();
    const hasEv   = events.includes(d);
    const month   = now.toLocaleDateString('en-US', { month: 'long' });
    const msg     = hasEv ? `Event on ${d} ${month}` : `No events on ${d}`;
    h += `<div class="cal-day${isToday ? ' today' : ''}${hasEv ? ' has-event' : ''}"
      onclick="toast('${msg}','#f59e0b')">${d}</div>`;
  }
  document.getElementById('cal-grid').innerHTML = h;
}

/* ── DATE ── */
document.getElementById('dash-date').textContent =
  new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

/* ── INIT ── */
renderTasks();
initProgress();
renderBars();
renderCalendar();