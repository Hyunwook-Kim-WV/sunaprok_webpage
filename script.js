document.addEventListener('DOMContentLoaded', () => {
  const faqs = document.querySelectorAll('.faq details');
  faqs.forEach((d) => {
    d.addEventListener('toggle', () => {
      if (d.open) {
        faqs.forEach((other) => {
          if (other !== d) other.open = false;
        });
      }
    });
  });

  // 요금 계산기 — 베이스 + 인당 모델. 파라미터는 .price-calc 의 data-* 속성에서 읽는다.
  const calc = document.querySelector('.price-calc');
  if (calc) {
    const base = Number(calc.dataset.base) || 49000;
    const included = Number(calc.dataset.included) || 3;
    const seat = Number(calc.dataset.seat) || 15000;
    const max = Number(calc.dataset.max) || 50;
    const countEl = calc.querySelector('[data-count]');
    const totalEl = calc.querySelector('[data-total]');
    const breakEl = calc.querySelector('[data-break]');
    const decBtn = calc.querySelector('[data-delta="-1"]');
    const incBtn = calc.querySelector('[data-delta="1"]');
    const fmt = (n) => n.toLocaleString('ko-KR');
    let users = Number(countEl && countEl.textContent) || included;

    const render = () => {
      const extra = Math.max(0, users - included);
      const total = base + extra * seat;
      if (countEl) countEl.textContent = String(users);
      if (totalEl) totalEl.textContent = fmt(total);
      if (breakEl) {
        breakEl.textContent = extra > 0
          ? `기본 ${fmt(base)}원 + 추가 ${extra}명 × ${fmt(seat)}원`
          : `기본 요금에 사용자 ${included}명이 포함됩니다`;
      }
      if (decBtn) decBtn.disabled = users <= 1;
      if (incBtn) incBtn.disabled = users >= max;
    };

    calc.querySelectorAll('.calc-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const delta = Number(btn.dataset.delta);
        users = Math.min(max, Math.max(1, users + delta));
        render();
      });
    });
    render();
  }
});
