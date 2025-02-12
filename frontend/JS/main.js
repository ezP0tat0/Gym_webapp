var user=sessionStorage.getItem('data');
var userData=JSON.parse(user);

window.onload=function()
{
    console.log(userData);
    userDropdown();
}


function userDropdown()
{
    var uls = document.getElementById("userDropdownStandard");
    var ulo = document.getElementById("userDropdownOffCanvas");

    if(uls===null) console.log("aaaaaaaa");
    if(ulo===null) console.log("bbbb");
    if(userData === null)
    {
        uls.innerHTML=`  <li><label class="loginLabel navButton">Felhasználónév</label><input id="UsernameS" class="dropdown-item loginField" type="text" placeholder="felhasználónév" aria-label="Username" aria-describedby="basic-addon1"></li>
                        <li><label class="loginLabel navButton">Jelszó</label><input id="PasswordS" class="dropdown-item loginField" type="password" placeholder="jelszó" aria-label="Password" aria-describedby="basic-addon1"></li>
                        <li><hr class="dropdown-divider"></li>
                        <li><a class="dropdown-item" onclick="login()">bejelentkezés</a></li>
                        <li>
                            <div class="dropdown-item loggedin">
                                <input id="stayLoggedInS" type="checkbox">
                                <label for="stayLoggedInS">Bejelentkezve&nbsp;marad</label>
                            </div>
                        </li>`;
        ulo.innerHTML=`  <li><label class="loginLabel navButton">Felhasználónév</label><input id="UsernameO" class="dropdown-item loginField" type="text" placeholder="felhasználónév" aria-label="Username" aria-describedby="basic-addon1"></li>
                        <li><label class="loginLabel navButton">Jelszó</label><input id="PasswordO" class="dropdown-item loginField" type="password" placeholder="jelszó" aria-label="Password" aria-describedby="basic-addon1"></li>
                        <li><p class="reg"><a class="dropdown-item text-end" href="Registration.html">Regisztráció</a></p></li
                        <li><hr class="dropdown-divider"></li>
                        <li><a class="dropdown-item loginLogout" onclick="login()">Bejelentkezés</a></li>
                        <li>
                            <div class="dropdown-item loggedin">
                                <input id="stayLoggedInO" type="checkbox">
                                <label for="stayLoggedInO">Bejelentkezve&nbsp;marad</label>
                            </div>
                        </li>`;
    } 
    else
    {
        uls.innerHTML=`  <li><a class="dropdown-item" href="profil.html">Profil</a></li>
                        <li><a class="dropdown-item " href="jegyeim.html">Jegyeim</a></li>
                        ${userData.role=="Admin"?`<li><a class="dropdown-item" href="adminPage.html">Admin oldal</a></li>`:""}
                        <li><hr class="dropdown-divider"></li>
                        <li><a class="dropdown-item logout" onclick="logout()">Kijelentkezés</a></li>`;
        
        
        ulo.innerHTML=uls.innerHTML;
    }

}

document.addEventListener("DOMContentLoaded", function () {
    // Prevent dropdown from closing when clicking inside
    document.getElementById("userDropdownStandard").addEventListener("click",function(event){
        if (event.target.id !== "stayLoggedInS") {
            event.stopPropagation();
        }
    });
    document.getElementById("userDropdownOffCanvas").addEventListener("click",function(event){
        if (event.target.id !== "stayLoggedInO") {
            event.stopPropagation();
        }
    })

    // Ensure the checkbox works
    const slis= document.getElementById("stayLoggedInS");

    if(slis)slis.addEventListener("click", function (event) {
        event.stopPropagation(); // Stops dropdown from closing
    });

    const slio=document.getElementById("stayLoggedInO");

    if(slio)slio.addEventListener("click", function (event) {
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
    console.log("adas");
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