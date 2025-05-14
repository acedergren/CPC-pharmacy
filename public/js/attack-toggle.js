const toggleButtons = document.querySelectorAll('#attack-toggle');
defaultState();
toggleButtons.forEach(btn => btn.addEventListener('click', () => {
  const mode = localStorage.getItem('attackMode') === 'on' ? 'off' : 'on';
  localStorage.setItem('attackMode', mode);
  updateButtons();
}));
function defaultState() {
  if (!localStorage.getItem('attackMode')) {
    localStorage.setItem('attackMode', 'off');
  }
  updateButtons();
}
function updateButtons() {
  const mode = localStorage.getItem('attackMode');
  toggleButtons.forEach(btn => {
    btn.textContent = `Attack: ${mode.toUpperCase()}`;
    btn.classList.toggle('bg-red-500', mode === 'off');
    btn.classList.toggle('bg-green-500', mode === 'on');
  });
}
