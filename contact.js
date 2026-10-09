(function () {
  const form = document.getElementById('contact-form');
  const statusEl = document.getElementById('contact-status');
  const submitBtn = form.querySelector('.contact-submit');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    submitBtn.disabled = true;
    submitBtn.textContent = 'A enviar...';
    statusEl.textContent = '';
    statusEl.className = 'contact-status';

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(form)
      });

      if (response.ok) {
        statusEl.textContent = 'Mensagem enviada — obrigado! Respondo em breve.';
        statusEl.classList.add('contact-status-ok');
        form.reset();
      } else {
        const data = await response.json().catch(() => ({}));
        const msg = data.errors ? data.errors.map((e) => e.message).join(', ') : 'Erro ao enviar';
        throw new Error(msg);
      }
    } catch (err) {
      statusEl.textContent = 'Não foi possível enviar. Tenta novamente daqui a pouco ou fala comigo pelo LinkedIn.';
      statusEl.classList.add('contact-status-error');
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Enviar mensagem';
    }
  });
})();
