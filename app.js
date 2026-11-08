'use strict';
/* ---------- утилиты ---------- */
const $ = (s, r = document) => r.querySelector(s);
const ymd = d => { const z = new Date(d.getTime() - d.getTimezoneOffset() * 60000); return z.toISOString().slice(0, 10); };
const nowHM = () => { const d = new Date(); return String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0'); };
const PATHS = {"today": "<circle cx=\"12\" cy=\"12\" r=\"4\" fill=\"none\"/><path d=\"M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6L7 7M17 17l1.4 1.4M18.4 5.6L17 7M7 17l-1.4 1.4\"/>", "tasks": "<circle cx=\"12\" cy=\"12\" r=\"9\" fill=\"none\"/><path d=\"M8 12.5l3 3 5-6\"/>", "diary": "<path d=\"M6 4h11a1 1 0 011 1v14a1 1 0 01-1 1H6zM6 4v16M10 8h5\"/>", "stats": "<path d=\"M4 19V5M4 19h16M8 15l3-4 3 2 4-6\"/>", "more": "<path d=\"M4 8h9M17 8h3M4 16h3M11 16h9\"/><circle cx=\"15\" cy=\"8\" r=\"2\" fill=\"none\"/><circle cx=\"9\" cy=\"16\" r=\"2\" fill=\"none\"/>", "games": "<path d=\"M6 8h12a3 3 0 013 3v3a3 3 0 01-5.2 2L14 14h-4l-1.8 2A3 3 0 013 14v-3a3 3 0 013-3zM7.5 10.5v3M6 12h3M15.5 11h.01M17.5 13h.01\"/>", "musa": "<path d=\"M4 4l4 3h8l4-3v8a8 8 0 01-16 0zM11 15h2l-1 1.2z\"/><circle cx=\"9\" cy=\"12\" r=\"0.8\" fill=\"currentColor\"/><circle cx=\"15\" cy=\"12\" r=\"0.8\" fill=\"currentColor\"/>", "walk": "<circle cx=\"13\" cy=\"4.5\" r=\"1.8\" fill=\"none\"/><path d=\"M13 8l-2 5 3 2 1 5M11 13l-4 1M13 8l3 3 2 1\"/>", "sport": "<path d=\"M6 8v8M3.5 10v4M18 8v8M20.5 10v4M6 12h12\"/>", "social": "<path d=\"M4 5h16v11H10l-4 4v-4H4z\"/>", "study": "<path d=\"M3 6c3-1 6-1 9 1 3-2 6-2 9-1v13c-3-1-6-1-9 1-3-2-6-2-9-1zM12 7v13\"/>", "music": "<path d=\"M9 18V6l10-2v12\"/><circle cx=\"6.5\" cy=\"18\" r=\"2.5\" fill=\"none\"/><circle cx=\"16.5\" cy=\"16\" r=\"2.5\" fill=\"none\"/>", "pc": "<path d=\"M3 5h18v11H3zM9 20h6M12 16v4\"/>", "rest": "<path d=\"M20 14.5A8 8 0 019.5 4a8 8 0 1010.5 10.5z\"/>", "prev": "<path d=\"M15 6l-6 6 6 6\"/>", "next": "<path d=\"M9 6l6 6-6 6\"/>", "check": "<path d=\"M6 12.5l4 4 8-9\"/>", "x": "<path d=\"M6 6l12 12M18 6L6 18\"/>", "work": "<path d=\"M4 8h16v11H4zM9 8V6a1 1 0 011-1h4a1 1 0 011 1v2M4 13h16\"/>", "f1": "<circle cx=\"12\" cy=\"12\" r=\"9\" fill=\"none\"/><circle cx=\"9\" cy=\"10\" r=\"0.9\" fill=\"currentColor\"/><circle cx=\"15\" cy=\"10\" r=\"0.9\" fill=\"currentColor\"/><path d=\"M8.5 16.5c1-1.8 5.5-1.8 7 0\"/>", "f2": "<circle cx=\"12\" cy=\"12\" r=\"9\" fill=\"none\"/><circle cx=\"9\" cy=\"10\" r=\"0.9\" fill=\"currentColor\"/><circle cx=\"15\" cy=\"10\" r=\"0.9\" fill=\"currentColor\"/><path d=\"M9 16c1-.8 5-.8 6 0\"/>", "f3": "<circle cx=\"12\" cy=\"12\" r=\"9\" fill=\"none\"/><circle cx=\"9\" cy=\"10\" r=\"0.9\" fill=\"currentColor\"/><circle cx=\"15\" cy=\"10\" r=\"0.9\" fill=\"currentColor\"/><path d=\"M9 15.5h6\"/>", "f4": "<circle cx=\"12\" cy=\"12\" r=\"9\" fill=\"none\"/><circle cx=\"9\" cy=\"10\" r=\"0.9\" fill=\"currentColor\"/><circle cx=\"15\" cy=\"10\" r=\"0.9\" fill=\"currentColor\"/><path d=\"M8.5 14.5c1.2 1.8 5.8 1.8 7 0\"/>", "f5": "<circle cx=\"12\" cy=\"12\" r=\"9\" fill=\"none\"/><circle cx=\"9\" cy=\"10\" r=\"0.9\" fill=\"currentColor\"/><circle cx=\"15\" cy=\"10\" r=\"0.9\" fill=\"currentColor\"/><path d=\"M8 14c1 3.4 7 3.4 8 0z\" fill=\"currentColor\"/>"};
const icon = (n, size = 24, sw = 1.8) => `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="flex:none">${PATHS[n]}</svg>`;
const face = (n, size = 26) => icon('f' + n, size, 1.7);
const FACE_NAMES = ['Очень плохо', 'Плохо', 'Нормально', 'Хорошо', 'Отлично'];
const MOODS = [1, 2, 3, 4, 5].map(n => face(n));
const LEVELS = ['1', '2', '3', '4', '5'];
const TAGS = ['работа', 'учёба', 'спорт', 'друзья', 'семья', 'прогулка', 'кофе', 'алкоголь', 'стресс', 'болит голова'];
const ACTS = [
  ['games', 'games', 'Игры'], ['musa', 'musa', 'Муса'], ['walk', 'walk', 'Прогулка'],
  ['sport', 'sport', 'Спорт'], ['social', 'social', 'Общение'], ['study', 'study', 'Учёба'],
  ['music', 'music', 'Музыка'], ['pc', 'pc', 'Компьютер'], ['work', 'work', 'Работа']
];
const ACT = Object.fromEntries(ACTS.map(a => [a[0], { icon: icon(a[1], 22), name: a[2] }]));
ACT.rest = { icon: icon('rest', 22), name: 'Отдых' }; // старые записи: показываем, но в выборе уже нет
const normActs = a => [...new Set((a || []).map(x => typeof x === 'string' ? x : x && x.type).filter(k => ACT[k]))];
const fmtDate = s => new Date(s + 'T00:00').toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' });
const fmtDateLong = s => new Date(s + 'T00:00').toLocaleDateString('ru-RU', { weekday: 'short', day: 'numeric', month: 'short' });
const fmtDT = ts => new Date(ts).toLocaleString('ru-RU', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
function icb(cls, name, size, label) { const b = document.createElement('button'); b.className = cls; b.innerHTML = icon(name, size); b.setAttribute('aria-label', label || 'Удалить'); return b; }
function h(tag, cls, text) { const e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; }

function toast(msg) {
  let t = $('.toast');
  if (!t) { t = document.createElement('div'); t.className = 'toast'; document.body.appendChild(t); }
  t.textContent = msg; t.classList.add('show');
  clearTimeout(t._h); t._h = setTimeout(() => t.classList.remove('show'), 1500);
}

/* ---------- IndexedDB ---------- */
let db;
function openDB() {
  return new Promise((res, rej) => {
    const r = indexedDB.open('tracker', 2);
    r.onupgradeneeded = e => {
      const d = r.result, o = e.oldVersion;
      if (o < 1) {
        d.createObjectStore('days', { keyPath: 'date' });
        d.createObjectStore('entries', { keyPath: 'id', autoIncrement: true }).createIndex('ts', 'ts');
      }
      if (o < 2) d.createObjectStore('tasks', { keyPath: 'id', autoIncrement: true });
    };
    r.onsuccess = () => { r.result.onversionchange = () => r.result.close(); res(r.result); };
    r.onerror = () => rej(r.error);
  });
}
function run(store, mode, fn) {
  return new Promise((res, rej) => {
    const t = db.transaction(store, mode);
    const q = fn(t.objectStore(store));
    t.oncomplete = () => res(q && q.result);
    t.onerror = () => rej(t.error);
  });
}
const defaultDay = date => ({ date, mood: null, energy: null, quality: null, bed: '', wake: '', tags: [], note: '', acts: [], tasks: {} });
const getDay = async date => { const d = Object.assign(defaultDay(date), await run('days', 'readonly', s => s.get(date)) || {}); d.acts = normActs(d.acts); return d; };
const putDay = d => run('days', 'readwrite', s => s.put(d));
const allDays = async () => (await run('days', 'readonly', s => s.getAll())).map(d => { const x = Object.assign(defaultDay(d.date), d); x.acts = normActs(x.acts); return x; });
const allEntries = () => run('entries', 'readonly', s => s.getAll());
const addEntry = e => run('entries', 'readwrite', s => s.add(e));
const delEntry = id => run('entries', 'readwrite', s => s.delete(id));
const allTasks = () => run('tasks', 'readonly', s => s.getAll());
const putTask = t => run('tasks', 'readwrite', s => s.put(t));
const delTask = id => run('tasks', 'readwrite', s => s.delete(id));

/* отложенное сохранение дня (чтобы не терять правки при смене вкладки) */
let pend = null, pendT = 0;
function queueSave(day) { pend = day; clearTimeout(pendT); pendT = setTimeout(flushSave, 350); }
async function flushSave() {
  clearTimeout(pendT);
  if (pend) { const d = pend; pend = null; await putDay(d); toast('Сохранено'); }
}

/* ---------- сон ---------- */
function sleepHours(d) {
  if (!d || !d.bed || !d.wake) return null;
  const [bh, bm] = d.bed.split(':').map(Number), [wh, wm] = d.wake.split(':').map(Number);
  let m = (wh * 60 + wm) - (bh * 60 + bm);
  if (m < 0) m += 1440;
  return m / 60;
}
const fmtH = h => h == null ? '—' : `${Math.floor(h)} ч ${String(Math.round((h % 1) * 60)).padStart(2, '0')} мин`;

/* ---------- компоненты ---------- */
function scale(container, value, labels, onPick, small) {
  container.innerHTML = '';
  container.className = 'scale';
  labels.forEach((l, i) => {
    const b = document.createElement('button');
    b.innerHTML = l;
    if (l.startsWith('<svg')) b.setAttribute('aria-label', FACE_NAMES[i]);
    if (small) b.className = 'sm';
    if (value === i + 1) b.classList.add('on');
    b.onclick = () => onPick(value === i + 1 ? null : i + 1);
    container.appendChild(b);
  });
}

/* ---------- экран: Сегодня ---------- */
let curDate = ymd(new Date());
let lastToday = curDate, curTab = 'today';
async function viewToday() {
  await flushSave();
  const v = $('#view');
  const day = await getDay(curDate);
  const todayStr = ymd(new Date());
  let pendingBed = null;
  if (curDate === todayStr) { const n = new Date(); n.setDate(n.getDate() + 1); const nx = await getDay(ymd(n)); if (nx.bed && !nx.wake) pendingBed = nx.bed; }
  v.innerHTML = `
    <h1>Daylog</h1>
    <div class="card"><label>Дата</label><input type="date" id="date" max="${ymd(new Date())}" value="${curDate}"><p class="muted" style="margin:6px 0 0;font-size:13px">${curDate === ymd(new Date()) ? 'Сегодня, ' : ''}${fmtDateLong(curDate)}</p></div>
    <div class="card"><h2>Настроение</h2><div id="mood"></div></div>
    <div class="card"><h2>Энергия</h2><div id="energy"></div></div>
    <div class="card">
      <h2>Сон</h2>
      <div class="row"><button class="sbtn" id="bedBtn" type="button"></button><button class="sbtn" id="wakeBtn" type="button"></button></div>
      <p class="muted" id="sleepHint" style="margin:8px 0 0;font-size:13px"></p>
      <p class="big" id="dur" style="margin:10px 0 4px"></p>
      <button class="now" id="editT" type="button">изменить время</button>
      <div class="row" id="timeRow" hidden style="margin-top:8px"><div><label>Лёг</label><input type="time" id="bed"></div><div><label>Встал</label><input type="time" id="wake"></div></div>
      <label style="margin-top:12px">Качество сна</label><div id="quality"></div>
    </div>
    <div class="card"><h2>Активности за день</h2><div class="acts" id="acts"></div></div>
    <div class="card"><h2>Заметка дня</h2><textarea id="note" placeholder="Коротко о дне"></textarea>
      <p class="muted" style="margin:6px 0 0;font-size:12px">Сохраняется в запись за ${fmtDate(curDate)}. Смотреть: Дневник → Дни</p></div>`;
  const save = () => queueSave(day);
  const draw = () => {
    scale($('#mood'), day.mood, MOODS, x => { day.mood = x; draw(); save(); });
    scale($('#energy'), day.energy, LEVELS, x => { day.energy = x; draw(); save(); }, true);
    scale($('#quality'), day.quality, LEVELS, x => { day.quality = x; draw(); save(); }, true);
    $('#dur').textContent = fmtH(sleepHours(day));
    [['#bedBtn', 'rest', 'Лёг', day.bed], ['#wakeBtn', 'today', 'Встал', day.wake]].forEach(([sel, ic, lb, tm]) => {
      const el = $(sel); el.className = 'sbtn' + (tm ? ' set' : ''); el.textContent = '';
      const sp = h('span'); sp.innerHTML = icon(ic, 20); sp.append(' ' + lb);
      el.append(sp, h('small', null, tm || 'нажми, чтобы отметить'));
    });
    const hr = new Date().getHours();
    $('#sleepHint').textContent = pendingBed ? `Сон начат в ${pendingBed}. Утром нажми «Встал»`
      : (curDate === todayStr && hr >= 18 ? 'Вечером «Лёг» записывается на ночь, которая закончится завтра' : '');
    drawActs();
  };
  const drawActs = () => {
    const grid = $('#acts'); grid.innerHTML = '';
    ACTS.forEach(([key, ico, name]) => {
      const b = h('button'); const ic = h('span', 'ic'); ic.innerHTML = icon(ico, 28); b.append(ic, h('span', 'nm', name));
      if (day.acts.includes(key)) b.classList.add('on');
      b.onclick = () => { day.acts = day.acts.includes(key) ? day.acts.filter(x => x !== key) : [...day.acts, key]; drawActs(); save(); };
      grid.appendChild(b);
    });
  };
  $('#bed').value = day.bed; $('#wake').value = day.wake; $('#note').value = day.note;
  $('#bed').onchange = e => { day.bed = e.target.value; draw(); save(); };
  $('#wake').onchange = e => { day.wake = e.target.value; draw(); save(); };
  const mark = async f => {
    const t = nowHM(), nd = new Date();
    if (f === 'bed' && curDate === ymd(nd) && nd.getHours() >= 18) {   // вечером «Лёг» -> ночь, которая закончится завтра
      await flushSave();
      const n = new Date(); n.setDate(n.getDate() + 1);
      const nx = await getDay(ymd(n)); nx.bed = t; await putDay(nx);
      toast('Лёг в ' + t + ' — запишется на завтра'); viewToday(); return;
    }
    day[f] = t; $('#' + f).value = t; draw(); save();
  };
  $('#bedBtn').onclick = () => mark('bed');
  $('#wakeBtn').onclick = () => mark('wake');
  $('#editT').onclick = () => { const r = $('#timeRow'); r.hidden = !r.hidden; };
  $('#note').oninput = e => { day.note = e.target.value; save(); };
  $('#date').onchange = e => { if (e.target.value) { curDate = e.target.value; viewToday(); } };
  draw();
}

/* ---------- экран: Задачи ---------- */
async function viewTasks() {
  await flushSave();
  const v = $('#view');
  const today = ymd(new Date());
  const [tasks, day] = await Promise.all([allTasks(), getDay(curDate)]);
  const stateOf = t => t.type === 'regular' ? (day.tasks[t.id] || 'open') : (t.state || 'open');
  const shown = tasks.filter(t => t.type === 'regular'
    ? (t.from <= curDate && (!t.end || curDate <= t.end))
    : (t.date === curDate || (stateOf(t) === 'open' && t.date < curDate && curDate === today)));
  const regular = shown.filter(t => t.type === 'regular'), once = shown.filter(t => t.type !== 'regular');
  const counted = shown.filter(t => stateOf(t) !== 'na');
  const done = counted.filter(t => stateOf(t) === 'done').length;

  const setState = async (t, s) => {
    if (t.type === 'regular') { if (s === 'open') delete day.tasks[t.id]; else day.tasks[t.id] = s; await putDay(day); }
    else { t.state = s; await putTask(t); }
    viewTasks();
  };
  const rowEl = t => {
    const s = stateOf(t);
    const r = h('div', 'task ' + s);
    const ck = h('button', 'ck'); ck.innerHTML = s === 'done' ? icon('check', 18, 2.4) : s === 'na' ? '–' : ''; ck.setAttribute('aria-label', 'Отметить выполненной');
    ck.onclick = () => setState(t, s === 'done' ? 'open' : 'done');
    const title = h('span', 'tt', t.title);
    r.append(ck, title);
    if (t.type !== 'regular' && t.date < curDate) r.appendChild(h('span', 'late', 'с ' + fmtDate(t.date)));
    const na = h('button', 'na', s === 'na' ? 'вернуть' : 'не нужно');
    na.onclick = () => setState(t, s === 'na' ? 'open' : 'na');
    r.appendChild(na);
    if (t.type !== 'regular') {
      const del = icb('del', 'x', 16);
      del.onclick = async () => { if (confirm('Удалить задачу?')) { await delTask(t.id); viewTasks(); } };
      r.appendChild(del);
    }
    return r;
  };

  v.innerHTML = `<h1>Задачи</h1>
    <div class="datenav"><button id="prev" aria-label="Предыдущий день">${icon('prev', 24, 2)}</button><span id="dl"></span><button id="next" aria-label="Следующий день">${icon('next', 24, 2)}</button></div>
    <div class="card" id="sumc"></div>
    <div class="card" id="reg"><h2>Регулярные</h2></div>
    <div class="card" id="one"><h2>Разовые</h2></div>
    <div class="card"><h2>Новая задача</h2>
      <input type="text" id="tt" class="txt" placeholder="Что нужно сделать?">
      <div class="seg" style="margin:8px 0" id="kind"><button data-k="regular" class="on">Каждый день</button><button data-k="once">Разовая</button></div>
      <button class="btn" id="add">Добавить</button></div>
    <div class="card" id="mng"><h2>Управление регулярными</h2></div>`;
  $('#dl').textContent = curDate === today ? 'Сегодня, ' + fmtDate(curDate) : fmtDateLong(curDate);
  $('#next').disabled = curDate >= today;
  const shift = n => { const d = new Date(curDate + 'T00:00'); d.setDate(d.getDate() + n); curDate = ymd(d); viewTasks(); };
  $('#prev').onclick = () => shift(-1); $('#next').onclick = () => shift(1);
  $('#sumc').innerHTML = counted.length
    ? `<div class="big">${done} из ${counted.length}</div><div class="bar"><i style="width:${Math.round(done / counted.length * 100)}%"></i></div>`
    : '<span class="muted">Задач на этот день нет</span>';
  const fill = (el, list) => { if (list.length) list.forEach(t => el.appendChild(rowEl(t))); else el.appendChild(h('p', 'muted', 'Пусто')); };
  fill($('#reg'), regular); fill($('#one'), once);

  let kind = 'regular';
  $('#kind').onclick = e => { const k = e.target.dataset.k; if (!k) return; kind = k; document.querySelectorAll('#kind button').forEach(b => b.classList.toggle('on', b.dataset.k === k)); };
  const add = async () => {
    const title = $('#tt').value.trim(); if (!title) return;
    await putTask(kind === 'regular' ? { type: 'regular', title, from: curDate, end: null } : { type: 'once', title, date: curDate, state: 'open' });
    viewTasks();
  };
  $('#add').onclick = add;
  $('#tt').onkeydown = e => { if (e.key === 'Enter') add(); };

  const mng = $('#mng'), regAll = tasks.filter(t => t.type === 'regular');
  if (!regAll.length) mng.appendChild(h('p', 'muted', 'Пока нет'));
  regAll.forEach(t => {
    const on = !t.end || t.end >= today;
    const r = h('div', 'mrow' + (on ? '' : ' off'));
    r.append(h('span', 'tt', t.title), h('span', 'muted', on ? 'вкл' : 'выкл с ' + fmtDate(t.end)));
    const sw = h('button', 'sw' + (on ? ' on' : ''), on ? 'Выключить' : 'Включить');
    sw.onclick = async () => { t.end = on ? today : null; await putTask(t); viewTasks(); };
    const del = icb('del', 'x', 16);
    del.onclick = async () => { if (confirm('Удалить задачу совсем?')) { await delTask(t.id); viewTasks(); } };
    r.append(sw, del); mng.appendChild(r);
  });
  mng.appendChild(h('p', 'muted small', 'Выключенная задача перестаёт показываться со следующего дня, история сохраняется.'));
}

/* ---------- экран: Дневник ---------- */
let diaryMode = 'entries';
async function viewDiary() {
  await flushSave();
  const v = $('#view');
  v.innerHTML = `<h1>Дневник</h1>
    <div class="seg" id="dm"><button data-m="entries" class="${diaryMode === 'entries' ? 'on' : ''}">Записи</button><button data-m="days" class="${diaryMode === 'days' ? 'on' : ''}">Дни</button></div>
    <div id="dbody"></div>`;
  $('#dm').onclick = e => { const m = e.target.dataset.m; if (m) { diaryMode = m; viewDiary(); } };
  (diaryMode === 'entries' ? diaryEntries : diaryDays)($('#dbody'));
}
async function diaryEntries(box) {
  box.innerHTML = `<div class="card"><textarea id="txt" placeholder="О чём думаешь?"></textarea><button class="btn" id="add" style="margin-top:8px">Добавить запись</button></div>
    <div class="card" id="list"></div>`;
  const list = $('#list');
  const render = async () => {
    const es = (await allEntries()).sort((a, b) => b.ts - a.ts);
    list.innerHTML = es.length ? '' : '<p class="muted" style="margin:0">Пока пусто</p>';
    es.forEach(e => {
      const d = h('div', 'entry');
      const meta = h('div', 'meta');
      const del = icb('del', 'x', 16);
      del.onclick = async () => { if (confirm('Удалить запись?')) { await delEntry(e.id); render(); } };
      meta.append(h('span', null, fmtDT(e.ts)), del);
      d.append(meta, h('p', null, e.text)); list.appendChild(d);
    });
  };
  $('#add').onclick = async () => {
    const text = $('#txt').value.trim(); if (!text) return;
    await addEntry({ ts: Date.now(), text }); $('#txt').value = ''; toast('Добавлено'); render();
  };
  render();
}
async function diaryDays(box) {
  const [days, tasks] = await Promise.all([allDays(), allTasks()]);
  const rows = days.filter(d => d.mood || d.energy || d.note || d.acts.length || d.tags.length || sleepHours(d) != null || Object.keys(d.tasks).length)
    .sort((a, b) => b.date < a.date ? -1 : 1);
  if (!rows.length) { box.innerHTML = '<div class="card"><p class="muted" style="margin:0">Пока нет заполненных дней</p></div>'; return; }
  rows.forEach(d => {
    const c = h('div', 'card day');
    const head = h('div', 'dh');
    const hr = h('span', 'dhr'); hr.innerHTML = (d.mood ? `<span class="hi">${face(d.mood, 24)}</span>` : '') + (sleepHours(d) != null ? `<span>${icon('rest', 18)} ${fmtH(sleepHours(d))}</span>` : '');
    head.append(h('b', null, fmtDateLong(d.date)), hr);
    c.appendChild(head);
    if (d.acts.length) {
      const da = h('div', 'dacts'); da.innerHTML = d.acts.map(k => `<span title="${ACT[k].name}">${ACT[k].icon}</span>`).join(''); c.appendChild(da);
    }
    const nd = Object.values(d.tasks).filter(x => x === 'done').length + tasks.filter(t => t.type !== 'regular' && t.date === d.date && t.state === 'done').length;
    if (nd) c.appendChild(h('div', 'muted', 'Выполнено задач: ' + nd));
    if (d.tags.length) c.appendChild(h('div', 'muted', d.tags.join(' · ')));
    if (d.note) c.appendChild(h('p', 'dnote', d.note));
    c.onclick = () => { curDate = d.date; go('today'); };
    box.appendChild(c);
  });
}

/* ---------- экран: Статистика ---------- */
let range = 14;
function chart(points, n, min, max, kind, fmtLabel) {
  const W = 320, H = 130, L = 22, B = 16, T = 6, R = 6;
  const pw = W - L - R, ph = H - B - T;
  const x = i => L + (n === 1 ? pw / 2 : (i * pw) / (n - 1));
  const y = v => T + ph - ((v - min) / (max - min)) * ph;
  let s = `<svg viewBox="0 0 ${W} ${H}">`;
  const steps = kind === 'bar' ? 4 : max - min;
  for (let i = 0; i <= steps; i++) {
    const val = min + ((max - min) * i) / steps;
    s += `<line class="grid" x1="${L}" x2="${W - R}" y1="${y(val)}" y2="${y(val)}"/><text x="${L - 4}" y="${y(val) + 3}" text-anchor="end">${Math.round(val)}</text>`;
  }
  if (kind === 'bar') {
    const bw = Math.max(2, (pw / n) * 0.7);
    points.forEach((v, i) => { if (v != null) { const xx = L + ((i + .5) * pw) / n - bw / 2; s += `<rect class="bar" x="${xx}" y="${y(Math.min(v, max))}" width="${bw}" height="${y(min) - y(Math.min(v, max))}" rx="2"/>`; } });
  } else {
    let path = '', pen = false;
    points.forEach((v, i) => { if (v == null) { pen = false; return; } path += `${pen ? 'L' : 'M'}${x(i)} ${y(v)} `; pen = true; });
    s += `<path class="ln" d="${path}"/>`;
    points.forEach((v, i) => { if (v != null) s += `<circle class="dot" cx="${x(i)}" cy="${y(v)}" r="2.5"/>`; });
  }
  s += `<text x="${L}" y="${H - 3}">${fmtLabel(0)}</text><text x="${W - R}" y="${H - 3}" text-anchor="end">${fmtLabel(n - 1)}</text></svg>`;
  return s;
}
async function viewStats() {
  await flushSave();
  const v = $('#view');
  const days = await allDays(); const map = Object.fromEntries(days.map(d => [d.date, d]));
  const dates = []; for (let i = range - 1; i >= 0; i--) { const d = new Date(); d.setDate(d.getDate() - i); dates.push(ymd(d)); }
  const rows = dates.map(k => map[k]);
  const avg = a => { const f = a.filter(x => x != null); return f.length ? f.reduce((p, c) => p + c, 0) / f.length : null; };
  const mood = rows.map(r => r && r.mood), energy = rows.map(r => r && r.energy), sleep = rows.map(sleepHours), qual = rows.map(r => r && r.quality);
  const f1 = x => x == null ? '—' : x.toFixed(1);
  const actMin = {}; rows.forEach(r => r && r.acts.forEach(k => { actMin[k] = actMin[k] || { n: 0 }; actMin[k].n++; }));
  const actHtml = Object.entries(actMin).sort((a, b) => b[1].n - a[1].n)
    .map(([k, o]) => `<div class="arow"><span>${ACT[k].icon} ${ACT[k].name}</span><span class="muted">${o.n} дн.</span></div>`).join('') || '<p class="muted" style="margin:0">Нет данных</p>';
  v.innerHTML = `<h1>Статистика</h1>
    <div class="seg" id="seg">${[7, 14, 30, 90].map(n => `<button data-n="${n}" class="${n === range ? 'on' : ''}">${n} дн</button>`).join('')}</div>
    <div class="stats">
      <div class="card"><div class="muted">Настроение</div><div class="big">${f1(avg(mood))}</div></div>
      <div class="card"><div class="muted">Энергия</div><div class="big">${f1(avg(energy))}</div></div>
      <div class="card"><div class="muted">Сон, в среднем</div><div class="big">${fmtH(avg(sleep))}</div></div>
      <div class="card"><div class="muted">Качество сна</div><div class="big">${f1(avg(qual))}</div></div>
    </div>
    <div class="card"><h2>Настроение</h2>${chart(mood, range, 1, 5, 'line', i => fmtDate(dates[i]))}</div>
    <div class="card"><h2>Энергия</h2>${chart(energy, range, 1, 5, 'line', i => fmtDate(dates[i]))}</div>
    <div class="card"><h2>Сон, часы</h2>${chart(sleep, range, 0, 12, 'bar', i => fmtDate(dates[i]))}</div>
    <div class="card"><h2>Активности</h2>${actHtml}</div>`;
  $('#seg').onclick = e => { const n = e.target.dataset.n; if (n) { range = +n; viewStats(); } };
}

/* ---------- экран: Ещё (экспорт/импорт) ---------- */
async function viewSettings() {
  await flushSave();
  const v = $('#view');
  const persisted = navigator.storage && navigator.storage.persisted ? await navigator.storage.persisted() : false;
  v.innerHTML = `<h1>Данные</h1>
    <div class="card"><p class="muted" style="margin-top:0">Всё хранится только на этом устройстве. Делай резервную копию — если очистить данные Safari, записи пропадут.</p>
      <p class="muted">Постоянное хранилище: ${persisted ? 'включено' : 'не гарантировано (добавь на экран «Домой»)'}</p>
      <button class="btn" id="exp">Экспорт в JSON</button>
      <button class="btn sec" id="imp">Импорт из JSON</button>
      <input type="file" id="file" accept="application/json,.json" hidden>
    </div>
    <div class="card"><button class="btn danger" id="wipe">Удалить все данные</button></div>`;
  $('#exp').onclick = async () => {
    const data = { v: 2, exported: new Date().toISOString(), days: await allDays(), entries: await allEntries(), tasks: await allTasks() };
    const blob = new Blob([JSON.stringify(data, null, 1)], { type: 'application/json' });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = `tracker-${ymd(new Date())}.json`;
    document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 5000);
  };
  $('#imp').onclick = () => $('#file').click();
  $('#file').onchange = async e => {
    const f = e.target.files[0]; if (!f) return;
    try {
      const d = JSON.parse(await f.text());
      if (!Array.isArray(d.days) || !Array.isArray(d.entries)) throw 0;
      if (!confirm('Объединить с текущими данными? Дни и задачи с одинаковым номером будут перезаписаны.')) return;
      for (const x of d.days) await putDay(x);
      for (const x of d.entries) { delete x.id; await addEntry(x); }
      for (const x of (d.tasks || [])) await putTask(x);
      toast('Импортировано');
    } catch { alert('Не получилось прочитать файл'); }
  };
  $('#wipe').onclick = async () => {
    if (!confirm('Удалить всё без возможности восстановления?')) return;
    for (const s of ['days', 'entries', 'tasks']) await run(s, 'readwrite', st => st.clear());
    toast('Удалено');
  };
}

/* ---------- запуск ---------- */
const views = { today: viewToday, tasks: viewTasks, diary: viewDiary, stats: viewStats, settings: viewSettings };
function go(tab) {
  curTab = tab;
  document.querySelectorAll('#tabs button').forEach(b => b.classList.toggle('on', b.dataset.tab === tab));
  views[tab](); window.scrollTo(0, 0);
}
(async () => {
  db = await openDB();
  if (navigator.storage && navigator.storage.persist) navigator.storage.persist();
  $('#tabs').onclick = e => { const b = e.target.closest('button'); if (b) go(b.dataset.tab); };
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) { flushSave(); return; }
    const t = ymd(new Date());
    if (t !== lastToday) {            // наступил новый день, пока приложение было в фоне
      if (curDate === lastToday) { curDate = t; go(curTab); }
      lastToday = t;
    }
  });
  go('today');
  if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js');
})();
