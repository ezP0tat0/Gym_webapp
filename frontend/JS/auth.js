
//token cookieba
async function login() {
    var UsernameS = document.getElementById('UsernameS').value;
    var PasswordS = document.getElementById('PasswordS').value;

    var stayLoggedIn=document.getElementById('stayLoggedInO').checked ? true : document.getElementById('stayLoggedInS');
    
    var Username = UsernameS === "" ? document.getElementById('UsernameO').value : UsernameS;
    var Password = PasswordS === "" ? document.getElementById('PasswordO').value : PasswordS;
    console.log(`uname:  ${Username}`);
    console.log(`ppw:  ${Password}`);
    
    if (isEmpty(Username) || isEmpty(Password)) {
        alert('Felhasználónév és jelszó megadása kötelező!');
    } else {
        var data = {
            username: Username,
            password: Password
        };
        await postData("Auth/login", data, false)
            .then(async (data) => {
                if (await data.token) {
                    //if(stayLoggedIn)  localStorage.setItem("data",JSON.stringify(data));
                    sessionStorage.setItem("data", JSON.stringify(data));
                    location.reload();
                    console.log(data);
                } else {
                    alert(await data.Message);
                }
            }).catch(y=>{console.log(y);});
    }
}

async function register() {
    var uName = document.getElementById('Username').value;
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

function logout() {
    sessionStorage.clear();
    localStorage.clear();
    location.reload();
}