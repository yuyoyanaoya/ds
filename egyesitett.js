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
        napCella.className = masikHonap ? 'nap-cella masik-honap' : 'nap-cella';
        napCella.innerHTML = `<div class="nap-szam">${napSzam}</div>`;
        return napCella;
    }

    generaljHonapRacs();
});
