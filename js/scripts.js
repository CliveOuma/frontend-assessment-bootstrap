/* ── HAMBURGER ── */
const hamburgerBtn = document.getElementById('hamburgerBtn');
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
/* ── MODAL ── */
let bsModal = null;

function openModal() {
  const el = document.getElementById('membershipModal');
  if (!bsModal) bsModal = new bootstrap.Modal(el);
  resetForm();
  bsModal.show();
}

function resetForm() {
  document.getElementById('formSection').style.display = 'block';
  document.getElementById('successSection').style.display = 'none';
  document.getElementById('modalFooter').style.display = 'flex';
  document.getElementById('membershipForm').reset();
  document.getElementById('planPreview').style.display = 'none';
  document.getElementById('planError').style.display = 'none';
  ['fullName', 'emailAddr', 'phoneNum', 'planSelect'].forEach(id => {
    document.getElementById(id).classList.remove('is-invalid', 'is-valid');
  });
}

/* ── VALIDATION ── */
function check(id, testFn) {
  const el = document.getElementById(id);
  const err = el.nextElementSibling;
  const ok = testFn(el.value.trim());
  el.classList.toggle('is-invalid', !ok);
  el.classList.toggle('is-valid', ok);
  if (err && err.classList.contains('invalid-feedback')) {
    err.style.display = ok ? 'none' : 'flex';
  }
  return ok;
}

function submitForm() {
  let valid = true;
  valid &= check('fullName', v => v.length >= 3);
  valid &= check('emailAddr', v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v));
  valid &= check('phoneNum', v => /^\+?[\d\s\-(). ]{7,}$/.test(v));

  const planEl = document.getElementById('planSelect');
  const planErr = document.getElementById('planError');
  const plan = planEl.value;

  if (!plan) {
    planEl.classList.add('is-invalid');
    planErr.style.display = 'flex';
    valid = false;
  } else {
    planEl.classList.remove('is-invalid');
    planEl.classList.add('is-valid');
    planErr.style.display = 'none';
  }

  if (!valid) return;

  const name = document.getElementById('fullName').value.trim();
  const planLabel = plan === 'foundation' ? 'Foundation' : 'Economy';
  document.getElementById('formSection').style.display = 'none';
  document.getElementById('modalFooter').style.display = 'none';
  document.getElementById('successSection').style.display = 'block';
  document.getElementById('successTitle').textContent = `Welcome, ${name}!`;
  document.getElementById('successSub').textContent =
    `Your ${planLabel} Membership application is confirmed. We'll be in touch shortly.`;
}

