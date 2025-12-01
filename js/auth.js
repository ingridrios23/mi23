document.getElementById('loginForm')?.addEventListener('submit', function(e){
  e.preventDefault();
  const user = document.getElementById('username').value.trim();
  const pass = document.getElementById('password').value;
  if (!user || !pass) return Toast.show('Username and password required', 'error');
  localStorage.setItem('user', JSON.stringify({ username: user, loggedAt: new Date().toISOString() }));
  Toast.show('Logged in (simulated)');
  setTimeout(()=> location.href = 'index.html', 600);
});
