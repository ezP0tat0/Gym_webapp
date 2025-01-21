window.onload=function()
{
	localStorage.clear();
}

async function login() {
    var uName = document.getElementById('uName').value;
    var password = document.getElementById('pw').value;
    if (isEmpty(uName) || isEmpty(password)) {
        alert('Felhasználónév és jelszó megadása kötelező!');
    } else {
        var data = {
            username: uName,
            password: password
        };
        await postData("Auth/login", data, false)
            .then(async (data) => {
                if (await data.token) {
                    localStorage.setItem("data", JSON.stringify(data));
                    window.location.href = "index.html";
                } else {
                    alert(await data.Message);
                }
            });
    }
}

async function register() {
    var uName = document.getElementById('uName').value;
    var fullName = document.getElementById('fullName').value;
    var password = document.getElementById('pw').value;
    var confirmPassword = document.getElementById('pwAgain').value;

    if (isEmpty(uName) || isEmpty(fullName) || isEmpty(password) || isEmpty(confirmPassword)) {
        alert('Minden mező kitöltése kötelező!');
        return;
    }

    if (password !== confirmPassword) {
        alert('A jelszavak nem egyeznek!');
        return;
    }
    var data = {
        username: uName,
        password: password,
        name: fullName
    };
    console.log(data);

    await postData("Auth/register", data, false)
        .then(async (response) => {
            if (response.success) {
                alert('Sikeres regisztráció! Jelentkezzen be a folytatáshoz.');
                window.location.href = "login.html";
            } else {
                alert(await response.message || 'Hiba történt a regisztráció során!');
            }
        });
}

function isEmpty(str) {
    return (!str || 0 === str.length);
}