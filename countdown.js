// Fecha meta
const target = new Date('2025-06-18T15:05:00-05:00');

// Referencias a los spans y al header
const els = {
  header:  document.querySelector('.countdown-header'),
  months:  document.getElementById('months'),
  days:    document.getElementById('days'),
  hours:   document.getElementById('hours'),
  minutes: document.getElementById('minutes'),
  seconds: document.getElementById('seconds')
};

function updateCountdown() {
  const now  = new Date();
  let   diff = target - now;

  if (diff <= 0) {
    clearInterval(timerId);
    els.header.textContent = '¡Sebas ha llegado!';
    // deja todo en "00"
    ['months','days','hours','minutes','seconds'].forEach(k => els[k].textContent = '00');
    return;
  }

  // 1) calcular meses completos
  const yDiff = target.getFullYear() - now.getFullYear();
  let   mDiff = target.getMonth() - now.getMonth() + yDiff * 12;
  const tmp   = new Date(now);
  tmp.setMonth(tmp.getMonth() + mDiff);
  if (tmp > target) {
    mDiff--;
    tmp.setMonth(tmp.getMonth() - 1);
  }

  // 2) resta meses para obtener milisegundos restantes
  diff = target - tmp;

  // 3) desglosar días, horas, min, seg
  const d  = Math.floor(diff / (1000 * 60 * 60 * 24));
  diff    %= 1000 * 60 * 60 * 24;
  const h  = Math.floor(diff / (1000 * 60 * 60));
  diff    %= 1000 * 60 * 60;
  const m  = Math.floor(diff / (1000 * 60));
  diff    %= 1000 * 60;
  const s  = Math.floor(diff / 1000);

  // 4) actualizar cajas
  els.months.textContent  = String(mDiff).padStart(2, '0');
  els.days.textContent    = String(d).padStart(2, '0');
  els.hours.textContent   = String(h).padStart(2, '0');
  els.minutes.textContent = String(m).padStart(2, '0');
  els.seconds.textContent = String(s).padStart(2, '0');

  // 5) cambiar texto del header si queda < 24h
  if (target - now < 1000 * 60 * 60 * 24) {
    els.header.textContent = 'Sebas está por llegar';
  } else {
    els.header.textContent = '⚡ Sebas llega en';
  }
}

// arranca cuando el DOM esté listo
window.addEventListener('DOMContentLoaded', () => {
  updateCountdown();
  timerId = setInterval(updateCountdown, 1000);
});
