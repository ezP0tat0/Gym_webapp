var user=sessionStorage.getItem('data');
var userData=JSON.parse(user);

window.onload=function()
{
    userDropdown();
}

function userDropdown()
{
    var ul = document.getElementById("userDropdown");
    if(userData === null)
    {
        ul.innerHTML=`  <li><input id="Password" class="dropdown-item" type="text" placeholder="felhasználónév" aria-label="Username" aria-describedby="basic-addon1"></li>
                        <li><input id="Username" class="dropdown-item" type="password" placeholder="jelszó" aria-label="Password" aria-describedby="basic-addon1"></li>
                        <li><hr class="dropdown-divider"></li>
                        <li><a class="dropdown-item" onclick="login()">bejelentkezés</a></li>
                        <div class="input-group mb-3 ">
                        <div class="input-group-text">
                            <input class="form-check-input mt-0" type="checkbox" value="" aria-label="Checkbox for following text input">
                        </div>
                        Bejelentkezve marad
                        <input type="text" class="form-control" aria-label="Text input with checkbox">
                        </div>`;
    } 
    else
    {
        ul.innerHTML=`  <li><a class="dropdown-item" href="profil.html">Profil</a></li>
                        <li><a class="dropdown-item " href="jegyeim.html">Jegyeim</a></li>
                        <li><hr class="dropdown-divider"></li>
                        <li><a class="dropdown-item logout" href="#" onclick="logout()">Kijelentkezés</a></li>`;
    }

}
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