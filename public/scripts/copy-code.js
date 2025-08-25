// 전체 페이지의 <pre><code> 블록에 복사 버튼 붙이기
document.addEventListener('DOMContentLoaded', () => {
  const pres = document.querySelectorAll('pre');

  pres.forEach((pre) => {
    if (pre.querySelector('.copy-btn')) return; // 중복 방지
    const code = pre.querySelector('code');
    if (!code) return;

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'copy-btn';
    btn.setAttribute('aria-label', '코드 복사');
    btn.textContent = 'Copy';

    const preStyle = getComputedStyle(pre);
    if (preStyle.position === 'static') {
      pre.style.position = 'relative';
    }

    btn.addEventListener('click', async () => {
      const text = code.innerText;
      try {
        await navigator.clipboard.writeText(text);
        const original = btn.textContent;
        btn.textContent = 'Copied!';
        btn.classList.add('copied');
        setTimeout(() => {
          btn.textContent = original || 'Copy';
          btn.classList.remove('copied');
        }, 1500);
      } catch {
        const original = btn.textContent;
        btn.textContent = 'Error';
        setTimeout(() => (btn.textContent = original || 'Copy'), 1200);
      }
    });

    pre.appendChild(btn);
  });
});

