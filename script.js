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

  // 히어로 미리보기 — 사이드바 탭으로 화면 전환 + 청구 선택/입금 등록 미니 인터랙션
  const appWin = document.querySelector('.hero-preview .app-window');
  if (appWin) {
    const navBtns = appWin.querySelectorAll('.app-nav-item');
    const panels = appWin.querySelectorAll('.app-panel');
    const urlEl = appWin.querySelector('[data-url]');
    navBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const key = btn.dataset.panel;
        navBtns.forEach((b) => b.classList.toggle('is-active', b === btn));
        panels.forEach((p) => p.classList.toggle('is-active', p.dataset.panel === key));
        if (urlEl && btn.dataset.title) urlEl.textContent = `sunaprok.app · ${btn.dataset.title}`;
      });
    });

    // 청구: 행 선택 토글 → 선택 건수·합계 실시간 갱신
    const chargePanel = appWin.querySelector('.app-panel[data-panel="charge"]');
    if (chargePanel) {
      const rows = chargePanel.querySelectorAll('.app-crow:not([disabled])');
      const countEl = chargePanel.querySelector('[data-sel-count]');
      const totalEl = chargePanel.querySelector('[data-sel-total]');
      const fmt = (n) => n.toLocaleString('ko-KR') + '원';
      const recompute = () => {
        let n = 0;
        let sum = 0;
        rows.forEach((r) => {
          if (r.classList.contains('is-selected')) {
            n += 1;
            sum += Number(r.dataset.amt) || 0;
          }
        });
        if (countEl) countEl.textContent = String(n);
        if (totalEl) totalEl.textContent = fmt(sum);
      };
      rows.forEach((r) =>
        r.addEventListener('click', () => {
          r.classList.toggle('is-selected');
          recompute();
        }),
      );
      recompute();
    }

    // 입금: '입금 등록' 클릭 → 입금완료 배지로 전환 + 미입금 카운트 감소
    const payPanel = appWin.querySelector('.app-panel[data-panel="payment"]');
    if (payPanel) {
      const chip = payPanel.querySelector('[data-unpaid-chip]');
      payPanel.querySelectorAll('.app-pay-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
          const badge = document.createElement('span');
          badge.className = 'app-badge is-green';
          badge.textContent = '현금';
          btn.replaceWith(badge);
          if (chip) {
            const left = Math.max(0, (Number(chip.dataset.unpaidChip) || 1) - 1);
            chip.dataset.unpaidChip = String(left);
            if (left === 0) chip.style.display = 'none';
            else chip.textContent = `미입금 ${left}`;
          }
        });
      });
    }
  }
});
