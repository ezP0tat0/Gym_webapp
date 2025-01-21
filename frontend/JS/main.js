var user=localStorage.getItem('data');
var userData=JSON.parse(user);

window.onload=function()
{
    //if(user===null)
    //    {
    //        logout();
    //    }

    displayUserInfo();
    showItems();
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
        window.location.replace("login.html");
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