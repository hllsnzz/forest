// Navigation: highlight active page
document.querySelectorAll('.nav-link').forEach(link => {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  const href = link.getAttribute('href');
  if (href === page) link.classList.add('active');
  else link.classList.remove('active');
});