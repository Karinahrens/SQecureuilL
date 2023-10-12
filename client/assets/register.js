const API_ENDPOINT = 'http://localhost:3000/users/register' //'https://backendsqecureuill.onrender.com/';

document.getElementById("register-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const form = new FormData(e.target);

    const options = {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: form.get("username"),
            password: form.get("password")
        })
    }

    const response = await fetch(`${API_ENDPOINT}`, options);
    const data = await response.json();

    if (response.status == 201) {
        window.location.assign("login.html");
    } else {
        alert(data.error);
    }
})