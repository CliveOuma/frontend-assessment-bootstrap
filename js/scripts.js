/* ── HAMBURGER ── */
  const hamburgerBtn  = document.getElementById('hamburgerBtn');
  const mobileNavMenu = document.getElementById('mobileNavMenu');

  hamburgerBtn.addEventListener('click', () => {
    const isOpen = mobileNavMenu.classList.toggle('open');
    hamburgerBtn.classList.toggle('open', isOpen);
    hamburgerBtn.setAttribute('aria-expanded', String(isOpen));
  });

  function closeMenu(e) {
    if (e) e.preventDefault();
    mobileNavMenu.classList.remove('open');
    hamburgerBtn.classList.remove('open');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
  }

  document.addEventListener('click', (e) => {
    if (!hamburgerBtn.contains(e.target) && !mobileNavMenu.contains(e.target)) {
      mobileNavMenu.classList.remove('open');
      hamburgerBtn.classList.remove('open');
    }
  });
