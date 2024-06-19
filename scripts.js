document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(this);
    const data = new URLSearchParams(formData);

    fetch('/login', {
        method: 'POST',
        body: data
    })
    .then(response => response.text())
    .then(result => alert(result))
    .catch(error => console.error('Error:', error));
});
