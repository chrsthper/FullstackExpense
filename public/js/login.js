/* global axios */


document.getElementById('loginForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const email  = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const response = await axios.post('http://localhost:4000/login/validiation', { email, password });
    localStorage.setItem('token', response.data.token);
    window.location.href = '/expense-page';
  } catch (err) {
    console.error(err);
    alert('Login failed');
  }
});
