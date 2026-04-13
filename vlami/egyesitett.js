//mini :3

const monthYearElement = document.getElementById("monthYear2");
const datesElement = document.getElementById("dates2");
const prevBtn = document.getElementById("prevBtn2");
const nextBtn = document.getElementById("nextBtn2");

let currentDate = new Date();

const updateCalendar = () => {
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);

    const totalDays = lastDay.getDate();

    let firstDayIndex = firstDay.getDay();
    if (firstDayIndex === 0) firstDayIndex = 7;
    firstDayIndex--;

    const monthYearString = currentDate.toLocaleString("default", {
        month: "long",
        year: "numeric",
    });

    monthYearElement.textContent = monthYearString;
    let datesHTML = "";

    for (let i = 0; i < firstDayIndex; i++) {
        const prevDate = new Date(currentYear, currentMonth, -i);
        datesHTML = `<div class="date inactive">${prevDate.getDate()}</div>` + datesHTML;
    }

    for (let i = 1; i <= totalDays; i++) {
        const date = new Date(currentYear, currentMonth, i);
        const activeClass = date.toDateString() === new Date().toDateString() ? "active" : "";
        datesHTML += `<div class="date ${activeClass}">${i}</div>`;
    }

  let nextDays = 7 - ((firstDayIndex + totalDays) % 7);
  if (nextDays === 7) nextDays = 0;

  for (let i = 1; i <= nextDays; i++) {
    datesHTML += `<div class="date inactive">${i}</div>`;
  }

  datesElement.innerHTML = datesHTML;
};

if (prevBtn) {
  prevBtn.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    updateCalendar();
  });
}

if (nextBtn) {
  nextBtn.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    updateCalendar();
  });
}

if (monthYearElement && datesElement) {
  updateCalendar();
}

//dark mode toggle

const toggle = document.getElementById("themeToggle");
const body = document.body;

// Betöltéskor nézzük meg, volt-e elmentett mód
if (localStorage.getItem("theme") === "dark") {
    body.classList.remove("lightmode");
    body.classList.add("darkmode");
    if (toggle) toggle.checked = true;
} else {
    body.classList.remove("darkmode");
    body.classList.add("lightmode");
}

if (toggle) {
    toggle.addEventListener("change", () => {
        if (toggle.checked) {
            body.classList.remove("lightmode");
            body.classList.add("darkmode");
            localStorage.setItem("theme", "dark");
        } else {
            body.classList.remove("darkmode");
            body.classList.add("lightmode");
            localStorage.setItem("theme", "light");
        }
    });
}

//nezetvalt

function nezetValtas(oldal, gomb) {
    window.location.href = oldal;
}

const nezetValaszto = document.getElementById("nezetValaszto");
const nezetBtn = document.getElementById("nezetBtn");

if (nezetValaszto && nezetBtn) {
    nezetBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        nezetValaszto.classList.toggle("open");
    });

    document.addEventListener("click", () => {
        nezetValaszto.classList.remove("open");
    });

    nezetValaszto.addEventListener("click", (e) => {
        e.stopPropagation();
    });
}



document.addEventListener('DOMContentLoaded', function() {
    const napNevek = ['Vasárnap', 'Hétfő', 'Kedd', 'Szerda', 'Csütörtök', 'Péntek', 'Szombat'];

// Aktuális hét hétfőjének megkeresése
    function getHetfoHetkezdet() {
        const ma = new Date();
        const nap = ma.getDay(); 
        const kulonbseg = nap === 0 ? -6 : 1 - nap;
        const hetfo = new Date(ma);
        hetfo.setDate(ma.getDate() + kulonbseg);
        return hetfo;
    }

// Fejléc generálása
    function generaljFejlec() {
        const hetFejlec = document.querySelector('.het-fejlec');
        if (!hetFejlec) return;

        hetFejlec.innerHTML = '<div class="ido-fejlec"></div>';

        const hetfo = getHetfoHetkezdet();

        for (let i = 0; i < 7; i++) {
            const aktualisNap = new Date(hetfo);
            aktualisNap.setDate(hetfo.getDate() + i);

            const napIndex = (i + 1) % 7;
            const napNev = napNevek[napIndex];
            const napSzam = aktualisNap.getDate();

            const napFejlec = document.createElement('div');
            napFejlec.className = 'nap-fejlec';
            napFejlec.innerHTML = `
                <div class="nap-nev">${napNev}</div>
                <div class="nap-szam">${napSzam}</div>
            `;

            hetFejlec.appendChild(napFejlec);
        }
    }

// Törzs generálása
    function generaljTorzs() {
        const hetTorzs = document.querySelector('.het-torzs');
        if (!hetTorzs) return;

        hetTorzs.querySelectorAll('.nap-oszlop').forEach(el => el.remove());

        for (let i = 0; i < 7; i++) {
            const napOszlop = document.createElement('div');
            napOszlop.className = 'nap-oszlop';
            for (let j = 0; j < 24; j++) {
                const oraSav = document.createElement('div');
                oraSav.className = 'ora-sav';
                napOszlop.appendChild(oraSav);
            }
            hetTorzs.appendChild(napOszlop);
        }
    }

    generaljFejlec();
    generaljTorzs();

//nézet váltó

    const hetiBtn = document.getElementById('hetiBtn');
    const haviBtn = document.getElementById('haviBtn');
    const hetiNezet = document.getElementById('hetiNezet');
    const haviNezet = document.getElementById('haviNezet');

    if (hetiBtn && haviBtn && hetiNezet && haviNezet) {
        hetiBtn.addEventListener('click', () => {
            hetiNezet.style.display = 'block';
            haviNezet.style.display = 'none';
            hetiBtn.classList.add('active');
            haviBtn.classList.remove('active');
        });

        haviBtn.addEventListener('click', () => {
            haviNezet.style.display = 'block';
            hetiNezet.style.display = 'none';
            haviBtn.classList.add('active');
            hetiBtn.classList.remove('active');
            generaljHonapRacs();
        });
    }

//havi

    function getHonapElsoNapja() {
        const ma = new Date();
        return new Date(ma.getFullYear(), ma.getMonth(), 1);
    }

    function getHonapUtolsoNapja() {
        const ma = new Date();
        return new Date(ma.getFullYear(), ma.getMonth() + 1, 0);
    }

    function getElozoHonapUtolsoNapja() {
        const ma = new Date();
        return new Date(ma.getFullYear(), ma.getMonth(), 0);
    }

    function generaljHonapRacs() {
        const honapRacs = document.querySelector('.honap-racs');
        if (!honapRacs) return;

        honapRacs.innerHTML = '';

        const honapElso = getHonapElsoNapja();
        const honapUtolso = getHonapUtolsoNapja();
        const elozoHonapUtolso = getElozoHonapUtolsoNapja();

        let elsoNapHetnapja = honapElso.getDay();
        elsoNapHetnapja = elsoNapHetnapja === 0 ? 6 : elsoNapHetnapja - 1;

        const elozoHonapNapokSzama = elsoNapHetnapja;
        for (let i = elozoHonapNapokSzama - 1; i >= 0; i--) {
            const napSzam = elozoHonapUtolso.getDate() - i;
            const napCella = createNapCella(napSzam, true);
            honapRacs.appendChild(napCella);
        }

        const honapNapokSzama = honapUtolso.getDate();
        for (let i = 1; i <= honapNapokSzama; i++) {
            const napCella = createNapCella(i, false);
            honapRacs.appendChild(napCella);
        }

        const osszesNap = elozoHonapNapokSzama + honapNapokSzama;
        const osszesanSzuksegesNapok = 42;
        const kovetkezoHonapNapok = osszesanSzuksegesNapok - osszesNap;

        for (let i = 1; i <= kovetkezoHonapNapok; i++) {
            const napCella = createNapCella(i, true);
            honapRacs.appendChild(napCella);
        }
    }

    function createNapCella(napSzam, masikHonap) {
        const napCella = document.createElement('div');
        napCella.className = masikHonap ?  'nap-cella masik-honap' : 'nap-cella';
        napCella.innerHTML = `<div class="nap-szam">${napSzam}</div>`;
        return napCella;
    }

    generaljHonapRacs();
});


//uj resz




let selectedDate = null;
let events = [];

// ==================== NAPTÁR INICIALIZÁLÁS ====================
document.addEventListener('DOMContentLoaded', function() {
    loadEvents();
    initHaviNaptar();
    initMiniCalendar();
    initThemeToggle();
    initNezetValaszto();
    initModalClose();
});

// ==================== TÉMA VÁLTÁS ====================
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'darkmode') {
        document.body.classList.add('darkmode');
        themeToggle.checked = true;
    } else {
        document.body.classList.add('lightmode');
    }
    
    themeToggle.addEventListener('change', function() {
        if (this.checked) {
            document.body.classList.remove('lightmode');
            document.body.classList.add('darkmode');
            localStorage.setItem('theme', 'darkmode');
        } else {
            document.body.classList.remove('darkmode');
            document.body.classList.add('lightmode');
            localStorage.setItem('theme', 'lightmode');
        }
    });
}

// ==================== NÉZET VÁLTÓ ====================
function initNezetValaszto() {
    const nezetValaszto = document.getElementById('nezetValaszto');
    const nezetBtn = document.getElementById('nezetBtn');
    
    if (nezetBtn) {
        nezetBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            nezetValaszto.classList.toggle('open');
        });
    }
    
    document.addEventListener('click', function() {
        if (nezetValaszto) {
            nezetValaszto.classList.remove('open');
        }
    });
}

function nezetValtas(url, element) {
    window.location.href = url;
}

// ==================== MODÁL KEZELÉS ====================
function openModal(date) {
    selectedDate = date;
    const modal = document.getElementById('eventModal');
    const dateDisplay = document.getElementById('selectedDateDisplay');
    
    if (dateDisplay) {
        const formattedDate = `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}.`;
        dateDisplay.textContent = `Kiválasztott dátum: ${formattedDate}`;
    }
    
    // Űrlap reset
    document.getElementById('eventForm').reset();
    document.getElementById('startTime').value = '07:00';
    document.getElementById('endTime').value = '08:00';
    document.getElementById('busyStatus').checked = true;
    document.getElementById('notification').value = '30';
    
    modal.classList.add('show');
}

function closeModal() {
    const modal = document.getElementById('eventModal');
    modal.classList.remove('show');
    selectedDate = null;
}

function initModalClose() {
    const modal = document.getElementById('eventModal');
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
}

// ==================== ESEMÉNY KEZELÉS ====================
function saveEvent() {
    if (!selectedDate) {
        alert('Nincs kiválasztott dátum!');
        return;
    }
    
    const title = document.getElementById('eventTitle').value.trim();
    if (!title) {
        alert('Kérlek add meg az esemény címét!');
        return;
    }
    
    const event = {
        id: Date.now(),
        date: selectedDate.toISOString().split('T')[0],
        title: title,
        type: document.getElementById('eventType').value,
        startTime: document.getElementById('startTime').value,
        endTime: document.getElementById('endTime').value,
        googleMeet: document.getElementById('googleMeet').checked,
        location: document.getElementById('location').value,
        description: document.getElementById('description').value,
        category: document.getElementById('category').value,
        busyStatus: document.getElementById('busyStatus').checked,
        notification: parseInt(document.getElementById('notification').value)
    };
    
    events.push(event);
    saveEventsToLocalStorage();
    refreshCalendar();
    closeModal();
}

function loadEvents() {
    const savedEvents = localStorage.getItem('calendarEvents');
    if (savedEvents) {
        events = JSON.parse(savedEvents);
    }
}

function saveEventsToLocalStorage() {
    localStorage.setItem('calendarEvents', JSON.stringify(events));
}

function getEventsForDate(date) {
    const dateStr = date.toISOString().split('T')[0];
    return events.filter(event => event.date === dateStr);
}

function deleteEvent(eventId, date) {
    events = events.filter(event => event.id !== eventId);
    saveEventsToLocalStorage();
    refreshCalendar();
}

// ==================== HAVI NAPTÁR MEGJELENÍTÉS ====================
let currentHaviDate = new Date();

function initHaviNaptar() {
    renderHaviNaptar(currentHaviDate);
}

function renderHaviNaptar(date) {
    const year = date.getFullYear();
    const month = date.getMonth();
    
    
    const monthYearDiv = document.getElementById('monthYear2');
    if (monthYearDiv) {
        const monthNames = ['Január', 'Február', 'Március', 'Április', 'Május', 'Június', 'Július', 'Augusztus', 'Szeptember', 'Október', 'November', 'December'];
        monthYearDiv.textContent = `${monthNames[month]} ${year}`;
    }
    
    // Havi naptár generálása
    const container = document.querySelector('.honap-racs');
    if (!container) return;
    
    container.innerHTML = '';
    
    const firstDayOfMonth = new Date(year, month, 1);
    const startDayOfWeek = firstDayOfMonth.getDay();
    let startOffset = startDayOfWeek === 0 ? 6 : startDayOfWeek - 1;
    
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const prevMonthDays = new Date(year, month, 0).getDate();
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    for (let i = 0; i < 42; i++) {
        let cellDate = null;
        let isOtherMonth = false;
        let dayNumber;
        
        if (i < startOffset) {
            dayNumber = prevMonthDays - startOffset + i + 1;
            const prevMonth = month === 0 ? 11 : month - 1;
            const prevYear = month === 0 ? year - 1 : year;
            cellDate = new Date(prevYear, prevMonth, dayNumber);
            isOtherMonth = true;
        } else if (i >= startOffset + daysInMonth) {
            
            dayNumber = i - (startOffset + daysInMonth) + 1;
            const nextMonth = month === 11 ? 0 : month + 1;
            const nextYear = month === 11 ? year + 1 : year;
            cellDate = new Date(nextYear, nextMonth, dayNumber);
            isOtherMonth = true;
        } else {
            
            dayNumber = i - startOffset + 1;
            cellDate = new Date(year, month, dayNumber);
            isOtherMonth = false;
        }
        
        const isToday = cellDate.toDateString() === today.toDateString();
        const eventsForDay = getEventsForDate(cellDate);
        
        const cell = document.createElement('div');
        cell.className = 'nap-cella';
        if (isOtherMonth) cell.classList.add('masik-honap');
        if (isToday) cell.classList.add('today');
        
        cell.innerHTML = `
            <div class="nap-szam">${dayNumber}</div>
            <div class="nap-esemenyek">
                ${eventsForDay.slice(0, 3).map(event => `
                    <div class="esemeny-cim ${event.type.toLowerCase().replace('ő', 'o')}" 
                         onclick="event.stopPropagation(); showEventDetails(${event.id})"
                         title="${event.title}">
                        ${event.title.substring(0, 20)}${event.title.length > 20 ? '...' : ''}
                    </div>
                `).join('')}
                ${eventsForDay.length > 3 ? `<div class="esemeny-tobb">+${eventsForDay.length - 3} további</div>` : ''}
            </div>
        `;
        
        cell.addEventListener('click', (function(date) {
            return function() { openModal(date); };
        })(cellDate));
        
        container.appendChild(cell);
    }
    
    
    const prevBtn = document.getElementById('prevBtn2');
    const nextBtn = document.getElementById('nextBtn2');
    
    if (prevBtn) {
        prevBtn.onclick = () => {
            currentHaviDate = new Date(year, month - 1, 1);
            renderHaviNaptar(currentHaviDate);
            renderMiniCalendar(currentHaviDate);
        };
    }
    
    if (nextBtn) {
        nextBtn.onclick = () => {
            currentHaviDate = new Date(year, month + 1, 1);
            renderHaviNaptar(currentHaviDate);
            renderMiniCalendar(currentHaviDate);
        };
    }
}

// ==================== MINI NAPTÁR ====================
let currentMiniDate = new Date();

function initMiniCalendar() {
    renderMiniCalendar(currentMiniDate);
}

function renderMiniCalendar(date) {
    const year = date.getFullYear();
    const month = date.getMonth();
    
    const monthYearDiv = document.getElementById('monthYear2');
    if (monthYearDiv) {
        const monthNames = ['Január', 'Február', 'Március', 'Április', 'Május', 'Június', 'Július', 'Augusztus', 'Szeptember', 'Október', 'November', 'December'];
        monthYearDiv.textContent = `${monthNames[month]} ${year}`;
    }
    
    const datesContainer = document.getElementById('dates2');
    if (!datesContainer) return;
    
    datesContainer.innerHTML = '';
    
    const firstDayOfMonth = new Date(year, month, 1);
    const startDayOfWeek = firstDayOfMonth.getDay();
    let startOffset = startDayOfWeek === 0 ? 6 : startDayOfWeek - 1;
    
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const prevMonthDays = new Date(year, month, 0).getDate();
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    for (let i = 0; i < 42; i++) {
        let dayNumber;
        let isCurrentMonth = true;
        let cellDate;
        
        if (i < startOffset) {
            dayNumber = prevMonthDays - startOffset + i + 1;
            isCurrentMonth = false;
            const prevMonth = month === 0 ? 11 : month - 1;
            const prevYear = month === 0 ? year - 1 : year;
            cellDate = new Date(prevYear, prevMonth, dayNumber);
        } else if (i >= startOffset + daysInMonth) {
            dayNumber = i - (startOffset + daysInMonth) + 1;
            isCurrentMonth = false;
            const nextMonth = month === 11 ? 0 : month + 1;
            const nextYear = month === 11 ? year + 1 : year;
            cellDate = new Date(nextYear, nextMonth, dayNumber);
        } else {
            dayNumber = i - startOffset + 1;
            cellDate = new Date(year, month, dayNumber);
            isCurrentMonth = true;
        }
        
        const isToday = cellDate.toDateString() === today.toDateString();
        const hasEvents = getEventsForDate(cellDate).length > 0;
        
        const dateDiv = document.createElement('div');
        dateDiv.className = 'date';
        if (!isCurrentMonth) dateDiv.classList.add('inactive');
        if (isToday) dateDiv.classList.add('active');
        if (hasEvents) dateDiv.classList.add('has-event');
        dateDiv.textContent = dayNumber;
        
        dateDiv.addEventListener('click', (function(date) {
            return function() {
                currentHaviDate = new Date(date.getFullYear(), date.getMonth(), 1);
                renderHaviNaptar(currentHaviDate);
                renderMiniCalendar(currentHaviDate);
            };
        })(cellDate));
        
        datesContainer.appendChild(dateDiv);
    }
    
    
    
}

// ==================== FRISSÍTÉS ====================
function refreshCalendar() {
    renderHaviNaptar(currentHaviDate);
    renderMiniCalendar(currentHaviDate);
}

// ==================== STÍLUSOK HOZZÁADÁSA ====================
const style = document.createElement('style');
style.textContent = `
    .modal-overlay {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        z-index: 1000;
        justify-content: center;
        align-items: center;
    }
    
    .modal-overlay.show {
        display: flex;
    }
    
    .modal-card {
        background: white;
        border-radius: 16px;
        width: 90%;
        max-width: 500px;
        max-height: 90vh;
        overflow-y: auto;
        box-shadow: 0 20px 35px rgba(0, 0, 0, 0.2);
    }
    
    body.darkmode .modal-card {
        background: #2c2c2c;
        color: #fff;
    }
    
    .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px 24px;
        border-bottom: 1px solid #e8eaed;
    }
    
    body.darkmode .modal-header {
        border-color: #444;
    }
    
    .modal-header h3 {
        margin: 0;
        font-size: 20px;
    }
    
    .close-button {
        background: none;
        border: none;
        font-size: 28px;
        cursor: pointer;
        color: #5f6368;
    }
    
    body.darkmode .close-button {
        color: #aaa;
    }
    
    .selected-date-badge {
        background: #e8f0fe;
        padding: 12px 24px;
        font-size: 14px;
        color: #1a73e8;
    }
    
    body.darkmode .selected-date-badge {
        background: #3a3a3a;
        color: #8ab4f8;
    }
    
    .form-group {
        padding: 12px 24px;
    }
    
    .form-group label {
        display: block;
        margin-bottom: 8px;
        font-weight: 500;
        font-size: 14px;
    }
    
    .form-group input, .form-group select, .form-group textarea {
        width: 100%;
        padding: 10px 12px;
        border: 1px solid #dadce0;
        border-radius: 8px;
        font-size: 14px;
        font-family: inherit;
    }
    
    body.darkmode .form-group input,
    body.darkmode .form-group select,
    body.darkmode .form-group textarea {
        background: #3a3a3a;
        border-color: #555;
        color: #fff;
    }
    
    .datetime-group {
        display: flex;
        align-items: center;
        gap: 12px;
    }
    
    .datetime-group input {
        flex: 1;
    }
    
    .checkbox-group {
        display: flex;
        align-items: center;
        gap: 10px;
    }
    
    .checkbox-group input {
        width: auto;
    }
    
    .checkbox-group label {
        margin-bottom: 0;
    }
    
    .modal-footer {
        padding: 16px 24px;
        display: flex;
        justify-content: flex-end;
        gap: 12px;
        border-top: 1px solid #e8eaed;
    }
    
    body.darkmode .modal-footer {
        border-color: #444;
    }
    
    .btn-primary {
        background: #1a73e8;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 20px;
        cursor: pointer;
        font-weight: 500;
    }
    
    .btn-secondary {
        background: transparent;
        color: #1a73e8;
        border: none;
        padding: 10px 20px;
        border-radius: 20px;
        cursor: pointer;
        font-weight: 500;
    }
    
    body.darkmode .btn-secondary {
        color: #8ab4f8;
    }
    
    .nap-esemenyek {
        font-size: 10px;
        margin-top: 4px;
    }
    
    .esemeny-cim {
        background: #e8f0fe;
        color: #1a73e8;
        padding: 2px 4px;
        border-radius: 4px;
        margin-bottom: 2px;
        cursor: pointer;
        font-size: 9px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    
    body.darkmode .esemeny-cim {
        background: #3a3a3a;
        color: #8ab4f8;
    }
    
    .esemeny-cim.Teendő {
        background: #fef7e0;
        color: #b06000;
    }
    
    .esemeny-cim.Találkozó {
        background: #e6f4ea;
        color: #137333;
    }
    
    .esemeny-tobb {
        color: #5f6368;
        font-size: 9px;
        padding: 2px 4px;
        cursor: default;
    }
    
    .date.has-event {
        position: relative;
    }
    
    .date.has-event::after {
        content: '';
        position: absolute;
        bottom: 2px;
        left: 50%;
        transform: translateX(-50%);
        width: 4px;
        height: 4px;
        background: #ff5869;
        border-radius: 50%;
    }
    
    body.darkmode .date.has-event::after {
        background: #ff7b89;
    }
`;

document.head.appendChild(style);

let lists = document.getElementByClassName("ddlist");
let balDiv = document.getElementsByClassName("draganddrop");
let jobbDiv = document.getElementByC