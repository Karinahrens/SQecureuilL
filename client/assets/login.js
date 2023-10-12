document.getElementById("login-form").addEventListener("submit", async (e) => {
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

    const response = await fetch("http://localhost:3000/users/login", options);
    const data = await response.json();

    if (response.status == 200) {
        localStorage.setItem("token", data.token);
        window.location.assign("home.html");
    } else {
        alert(data.error);
    }
})