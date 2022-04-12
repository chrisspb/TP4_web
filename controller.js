postData = async (url = '', data = {}) => {
    // Default options are marked with *
    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
            'owner': 'u7SSUfvUS5dG3LIm3IdqyJRJg5joacRQKTFs3Ogi'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
}

const login = async () => {

    let email = document.getElementById("userid").value;
    let password = document.getElementById("password").value;

    postData("https://m413.joss-coupet.eu/users/login", {
        "email": email,
        "password": password
    })
        .then(data => {
            console.log(data); // JSON data parsed by `data.json()` call
            if (!data.success) {
                var element = document.getElementById("userid");
                element.classList.add("errorLogin");
                var element = document.getElementById("password");
                element.classList.add("errorLogin");
            } else {
                var element = document.getElementById("userid");
                element.classList.add("successLogin");
                var element = document.getElementById("password");
                element.classList.add("successLogin");
                localStorage.setItem("user", JSON.stringify(data.data.user));
                localStorage.setItem("token", data.data.user.token.token);
                window.location.href = localStorage.getItem("mySelfURL") + "/products/products.html";
            }
        });
}