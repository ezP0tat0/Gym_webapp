
var defaultUrl= "https://localhost:7289/api/";
async function register() 
{
 
    var username=document.getElementById("username").value;
    var name= document.getElementById("name").value;
    var password1=document.getElementById("password").value;
    var password2=document.getElementById("pwAgain").value;

    if(password1!=password2)
    {
        alert("A jelszavak nem eggyeznek");
        return;
    }

    const response = await fetch(defaultUrl+"Auth/register",{
        method: "POST",
        headers:{
            "Content-Type": "application/json",
            Authorization: "bearer " + null
        },
        body: JSON.stringify({
            username: username,
            password: password1,
            name: name,
            role: "User"
        })
    });

    if(response.ok)
    {
        alert("Sikeres regisztráció! Jelentkezzen be!");
        location.href="index.html";
    }
}