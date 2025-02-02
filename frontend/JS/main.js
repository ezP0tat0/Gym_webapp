var user=sessionStorage.getItem('data');
var userData=JSON.parse(user);

window.onload=function()
{
    userDropdown();
}


function userDropdown()
{
    var ul = document.getElementById("userDropdownStandard");
    var ulo = document.getElementById("userDropdownOffCanvas");

    if(ul===null) console.log("aaaaaaaa");
    if(ulo===null) console.log("bbbb");
    if(userData === null)
    {
        ul.innerHTML=`  <li><label class="loginLabel">Felhasználónév</label><input id="Username" class="dropdown-item loginField" type="text" placeholder="felhasználónév" aria-label="Username" aria-describedby="basic-addon1"></li>
                        <li><label class="loginLabel">Jelszó</label><input id="Password" class="dropdown-item loginField" type="password" placeholder="jelszó" aria-label="Password" aria-describedby="basic-addon1"></li>
                        <li><hr class="dropdown-divider"></li>
                        <li><a class="dropdown-item" onclick="login()">bejelentkezés</a></li>
                        <li>
                            <div class="dropdown-item loggedin">
                                <input id="stayLoggedIn" type="checkbox">
                                <label for="stayLoggedIn">Bejelentkezve&nbsp;marad</label>
                            </div>
                        </li>`;
        ulo.innerHTML=ul.innerHTML;
    } 
    else
    {
        ul.innerHTML=`  <li><a class="dropdown-item" href="profil.html">Profil</a></li>
                        <li><a class="dropdown-item " href="jegyeim.html">Jegyeim</a></li>
                        <li><hr class="dropdown-divider"></li>
                        <li><a class="dropdown-item logout" href="#" onclick="logout()">Kijelentkezés</a></li>`;
        
        ulo.innerHTML=ul.innerHTML;
    }

}

document.addEventListener("DOMContentLoaded", function () {
    // Prevent dropdown from closing when clicking inside
    document.querySelector(".dropdown-menu").addEventListener("click", function (event) {
        if (event.target.id !== "stayLoggedIn") {
            event.stopPropagation();
        }
    });

    // Ensure the checkbox works
    document.getElementById("stayLoggedIn").addEventListener("click", function (event) {
        event.stopPropagation(); // Stops dropdown from closing
    });
});



function displayUserInfo()
{
    
    if(user)
    {
        document.getElementById("profileData").innerHTML=
        `</br>${userData.username} </br>`;
    } 
}
function logout()
 {
    try
    {
        localStorage.clear();
        sessionStorage.clear();
    }
    catch(error)
    {
        console.error("logout error: ",error);
    }
 }
 async function showItems() {
    var div = document.getElementById("items");
    try {
        const data = await getData("Item");
        console.log(data);
        div.innerHTML = createList(data);
    } catch (error) {
        console.log("Adatbekérési hiba: " + error);
        div.textContent = "Hiba történt az adatok lekérdezése során.";
    }
}