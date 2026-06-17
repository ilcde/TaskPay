const API = '/api';
const app = document.querySelector('#app');
const modalRoot = document.querySelector('#modal-root');
const toastRoot = document.querySelector('#toast-root');

const state = {
  view: new URLSearchParams(location.search).get('view') || 'today',
  filter: 'today',
  search: '',
  selectedMonth: monthKey(new Date()),
  scheduleMonth: monthKey(new Date()),
  tasks: [],
  categories: [],
  workDays: [],
  reportSummaries: [],
  appSettings: {},
  salarySettings: {},
  summary: null
};

const i18n = {
  vi: {
    subtitle: 'Công việc và lương với Spring Boot',
    local: 'Backend local H2 database',
    Today: 'Hôm nay', Schedule: 'Lịch', Salary: 'Lương', Reports: 'Báo cáo', Settings: 'Cài đặt',
    AddTask: 'Thêm việc', Reminders: 'Nhắc nhở', Search: 'Tìm việc',
    greetingMorning: 'Chào buổi sáng', greetingAfternoon: 'Chào buổi chiều', greetingEvening: 'Chào buổi tối',
    heroTitle: 'Quản lý việc và tính lương trong một nơi.',
    heroText: 'Dữ liệu được lưu trong Spring Boot backend local, dễ chạy trên máy và đưa lên GitHub.',
    dueToday: 'Đến hạn hôm nay', overdue: 'Quá hạn', workedDays: 'Ngày công', progress: 'Tiến độ hôm nay',
    completedToday: '{count} việc đã xong hôm nay', estimatedIncome: 'Thu nhập ước tính', hours: 'giờ',
    Upcoming: 'Sắp tới', Completed: 'Đã xong', High: 'Cao', Medium: 'Vừa', Low: 'Thấp',
    noOverdue: 'Không có việc quá hạn.', noToday: 'Không có việc đến hạn hôm nay.', noUpcoming: 'Không có việc sắp tới.', noMatch: 'Không có dữ liệu phù hợp.',
    items: '{count} mục', noDue: 'Chưa có hạn', edit: 'Sửa', delete: 'Xóa', complete: 'Hoàn thành', incomplete: 'Đánh dấu chưa xong',
    previous: 'Tháng trước', next: 'Tháng sau', taskCount: '{count} việc',
    Hours: 'Giờ', Bonus: 'Thưởng', Estimated: 'Ước tính', Breakdown: 'Chi tiết', TodayWorked: 'Hôm nay đi làm',
    Calculation: 'Cách tính', AbsentDays: 'Ngày vắng', PaidLeave: 'Nghỉ có lương', UnpaidLeave: 'Nghỉ không lương',
    Overtime: 'Tăng ca', Average: 'Trung bình/ngày công', Worked: 'Đi làm', NotSet: 'Chưa đặt', Note: 'Ghi chú',
    MonthlySummary: 'Tổng kết tháng', Copy: 'Sao chép', ThisMonth: 'Tháng này', PreviousMonth: 'Tháng trước', Change: 'Thay đổi', CurrentMonth: 'Tháng hiện tại', TotalHours: 'Tổng giờ', TotalBonus: 'Tổng thưởng', FinalEstimate: 'Ước tính cuối',
    Appearance: 'Giao diện', Language: 'Ngôn ngữ', Theme: 'Chế độ giao diện', System: 'Theo hệ thống', Light: 'Sáng', Dark: 'Tối',
    Background: 'Nền', SoftGradient: 'Chuyển màu dịu', Minimal: 'Màu đơn tối giản', CalmBlue: 'Xanh dịu', WarmOrange: 'Cam ấm', DarkPremium: 'Tối cao cấp', CustomColor: 'Màu tự chọn', SaveAppearance: 'Lưu giao diện',
    Sound: 'Âm nhắc', Gentle: 'Chuông nhẹ', Bright: 'Ping sáng', Warm: 'Chuông ấm', Silent: 'Im lặng', NotificationsEnabled: 'Bật thông báo', Vibration: 'Rung', VibrationOnly: 'Chỉ rung', DailyTimes: 'Giờ nhắc mỗi ngày', SaveReminders: 'Lưu nhắc nhở', Permission: 'Quyền thông báo',
    SalarySettings: 'Thiết lập lương mặc định', Currency: 'Tiền tệ', Mode: 'Cách tính', MonthlyBase: 'Lương tháng cố định', DailyPay: 'Tiền công/ngày', DefaultHours: 'Giờ mặc định/ngày', OvertimeRate: 'Lương tăng ca/giờ', MonthStart: 'Ngày bắt đầu tháng', OptionalNote: 'Ghi chú tùy chọn', SaveSalary: 'Lưu lương',
    fixed: 'Lương tháng cố định', daily: 'Lương theo ngày', hourly: 'Lương theo giờ', mixed: 'Tính kết hợp',
    Storage: 'Lưu trữ & dọn dẹp', CleanupMonths: 'Dọn việc đã xong cũ hơn số tháng', Cleanup: 'Dọn việc cũ', Reset: 'Xóa dữ liệu', SaveCleanup: 'Lưu dọn dẹp', About: 'Giới thiệu',
    AboutText: 'TaskPay bản Spring Boot. Không login, không tracking. Dữ liệu lưu trong H2 file database.',
    Title: 'Tiêu đề', Notes: 'Ghi chú', DueDate: 'Ngày đến hạn', ReminderTime: 'Giờ nhắc', Repeat: 'Lặp lại', Priority: 'Ưu tiên', Category: 'Danh mục', NewCategory: 'Danh mục mới', Optional: 'Tùy chọn', Color: 'Màu', CustomDays: 'Ngày lặp tùy chọn', Cancel: 'Hủy', Save: 'Lưu', Create: 'Tạo',
    none: 'Không lặp', dailyRepeat: 'Hằng ngày', weekdays: 'Ngày trong tuần', weekly: 'Hằng tuần', monthly: 'Hằng tháng', customDays: 'Ngày tự chọn',
    WorkDay: 'Ngày công', HoursWorked: 'Giờ đã làm', OvertimeHours: 'Giờ tăng ca', BonusAmount: 'Tiền thưởng', WorkSaved: 'Đã lưu ngày công.', TaskSaved: 'Đã lưu công việc.', TaskDeleted: 'Đã xóa công việc.', SettingsSaved: 'Đã lưu cài đặt.', Copied: 'Đã sao chép.', ConfirmDelete: 'Xóa việc này?', ConfirmReset: 'Nhập RESET TASKPAY để xóa dữ liệu.',
    NotifyGranted: 'Đã bật thông báo.', NotifyDenied: 'Chưa được cấp quyền thông báo.', TaskReminder: 'Nhắc việc', Morning: 'Nhắc buổi sáng', Afternoon: 'Nhắc buổi chiều', Evening: 'Nhắc buổi tối',
    Sun: 'CN', Mon: 'T2', Tue: 'T3', Wed: 'T4', Thu: 'T5', Fri: 'T6', Sat: 'T7'
  },
  en: {
    subtitle: 'Tasks and salary with Spring Boot',
    local: 'Backend local H2 database',
    Today: 'Today', Schedule: 'Schedule', Salary: 'Salary', Reports: 'Reports', Settings: 'Settings',
    AddTask: 'Add task', Reminders: 'Reminders', Search: 'Search tasks',
    greetingMorning: 'Good morning', greetingAfternoon: 'Good afternoon', greetingEvening: 'Good evening',
    heroTitle: 'Manage tasks and salary in one place.',
    heroText: 'Data is stored in the local Spring Boot backend, easy to run locally and publish on GitHub.',
    dueToday: 'Due today', overdue: 'Overdue', workedDays: 'Worked days', progress: 'Today progress',
    completedToday: '{count} completed today', estimatedIncome: 'Estimated income', hours: 'hours',
    Upcoming: 'Upcoming', Completed: 'Completed', High: 'High', Medium: 'Medium', Low: 'Low',
    noOverdue: 'No overdue tasks.', noToday: 'No tasks due today.', noUpcoming: 'No upcoming tasks.', noMatch: 'No matching data.',
    items: '{count} items', noDue: 'No due date', edit: 'Edit', delete: 'Delete', complete: 'Complete task', incomplete: 'Mark incomplete',
    previous: 'Previous month', next: 'Next month', taskCount: '{count} tasks',
    Hours: 'Hours', Bonus: 'Bonus', Estimated: 'Estimated', Breakdown: 'Breakdown', TodayWorked: 'Today worked',
    Calculation: 'Calculation', AbsentDays: 'Absent days', PaidLeave: 'Paid leave', UnpaidLeave: 'Unpaid leave',
    Overtime: 'Overtime', Average: 'Average/worked day', Worked: 'Worked', NotSet: 'Not set', Note: 'Note',
    MonthlySummary: 'Monthly summary', Copy: 'Copy', ThisMonth: 'This month', PreviousMonth: 'Previous month', Change: 'Change', CurrentMonth: 'Current month', TotalHours: 'Total hours', TotalBonus: 'Total bonus', FinalEstimate: 'Final estimate',
    Appearance: 'Appearance', Language: 'Language', Theme: 'Theme mode', System: 'System', Light: 'Light', Dark: 'Dark',
    Background: 'Background', SoftGradient: 'Soft gradient', Minimal: 'Minimal solid color', CalmBlue: 'Calm blue', WarmOrange: 'Warm orange', DarkPremium: 'Dark premium', CustomColor: 'Custom color', SaveAppearance: 'Save appearance',
    Sound: 'Reminder sound', Gentle: 'Gentle chime', Bright: 'Bright ping', Warm: 'Warm bell', Silent: 'Silent', NotificationsEnabled: 'Notifications enabled', Vibration: 'Vibration', VibrationOnly: 'Vibration only', DailyTimes: 'Daily reminder times', SaveReminders: 'Save reminders', Permission: 'Permission',
    SalarySettings: 'Default Salary Settings', Currency: 'Currency', Mode: 'Calculation mode', MonthlyBase: 'Monthly base salary', DailyPay: 'Daily pay', DefaultHours: 'Default hours/day', OvertimeRate: 'Overtime hourly rate', MonthStart: 'Month start day', OptionalNote: 'Optional note', SaveSalary: 'Save salary',
    fixed: 'Fixed monthly salary', daily: 'Daily wage', hourly: 'Hourly wage', mixed: 'Mixed calculation',
    Storage: 'Storage & Cleanup', CleanupMonths: 'Clean completed tasks older than months', Cleanup: 'Clean old tasks', Reset: 'Delete data', SaveCleanup: 'Save cleanup', About: 'About',
    AboutText: 'TaskPay Spring Boot edition. No login, no tracking. Data is stored in an H2 file database.',
    Title: 'Title', Notes: 'Notes', DueDate: 'Due date', ReminderTime: 'Reminder time', Repeat: 'Repeat', Priority: 'Priority', Category: 'Category', NewCategory: 'New category', Optional: 'Optional', Color: 'Color', CustomDays: 'Custom repeat days', Cancel: 'Cancel', Save: 'Save', Create: 'Create',
    none: 'No repeat', dailyRepeat: 'Daily', weekdays: 'Weekdays', weekly: 'Weekly', monthly: 'Monthly', customDays: 'Custom days',
    WorkDay: 'Work day', HoursWorked: 'Hours worked', OvertimeHours: 'Overtime hours', BonusAmount: 'Bonus amount', WorkSaved: 'Work day saved.', TaskSaved: 'Task saved.', TaskDeleted: 'Task deleted.', SettingsSaved: 'Settings saved.', Copied: 'Copied.', ConfirmDelete: 'Delete this task?', ConfirmReset: 'Type RESET TASKPAY to delete data.',
    NotifyGranted: 'Notifications enabled.', NotifyDenied: 'Notification permission was not granted.', TaskReminder: 'Task reminder', Morning: 'Morning check-in', Afternoon: 'Afternoon check-in', Evening: 'Evening check-in',
    Sun: 'Sun', Mon: 'Mon', Tue: 'Tue', Wed: 'Wed', Thu: 'Thu', Fri: 'Fri', Sat: 'Sat'
  }
};

const nav = [
  ['today', 'Today'],
  ['schedule', 'Schedule'],
  ['salary', 'Salary'],
  ['reports', 'Reports'],
  ['settings', 'Settings']
];

init();

async function init() {
  if ('serviceWorker' in navigator) navigator.serviceWorker.register('/service-worker.js').catch(() => {});
  await loadAll();
  render();
  scheduleNotifications();
}

async function loadAll() {
  const [tasks, categories, appSettings, salarySettings] = await Promise.all([
    api('/tasks'),
    api('/categories'),
    api('/settings/app'),
    api('/settings/salary')
  ]);
  state.tasks = tasks;
  state.categories = categories;
  state.appSettings = normalizeAppSettings(appSettings);
  state.salarySettings = salarySettings;
  await loadMonth();
}

async function loadMonth() {
  const [workDays, summary] = await Promise.all([
    api(`/work-days?monthKey=${state.selectedMonth}`),
    api(`/reports/monthly?monthKey=${state.selectedMonth}`)
  ]);
  state.workDays = workDays;
  state.summary = summary;
}

async function api(path, options = {}) {
  const response = await fetch(`${API}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options
  });
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: response.statusText }));
    throw new Error(error.message || 'API error');
  }
  return response.status === 204 ? null : response.json();
}

function normalizeAppSettings(settings) {
  return {
    language: 'vi',
    themeMode: 'system',
    backgroundType: 'softGradient',
    customBackgroundColor: '#eaf7f2',
    reminderSound: 'gentle',
    notificationEnabled: true,
    vibrationEnabled: true,
    vibrationOnly: false,
    dailyReminderTimes: '08:00,13:00,19:00',
    storageCleanupMonths: 6,
    ...settings
  };
}

function tr(key, values = {}) {
  const lang = state.appSettings.language || 'vi';
  return (i18n[lang][key] || i18n.en[key] || key).replace(/\{(\w+)\}/g, (_, name) => values[name] ?? '');
}

function render() {
  applyTheme();
  app.innerHTML = `
    <aside class="sidebar">
      <div class="brand"><div class="brand-mark">TP</div><div><div class="brand-title">TaskPay</div><div class="brand-sub">${tr('subtitle')}</div></div></div>
      <nav class="nav">${nav.map(([view, label]) => navButton(view, label)).join('')}</nav>
      <div class="privacy">${tr('local')}</div>
    </aside>
    <main class="main"><div class="main-inner">${renderTopbar()}${renderView()}</div></main>
    <nav class="mobile-nav">${nav.map(([view, label]) => navButton(view, label)).join('')}</nav>
  `;
}

function navButton(view, label) {
  return `<button class="${state.view === view ? 'active' : ''}" data-action="nav" data-view="${view}"><span>${tr(label)}</span></button>`;
}

function renderTopbar() {
  return `
    <header class="topbar">
      <div><div class="kicker">TaskPay</div><h1>${tr(nav.find(([view]) => view === state.view)?.[1] || 'Today')}</h1><div class="muted">${formatDateLong(new Date())}</div></div>
      <div class="actions">
        <button class="button" data-action="notify">${tr('Reminders')}</button>
        <button class="button primary" data-action="task-new">${tr('AddTask')}</button>
      </div>
    </header>`;
}

function renderView() {
  if (state.view === 'schedule') return renderSchedule();
  if (state.view === 'salary') return renderSalary();
  if (state.view === 'reports') return renderReports();
  if (state.view === 'settings') return renderSettings();
  return renderToday();
}

function renderToday() {
  const today = isoDate(new Date());
  const active = state.tasks.filter((task) => !task.completed);
  const dueToday = active.filter((task) => task.dueDate === today);
  const overdue = active.filter((task) => task.dueDate && task.dueDate < today);
  const completedToday = state.tasks.filter((task) => task.completedAt?.slice(0, 10) === today).length;
  const total = dueToday.length + completedToday;
  const progress = total ? Math.round(completedToday / total * 100) : 0;
  return `
    <section class="dashboard">
      <div class="hero">
        <div class="kicker">${greeting()}</div>
        <h2>${tr('heroTitle')}</h2>
        <p class="muted">${tr('heroText')}</p>
        <div class="hero-stats">
          ${mini(dueToday.length, tr('dueToday'))}${mini(overdue.length, tr('overdue'))}${mini(state.summary?.workedDays || 0, tr('workedDays'))}${mini(state.tasks.length, 'Tasks')}
        </div>
      </div>
      <div class="metric"><div class="muted">${tr('progress')}</div><div class="metric-value">${progress}%</div><p>${tr('completedToday', { count: completedToday })}</p></div>
      <div class="metric"><div class="muted">${tr('estimatedIncome')}</div><div class="metric-value">${money(state.summary?.finalSalary || 0)}</div><p>${monthLabel(state.selectedMonth)} · ${state.summary?.totalHours || 0} ${tr('hours')}</p></div>
    </section>
    ${taskToolbar()}
    ${taskSections()}`;
}

function mini(value, label) {
  return `<div class="mini"><strong>${value}</strong><span>${label}</span></div>`;
}

function taskToolbar() {
  return `
    <section class="toolbar">
      <div class="chips">
        ${chip('today', tr('Today'))}${chip('upcoming', tr('Upcoming'))}${chip('overdue', tr('overdue'))}${chip('completed', tr('Completed'))}
        ${['high','medium','low'].map((p) => chip(`priority:${p}`, priorityLabel(p))).join('')}
        ${state.categories.slice(0, 4).map((c) => chip(`category:${c.id}`, categoryName(c))).join('')}
      </div>
      <input class="search" data-action="search" placeholder="${tr('Search')}" value="${escapeAttr(state.search)}" />
    </section>`;
}

function chip(filter, label) {
  return `<button class="chip ${state.filter === filter ? 'active' : ''}" data-action="filter" data-filter="${filter}">${label}</button>`;
}

function taskSections() {
  const query = state.search.trim().toLowerCase();
  if (!query && state.filter === 'today') {
    const today = isoDate(new Date());
    return [
      taskSection(tr('overdue'), filteredTasks('overdue'), tr('noOverdue')),
      taskSection(tr('Today'), filteredTasks('today'), tr('noToday')),
      taskSection(tr('Upcoming'), state.tasks.filter((task) => !task.completed && task.dueDate > today).slice(0, 6), tr('noUpcoming'))
    ].join('');
  }
  return taskSection(filterTitle(), filteredTasks(state.filter), tr('noMatch'));
}

function filteredTasks(filter) {
  const today = isoDate(new Date());
  const query = state.search.trim().toLowerCase();
  return state.tasks.filter((task) => {
    const category = categoryName(state.categories.find((item) => item.id === task.categoryId));
    const matches = !query || `${task.title} ${task.description || ''} ${category}`.toLowerCase().includes(query);
    if (!matches) return false;
    if (filter === 'today') return !task.completed && task.dueDate === today;
    if (filter === 'upcoming') return !task.completed && task.dueDate >= today;
    if (filter === 'overdue') return !task.completed && task.dueDate && task.dueDate < today;
    if (filter === 'completed') return task.completed;
    if (filter.startsWith('priority:')) return task.priority === filter.slice(9);
    if (filter.startsWith('category:')) return task.categoryId === filter.slice(9);
    return true;
  });
}

function taskSection(title, tasks, empty) {
  return `<section><div class="section-head"><h2>${title}</h2><span class="pill">${tr('items', { count: tasks.length })}</span></div>${tasks.length ? `<div class="task-list">${tasks.map(taskCard).join('')}</div>` : `<div class="empty">${empty}</div>`}</section>`;
}

function taskCard(task) {
  const category = state.categories.find((item) => item.id === task.categoryId);
  return `
    <article class="task-card ${task.completed ? 'completed' : ''}" style="--task-color:${task.color || category?.color || '#0f766e'}">
      <button class="check ${task.completed ? 'done' : ''}" title="${task.completed ? tr('incomplete') : tr('complete')}" data-action="task-toggle" data-id="${task.id}">${task.completed ? '✓' : ''}</button>
      <div><h3 class="task-title">${escapeHtml(task.title)}</h3>${task.description ? `<p class="muted">${escapeHtml(task.description)}</p>` : ''}
        <div class="task-meta"><span class="pill">${task.dueDate ? formatDateShort(task.dueDate) : tr('noDue')}${task.reminderTime ? ` · ${task.reminderTime.slice(0,5)}` : ''}</span><span class="pill ${task.priority}">${priorityLabel(task.priority)}</span>${category ? `<span class="pill">${categoryName(category)}</span>` : ''}${task.repeatRule && task.repeatRule !== 'none' ? `<span class="pill">${repeatLabel(task.repeatRule)}</span>` : ''}</div>
      </div>
      <div class="task-actions"><button class="icon-btn" data-action="task-edit" data-id="${task.id}">${tr('edit')}</button><button class="icon-btn" data-action="task-delete" data-id="${task.id}">${tr('delete')}</button></div>
    </article>`;
}

function renderSchedule() {
  const days = calendarDays(state.scheduleMonth);
  const taskMap = new Map();
  state.tasks.forEach((task) => {
    if (!task.dueDate) return;
    taskMap.set(task.dueDate, [...(taskMap.get(task.dueDate) || []), task]);
  });
  return `<section class="card"><div class="month-head"><button class="icon-btn" data-action="schedule-prev">‹</button><h2>${monthLabel(state.scheduleMonth)}</h2><button class="icon-btn" data-action="schedule-next">›</button></div><div class="calendar">${weekdays().map((d) => `<div class="weekday">${d}</div>`).join('')}${days.map((day) => {
    const tasks = taskMap.get(day.date) || [];
    return `<button class="day ${day.outside ? 'outside' : ''}" data-action="task-new" data-date="${day.date}"><div class="day-num"><span>${Number(day.date.slice(-2))}</span>${day.date === isoDate(new Date()) ? `<span class="pill">${tr('Today')}</span>` : ''}</div><div class="dots">${tasks.slice(0,5).map((task) => `<span class="dot" style="background:${task.color || '#0f766e'}"></span>`).join('')}</div><div class="day-detail">${tasks.length ? tr('taskCount', { count: tasks.length }) : ''}</div></button>`;
  }).join('')}</div></section>`;
}

function renderSalary() {
  const records = new Map(state.workDays.map((record) => [record.date, record]));
  const summary = state.summary || {};
  return `
    <section class="two-col">
      <div class="card"><div class="month-head"><button class="icon-btn" data-action="salary-prev">‹</button><h2>${monthLabel(state.selectedMonth)}</h2><button class="icon-btn" data-action="salary-next">›</button></div>
        <div class="summary-grid">${summaryCard(tr('workedDays'), summary.workedDays || 0)}${summaryCard(tr('Hours'), summary.totalHours || 0)}${summaryCard(tr('Bonus'), money(summary.totalBonus || 0))}${summaryCard(tr('Estimated'), money(summary.finalSalary || 0))}</div>
        <div class="salary-calendar">${weekdays().map((d) => `<div class="weekday">${d}</div>`).join('')}${monthDays(state.selectedMonth).map((date) => workDay(date, records.get(date))).join('')}</div>
      </div>
      <aside class="card"><div class="section-head"><h2>${tr('Breakdown')}</h2><button class="button" data-action="today-worked">${tr('TodayWorked')}</button></div>
        <ul class="breakdown">
          <li><span>${tr('Calculation')}</span><strong>${calculationLabel(summary.calculationLabel)}</strong></li>
          <li><span>${tr('AbsentDays')}</span><strong>${summary.absentDays || 0}</strong></li>
          <li><span>${tr('PaidLeave')}</span><strong>${summary.paidLeaveDays || 0}</strong></li>
          <li><span>${tr('Overtime')}</span><strong>${summary.overtimeHours || 0} h</strong></li>
          <li><span>${tr('Average')}</span><strong>${money(summary.averagePerWorkedDay || 0)}</strong></li>
          ${(summary.breakdown || []).map((line) => `<li><span>${calculationLabel(line.label)}</span><strong>${money(line.value)}</strong></li>`).join('')}
        </ul>
      </aside>
    </section>`;
}

function summaryCard(label, value) {
  return `<div class="summary"><span class="muted">${label}</span><strong>${value}</strong></div>`;
}

function workDay(date, record) {
  const cls = record?.worked ? 'worked' : record?.paidLeave ? 'leave' : record?.unpaidLeave ? 'absent' : '';
  const details = [];
  if (record?.worked) details.push(`${record.hoursWorked || 0} h`);
  if (record?.overtimeHours > 0) details.push(`OT ${record.overtimeHours} h`);
  if (record?.bonusAmount > 0) details.push(money(record.bonusAmount));
  if (record?.note) details.push(tr('Note'));
  const status = record?.worked ? tr('Worked') : record?.paidLeave ? tr('PaidLeave') : record?.unpaidLeave ? tr('UnpaidLeave') : tr('NotSet');
  return `<button class="work-day ${cls}" data-action="workday-edit" data-date="${date}"><div class="day-num"><span>${Number(date.slice(-2))}</span>${date === isoDate(new Date()) ? `<span class="pill">${tr('Today')}</span>` : ''}</div><div class="day-detail"><strong>${status}</strong>${details.map((d) => `<span>${d}</span>`).join('')}</div></button>`;
}

function renderReports() {
  const summaries = state.reportSummaries.length ? state.reportSummaries : [state.summary].filter(Boolean);
  const max = Math.max(1, ...summaries.map((s) => Number(s.finalSalary || 0)));
  const current = state.summary || {};
  const previous = summaries[1] || {};
  const delta = Number(current.finalSalary || 0) - Number(previous.finalSalary || 0);
  return `<section class="two-col"><div class="card"><div class="section-head"><h2>${tr('MonthlySummary')}</h2><button class="button" data-action="copy-report">${tr('Copy')}</button></div><div class="summary-grid">${summaryCard(tr('ThisMonth'), money(current.finalSalary || 0))}${summaryCard(tr('PreviousMonth'), money(previous.finalSalary || 0))}${summaryCard(tr('Change'), `${delta >= 0 ? '+' : ''}${money(delta)}`)}${summaryCard(tr('workedDays'), current.workedDays || 0)}</div>${summaries.map((s) => `<div class="bar-row"><strong>${monthLabel(s.monthKey)}</strong><div class="bar"><span style="width:${Math.max(2, Number(s.finalSalary || 0) / max * 100)}%"></span></div><span>${money(s.finalSalary || 0)}</span></div>`).join('')}</div><aside class="card"><h2>${tr('CurrentMonth')}</h2><ul class="breakdown"><li><span>${tr('workedDays')}</span><strong>${current.workedDays || 0}</strong></li><li><span>${tr('TotalHours')}</span><strong>${current.totalHours || 0}</strong></li><li><span>${tr('Overtime')}</span><strong>${current.overtimeHours || 0}</strong></li><li><span>${tr('TotalBonus')}</span><strong>${money(current.totalBonus || 0)}</strong></li><li><span>${tr('FinalEstimate')}</span><strong>${money(current.finalSalary || 0)}</strong></li></ul></aside></section>`;
}

function renderSettings() {
  const appSettings = state.appSettings;
  const salary = state.salarySettings;
  return `<section class="settings-grid">
    <form class="card" data-form="appearance"><h2>${tr('Appearance')}</h2><div class="field-grid">
      ${fieldSelect('language', tr('Language'), [['vi','Tiếng Việt'],['en','English']], appSettings.language)}
      ${fieldSelect('themeMode', tr('Theme'), [['system',tr('System')],['light',tr('Light')],['dark',tr('Dark')]], appSettings.themeMode)}
      ${fieldSelect('backgroundType', tr('Background'), [['softGradient',tr('SoftGradient')],['minimal',tr('Minimal')],['calmBlue',tr('CalmBlue')],['warmOrange',tr('WarmOrange')],['darkPremium',tr('DarkPremium')],['custom',tr('CustomColor')]], appSettings.backgroundType)}
      ${field('customBackgroundColor', tr('CustomColor'), 'color', appSettings.customBackgroundColor)}
    </div><div class="modal-actions"><button class="button primary">${tr('SaveAppearance')}</button></div></form>
    <form class="card" data-form="reminders"><h2>${tr('Reminders')}</h2><div class="field-grid">
      ${fieldSelect('reminderSound', tr('Sound'), [['gentle',tr('Gentle')],['bright',tr('Bright')],['warm',tr('Warm')],['silent',tr('Silent')]], appSettings.reminderSound)}
      ${check('notificationEnabled', tr('NotificationsEnabled'), appSettings.notificationEnabled)}${check('vibrationEnabled', tr('Vibration'), appSettings.vibrationEnabled)}${check('vibrationOnly', tr('VibrationOnly'), appSettings.vibrationOnly)}
      ${field('dailyReminderTimes', tr('DailyTimes'), 'text', appSettings.dailyReminderTimes || '')}
    </div><div class="modal-actions"><button type="button" class="button" data-action="notify">${tr('Permission')}</button><button class="button primary">${tr('SaveReminders')}</button></div></form>
    <form class="card" data-form="salary-settings"><h2>${tr('SalarySettings')}</h2><div class="field-grid">
      ${field('currency', tr('Currency'), 'text', salary.currency || 'VND')}
      ${fieldSelect('calculationMode', tr('Mode'), [['fixed',tr('fixed')],['daily',tr('daily')],['hourly',tr('hourly')],['mixed',tr('mixed')]], salary.calculationMode)}
      ${field('monthlyBaseSalary', tr('MonthlyBase'), 'number', salary.monthlyBaseSalary || 0)}
      ${field('defaultDailyPay', tr('DailyPay'), 'number', salary.defaultDailyPay || 0)}
      ${field('defaultWorkingHours', tr('DefaultHours'), 'number', salary.defaultWorkingHours || 8, '0.25')}
      ${field('overtimeHourlyRate', tr('OvertimeRate'), 'number', salary.overtimeHourlyRate || 0)}
      ${field('monthStartDay', tr('MonthStart'), 'number', salary.monthStartDay || 1)}
      <label class="field full"><span>${tr('OptionalNote')}</span><textarea name="note">${escapeHtml(salary.note || '')}</textarea></label>
    </div><div class="modal-actions"><button class="button primary">${tr('SaveSalary')}</button></div></form>
    <form class="card" data-form="storage"><h2>${tr('Storage')}</h2>${field('storageCleanupMonths', tr('CleanupMonths'), 'number', appSettings.storageCleanupMonths || 6)}<div class="modal-actions"><button type="button" class="button" data-action="cleanup">${tr('Cleanup')}</button><button type="button" class="button danger" data-action="reset-demo">${tr('Reset')}</button><button class="button primary">${tr('SaveCleanup')}</button></div></form>
    <div class="card"><h2>${tr('About')}</h2><p class="muted">${tr('AboutText')}</p><ul class="breakdown"><li><span>Backend</span><strong>Spring Boot</strong></li><li><span>Database</span><strong>H2 file</strong></li><li><span>Frontend</span><strong>PWA</strong></li></ul></div>
  </section>`;
}

function field(name, label, type, value, step = '1') {
  return `<label class="field"><span>${label}</span><input name="${name}" type="${type}" step="${step}" value="${escapeAttr(value ?? '')}" /></label>`;
}

function fieldSelect(name, label, options, value) {
  return `<label class="field"><span>${label}</span><select name="${name}">${options.map(([v,l]) => `<option value="${v}" ${String(v) === String(value) ? 'selected' : ''}>${l}</option>`).join('')}</select></label>`;
}

function check(name, label, checked) {
  return `<label class="check-row"><input name="${name}" type="checkbox" ${checked ? 'checked' : ''}/> ${label}</label>`;
}

document.addEventListener('click', async (event) => {
  const target = event.target.closest('[data-action]');
  if (!target) return;
  const action = target.dataset.action;
  try {
    if (action === 'nav') {
      state.view = target.dataset.view;
      history.replaceState(null, '', `?view=${state.view}`);
      if (state.view === 'reports') await loadReportSummaries();
      render();
    } else if (action === 'filter') {
      state.filter = target.dataset.filter;
      render();
    } else if (action === 'task-new') {
      openTaskModal(null, target.dataset.date);
    } else if (action === 'task-edit') {
      openTaskModal(state.tasks.find((task) => task.id === target.dataset.id));
    } else if (action === 'task-toggle') {
      await api(`/tasks/${target.dataset.id}/toggle`, { method: 'PATCH' });
      await loadAll();
      render();
    } else if (action === 'task-delete') {
      if (confirm(tr('ConfirmDelete'))) {
        await api(`/tasks/${target.dataset.id}`, { method: 'DELETE' });
        toast(tr('TaskDeleted'));
        await loadAll();
        render();
      }
    } else if (action === 'salary-prev') {
      state.selectedMonth = shiftMonth(state.selectedMonth, -1);
      await loadMonth();
      render();
    } else if (action === 'salary-next') {
      state.selectedMonth = shiftMonth(state.selectedMonth, 1);
      await loadMonth();
      render();
    } else if (action === 'schedule-prev') {
      state.scheduleMonth = shiftMonth(state.scheduleMonth, -1);
      render();
    } else if (action === 'schedule-next') {
      state.scheduleMonth = shiftMonth(state.scheduleMonth, 1);
      render();
    } else if (action === 'workday-edit') {
      openWorkDayModal(target.dataset.date);
    } else if (action === 'today-worked') {
      await saveWorkDay(isoDate(new Date()), { worked: true, hoursWorked: state.salarySettings.defaultWorkingHours || 8 });
    } else if (action === 'notify') {
      const ok = await requestNotifications();
      toast(ok ? tr('NotifyGranted') : tr('NotifyDenied'));
    } else if (action === 'cleanup') {
      const result = await api(`/tasks/completed?months=${state.appSettings.storageCleanupMonths || 6}`, { method: 'DELETE' });
      toast(`${result.deleted || 0} ${tr('Completed')}`);
      await loadAll();
      render();
    } else if (action === 'reset-demo') {
      const answer = prompt(tr('ConfirmReset'));
      if (answer === 'RESET TASKPAY') toast('Use H2 console or delete ./data to fully reset the backend database.');
    } else if (action === 'copy-report') {
      await navigator.clipboard.writeText(reportText());
      toast(tr('Copied'));
    } else if (action === 'modal-close') {
      closeModal();
    }
  } catch (error) {
    toast(error.message);
  }
});

document.addEventListener('input', (event) => {
  if (event.target.dataset.action === 'search') {
    state.search = event.target.value;
    render();
  }
});

document.addEventListener('submit', async (event) => {
  const form = event.target.closest('form');
  if (!form?.dataset.form) return;
  event.preventDefault();
  try {
    if (form.dataset.form === 'task') await submitTask(form);
    if (form.dataset.form === 'workday') await submitWorkDay(form);
    if (form.dataset.form === 'appearance') await saveAppSettings(form);
    if (form.dataset.form === 'reminders') await saveAppSettings(form);
    if (form.dataset.form === 'storage') await saveAppSettings(form);
    if (form.dataset.form === 'salary-settings') await saveSalarySettings(form);
  } catch (error) {
    toast(error.message);
  }
});

function openTaskModal(task = null, date = null) {
  const model = task || { title: '', description: '', dueDate: date || isoDate(new Date()), repeatRule: 'none', priority: 'medium', color: '#0f766e', reminderSound: state.appSettings.reminderSound || 'gentle' };
  openModal(task ? tr('edit') : tr('AddTask'), `<form data-form="task"><input type="hidden" name="id" value="${model.id || ''}"/><div class="field-grid">
    ${field('title', tr('Title'), 'text', model.title)}<label class="field full"><span>${tr('Notes')}</span><textarea name="description">${escapeHtml(model.description || '')}</textarea></label>
    ${field('dueDate', tr('DueDate'), 'date', model.dueDate || '')}${field('reminderTime', tr('ReminderTime'), 'time', (model.reminderTime || '').slice(0,5))}
    ${fieldSelect('repeatRule', tr('Repeat'), [['none',tr('none')],['daily',tr('dailyRepeat')],['weekdays',tr('weekdays')],['weekly',tr('weekly')],['monthly',tr('monthly')],['customDays',tr('customDays')]], model.repeatRule)}
    ${fieldSelect('priority', tr('Priority'), [['low',tr('Low')],['medium',tr('Medium')],['high',tr('High')]], model.priority)}
    ${fieldSelect('categoryId', tr('Category'), state.categories.map((c) => [c.id, categoryName(c)]), model.categoryId)}
    ${field('newCategory', tr('NewCategory'), 'text', '')}${field('color', tr('Color'), 'color', model.color || '#0f766e')}
    ${fieldSelect('reminderSound', tr('Sound'), [['gentle',tr('Gentle')],['bright',tr('Bright')],['warm',tr('Warm')],['silent',tr('Silent')]], model.reminderSound)}
  </div><div class="modal-actions"><button type="button" class="button" data-action="modal-close">${tr('Cancel')}</button><button class="button primary">${task ? tr('Save') : tr('Create')}</button></div></form>`);
}

async function submitTask(form) {
  const data = Object.fromEntries(new FormData(form));
  if (data.newCategory) {
    const category = await api('/categories', { method: 'POST', body: JSON.stringify({ name: data.newCategory, color: data.color }) });
    data.categoryId = category.id;
  }
  const body = {
    title: data.title,
    description: data.description,
    dueDate: data.dueDate || null,
    reminderTime: data.reminderTime || null,
    repeatRule: data.repeatRule,
    priority: data.priority,
    categoryId: data.categoryId,
    color: data.color,
    reminderSound: data.reminderSound
  };
  if (data.id) await api(`/tasks/${data.id}`, { method: 'PUT', body: JSON.stringify(body) });
  else await api('/tasks', { method: 'POST', body: JSON.stringify(body) });
  closeModal();
  toast(tr('TaskSaved'));
  await loadAll();
  render();
}

function openWorkDayModal(date) {
  const record = state.workDays.find((item) => item.date === date) || { worked: false, hoursWorked: state.salarySettings.defaultWorkingHours || 8, overtimeHours: 0, bonusAmount: 0, paidLeave: false, unpaidLeave: false, note: '' };
  openModal(`${tr('WorkDay')} · ${formatDateShort(date)}`, `<form data-form="workday" data-date="${date}"><div class="field-grid">
    ${check('worked', tr('Worked'), record.worked)}${check('paidLeave', tr('PaidLeave'), record.paidLeave)}${check('unpaidLeave', tr('UnpaidLeave'), record.unpaidLeave)}
    ${field('hoursWorked', tr('HoursWorked'), 'number', record.hoursWorked || 0, '0.25')}${field('overtimeHours', tr('OvertimeHours'), 'number', record.overtimeHours || 0, '0.25')}${field('bonusAmount', tr('BonusAmount'), 'number', record.bonusAmount || 0)}
    <label class="field full"><span>${tr('Note')}</span><textarea name="note">${escapeHtml(record.note || '')}</textarea></label>
  </div><div class="modal-actions"><button type="button" class="button" data-action="modal-close">${tr('Cancel')}</button><button class="button primary">${tr('Save')}</button></div></form>`);
}

async function submitWorkDay(form) {
  const data = new FormData(form);
  await saveWorkDay(form.dataset.date, {
    worked: data.get('worked') === 'on',
    paidLeave: data.get('paidLeave') === 'on',
    unpaidLeave: data.get('unpaidLeave') === 'on',
    hoursWorked: Number(data.get('hoursWorked') || 0),
    overtimeHours: Number(data.get('overtimeHours') || 0),
    bonusAmount: Number(data.get('bonusAmount') || 0),
    note: data.get('note') || ''
  });
}

async function saveWorkDay(date, body) {
  await api(`/work-days/${date}`, { method: 'PUT', body: JSON.stringify(body) });
  closeModal();
  toast(tr('WorkSaved'));
  state.selectedMonth = monthKey(new Date(date));
  await loadMonth();
  render();
}

async function saveAppSettings(form) {
  const data = new FormData(form);
  const next = { ...state.appSettings };
  for (const [key, value] of data.entries()) next[key] = value;
  ['notificationEnabled','vibrationEnabled','vibrationOnly'].forEach((key) => {
    if (form.querySelector(`[name="${key}"]`)) next[key] = data.get(key) === 'on';
  });
  if (next.storageCleanupMonths) next.storageCleanupMonths = Number(next.storageCleanupMonths);
  await api('/settings/app', { method: 'PUT', body: JSON.stringify(next) });
  toast(tr('SettingsSaved'));
  await loadAll();
  render();
}

async function saveSalarySettings(form) {
  const data = Object.fromEntries(new FormData(form));
  const body = {
    currency: data.currency || 'VND',
    calculationMode: data.calculationMode || 'daily',
    monthlyBaseSalary: Number(data.monthlyBaseSalary || 0),
    defaultDailyPay: Number(data.defaultDailyPay || 0),
    defaultWorkingHours: Number(data.defaultWorkingHours || 8),
    overtimeHourlyRate: Number(data.overtimeHourlyRate || 0),
    monthStartDay: Number(data.monthStartDay || 1),
    note: data.note || ''
  };
  await api('/settings/salary', { method: 'PUT', body: JSON.stringify(body) });
  toast(tr('SettingsSaved'));
  await loadAll();
  render();
}

async function loadReportSummaries() {
  const months = Array.from({ length: 6 }, (_, index) => shiftMonth(state.selectedMonth, -index));
  state.reportSummaries = await Promise.all(months.map((m) => api(`/reports/monthly?monthKey=${m}`)));
}

function reportText() {
  const s = state.summary || {};
  return [`TaskPay - ${monthLabel(s.monthKey || state.selectedMonth)}`, `${tr('workedDays')}: ${s.workedDays || 0}`, `${tr('TotalHours')}: ${s.totalHours || 0}`, `${tr('Overtime')}: ${s.overtimeHours || 0}`, `${tr('TotalBonus')}: ${money(s.totalBonus || 0)}`, `${tr('FinalEstimate')}: ${money(s.finalSalary || 0)}`].join('\n');
}

async function requestNotifications() {
  if (!('Notification' in window)) return false;
  return await Notification.requestPermission() === 'granted';
}

function scheduleNotifications() {
  if (!state.appSettings.notificationEnabled) return;
  const now = Date.now();
  [...taskReminderSchedules(), ...dailyReminderSchedules()].forEach((schedule) => {
    const delay = schedule.when.getTime() - now;
    if (delay >= 0 && delay < 14 * 24 * 60 * 60 * 1000) {
      setTimeout(() => showNotification(schedule.title, schedule.body), delay);
    }
  });
}

function taskReminderSchedules() {
  return state.tasks.filter((task) => !task.completed && task.dueDate && task.reminderTime).map((task) => ({
    when: new Date(`${task.dueDate}T${task.reminderTime}`),
    title: task.title,
    body: task.description || tr('TaskReminder')
  }));
}

function dailyReminderSchedules() {
  return String(state.appSettings.dailyReminderTimes || '').split(',').map((time) => time.trim()).filter(Boolean).map((time) => {
    const [hour, minute] = time.split(':').map(Number);
    const when = new Date();
    when.setHours(hour || 0, minute || 0, 0, 0);
    if (when < new Date()) when.setDate(when.getDate() + 1);
    return { when, title: hour < 12 ? tr('Morning') : hour < 17 ? tr('Afternoon') : tr('Evening'), body: tr('taskCount', { count: state.tasks.filter((t) => !t.completed).length }) };
  });
}

function showNotification(title, body) {
  toast(title);
  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification('TaskPay', { body: `${title}${body ? ` - ${body}` : ''}`, icon: '/icon.svg', silent: state.appSettings.reminderSound === 'silent' });
  }
}

function openModal(title, body) {
  modalRoot.innerHTML = `<div class="modal-backdrop"><section class="modal-panel"><div class="modal-head"><h2>${title}</h2><button class="icon-btn" data-action="modal-close">×</button></div><div class="modal-body">${body}</div></section></div>`;
  modalRoot.querySelector('input,select,textarea,button')?.focus();
}

function closeModal() { modalRoot.innerHTML = ''; }
function toast(message) {
  const node = document.createElement('div');
  node.className = 'toast';
  node.textContent = message;
  toastRoot.appendChild(node);
  setTimeout(() => node.remove(), 3300);
}

function applyTheme() {
  const mode = state.appSettings.themeMode || 'system';
  const dark = mode === 'dark' || (mode === 'system' && matchMedia('(prefers-color-scheme: dark)').matches);
  document.documentElement.dataset.theme = dark ? 'dark' : 'light';
  document.documentElement.lang = state.appSettings.language || 'vi';
  document.body.className = `bg-${state.appSettings.backgroundType || 'softGradient'}`;
  document.body.style.setProperty('--custom-bg', state.appSettings.customBackgroundColor || '#eaf7f2');
}

function categoryName(category) {
  if (!category) return '';
  const vi = { Work: 'Công việc', Personal: 'Cá nhân', Bills: 'Hóa đơn', Health: 'Sức khỏe' };
  const en = { 'Công việc': 'Work', 'Cá nhân': 'Personal', 'Hóa đơn': 'Bills', 'Sức khỏe': 'Health' };
  return state.appSettings.language === 'en' ? (en[category.name] || category.name) : (vi[category.name] || category.name);
}

function priorityLabel(value = 'medium') { return tr(value[0].toUpperCase() + value.slice(1)); }
function repeatLabel(value) {
  return ({ none: tr('none'), daily: tr('dailyRepeat'), weekdays: tr('weekdays'), weekly: tr('weekly'), monthly: tr('monthly'), customDays: tr('customDays') })[value] || tr('Repeat');
}
function calculationLabel(value = '') {
  return ({ 'Fixed monthly salary': tr('fixed'), 'Daily wage': tr('daily'), 'Hourly wage': tr('hourly'), 'Mixed salary + daily wage': tr('mixed'), Overtime: tr('Overtime'), Bonuses: tr('Bonus') })[value] || value;
}
function money(value) {
  return `${new Intl.NumberFormat(state.appSettings.language === 'en' ? 'en-US' : 'vi-VN', { maximumFractionDigits: (state.salarySettings.currency || 'VND') === 'VND' ? 0 : 2 }).format(Number(value || 0))} ${state.salarySettings.currency || 'VND'}`;
}
function monthLabel(key) {
  const [year, month] = key.split('-').map(Number);
  return new Intl.DateTimeFormat(state.appSettings.language === 'en' ? 'en-US' : 'vi-VN', { month: 'long', year: 'numeric' }).format(new Date(year, month - 1, 1));
}
function formatDateLong(date) {
  return new Intl.DateTimeFormat(state.appSettings.language === 'en' ? 'en-US' : 'vi-VN', { weekday: 'long', month: 'long', day: 'numeric' }).format(date);
}
function formatDateShort(value) {
  const [year, month, day] = value.split('-').map(Number);
  return new Intl.DateTimeFormat(state.appSettings.language === 'en' ? 'en-US' : 'vi-VN', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(year, month - 1, day));
}
function greeting() {
  const h = new Date().getHours();
  return h < 12 ? tr('greetingMorning') : h < 18 ? tr('greetingAfternoon') : tr('greetingEvening');
}
function weekdays() { return ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(tr); }
function isoDate(date) {
  return [date.getFullYear(), String(date.getMonth() + 1).padStart(2, '0'), String(date.getDate()).padStart(2, '0')].join('-');
}
function monthKey(date) { return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`; }
function monthDays(key) {
  const [year, month] = key.split('-').map(Number);
  const last = new Date(year, month, 0).getDate();
  return Array.from({ length: last }, (_, i) => isoDate(new Date(year, month - 1, i + 1)));
}
function calendarDays(key) {
  const [year, month] = key.split('-').map(Number);
  const first = new Date(year, month - 1, 1);
  const start = new Date(first);
  start.setDate(1 - first.getDay());
  return Array.from({ length: 42 }, (_, i) => {
    const date = new Date(start);
    date.setDate(start.getDate() + i);
    return { date: isoDate(date), outside: date.getMonth() !== month - 1 };
  });
}
function shiftMonth(key, delta) {
  const [year, month] = key.split('-').map(Number);
  return monthKey(new Date(year, month - 1 + delta, 1));
}
function filterTitle() {
  if (state.filter.startsWith('priority:')) return priorityLabel(state.filter.slice(9));
  if (state.filter.startsWith('category:')) return categoryName(state.categories.find((c) => c.id === state.filter.slice(9)));
  return tr({ today: 'Today', upcoming: 'Upcoming', overdue: 'overdue', completed: 'Completed' }[state.filter] || 'Today');
}
function escapeHtml(value) {
  return String(value ?? '').replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#039;');
}
function escapeAttr(value) { return escapeHtml(value); }
