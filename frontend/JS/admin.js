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

    if(userData === null)
    {
        uls.innerHTML=`  <form class="loginForm"><li><label class="loginLabel navButton">Felhasználónév</label><input id="UsernameS" class="dropdown-item loginField" type="text" placeholder="felhasználónév" aria-label="Username" aria-describedby="basic-addon1"></li>
                        <li><label class="loginLabel navButton">Jelszó</label><input id="PasswordS" class="dropdown-item loginField" type="password" placeholder="jelszó" aria-label="Password" aria-describedby="basic-addon1"></li>
                        <li><p class="reg"><a class="dropdown-item text-end reg" href="registration.html">Regisztráció</a></p></li>
                        <li><hr class="dropdown-divider"></li>
                        <li><a class="dropdown-item loginButton" type="submit" onclick="login()">bejelentkezés</a></li>
                        <li>
                            <div class="dropdown-item loggedin">
                                <input class="checkBox" id="stayLoggedInS" type="checkbox">
                                <label for="stayLoggedInS">Bejelentkezve&nbsp;marad</label>
                            </div>
                        </li></form>`;
        ulo.innerHTML=`  <form  class="loginForm"><li><label class="loginLabel navButton">Felhasználónév</label><input id="UsernameO" class="dropdown-item loginField" type="text" placeholder="felhasználónév" aria-label="Username" aria-describedby="basic-addon1"></li>
                        <li><label class="loginLabel navButton">Jelszó</label><input id="PasswordO" class="dropdown-item loginField" type="password" placeholder="jelszó" aria-label="Password" aria-describedby="basic-addon1"></li>
                        <li><p class="reg"><a class="dropdown-item text-end reg" href="registration.html">Regisztráció</a></p></li>
                        <li><hr class="dropdown-divider"></li>
                        <li><a class="dropdown-item loginLogout  loginButton"  type="submit"  onclick="login()">Bejelentkezés</a></li>
                        <li>
                            <div class="dropdown-item loggedin">
                                <input class="checkBox" id="stayLoggedInO" type="checkbox">
                                <label for="stayLoggedInO">Bejelentkezve&nbsp;marad</label>
                            </div>
                        </li></form>`;

    
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
function logout()
{
    try
    {
        localStorage.clear();
        sessionStorage.clear();
        userDropdown();
        window.location.href="index.html";
    }
    catch(error)
    {
        console.error("logout error: ",error);
    }
}


async function users()
{
    const addition= document.getElementById("content");
    addition.innerHTML="";

    const users= await getData("User/allUser");
    var place=document.getElementById("content");
    place.innerHTML="";
    var table=``;
    table+="<table class='table table-dark table-striped table-hover'> <tr><th>#</th><th>Felhasználónév</th><th>Név</th><th>Jogosultság</th><th></th></tr>";

    for(const e of users)
    {
        table+=`<tr><td>${e.id}</td><td>${e.username}</td><td>${e.name}</td><td>${addSelect(e.id,e.role)}</td><td><input id="changeButton_${e.id}" onclick='ChangeRoleInit("changeButton_${e.id}","role_${e.id}")' type="button" value="Módosítás"></td></tr>`;
    }

    table+=`</table>`;
    place.innerHTML=table;
}

async function ChangeRoleInit(button,select)
{
    var button=document.getElementById(button);
    var selector=document.getElementById(select);
    selector.disabled=false;
    button.value="Mentés";
    button.setAttribute("onclick","ChangeRole('"+select+"','"+idFromId(selector.id)+"');");

    console.log(button);
}
function idFromId(txt)
{
    var id="";
    for(var i in txt)
    {

        if(!isNaN(parseInt(txt[i]))) 
            {
                id+=txt[i];
            }
    }
    console.log(id);
    var i=parseInt(id);
    return i;
}

async function ChangeRole(roleid,id) 
{
    var Role=document.getElementById(roleid).value;
    console.log("role: "+Role);
    console.log("id: "+id);

    const response = await fetch(defaultUrl+"User/RoleChange",{
        method: "PATCH",
        headers:{
            "Content-Type": "application/json",
            Authorization: "bearer " + JSON.parse(sessionStorage.getItem("data")).token
        },
        body: JSON.stringify({userId:id,role:Role})
    });
    console.log(response);


   location.reload();
}

function addSelect(id,current)
{
   const roles=["Admin","Trainer","User"];

   var select=`<select id="role_${id}" class="form-select select" disabled>`;

   for(var e in roles)
   {
    select+=`<option value="${roles[e]}" `;
    if(roles[e]==current) select+= `selected `;
    select+=`>${roles[e]}</option>`;
   }

   select+="</select>";
   
   return select;
}


async function tickets()
{
    const addition= document.getElementById("additional");
    addition.innerHTML="";

    const tickets= await getData("Ticket");
    var place=document.getElementById("content");
    place.innerHTML="";
    var table=``;
    table+="<table class='table table-dark table-striped table-hover'> <tr><th>#</th><th>Kép</th><th>Név</th><th>Idő</th><th>Ár</th><th></th></tr>";

    for(const e of tickets)
    {
        let imgSrc= await img(e.imgUrl);
        table+=`<tr><td>${e.id}</td><td><img src="${imgSrc}"></td><td>${e.name}</td><td>${e.duration}</td><td>${e.price}</td><td><a class="btn changeBtn" onclick="ChangeTicket(${e.id},'${e.name}',${e.duration},${e.price})">Módosítás</a></td></tr>`;
    }

    table+=`<tr><td colspan="7"> <a class="btn btn-dark newticket" onclick="newTicketForm()">új jegytípus hozzáadása</a></td></tr>`;
    table+=`</table>`;

    place.innerHTML=table;

}
async function newTicketForm()
{
    const addition= document.getElementById("additional");
    if(addition.innerHTML==``||addition.innerHTML==null)
    addition.innerHTML+=`
    <form id="uploadFormT">
                        <table>
                            <tr>
                                <td class="text-end"><label>Elnevezés:</label></td>
                                <td><input class="input" type="text" id="name" required><br></td>
                            </tr>
                            <tr>
                                <td class="text-end"><label>Időtartalma:</label></td>
                                <td><input class="input" type="text" id="duration" required><br></td>
                            </tr>
                            <tr>
                                <td class="text-end"><label >Ár:</label></td>
                                <td><input class="input" type="number" id="price" required><br></td>
                            </tr>
                            <tr>
                                <td class="text-end"><label>Képe:</label></td>
                                <td><input class="ImgInput" type="file" id="image" accept="image/*" required><br></td>
                            </tr>
                            <tr>
                                <td colspan="2"><button class="btn uplBtn" type="submit">Feltöltés</button></td>
                            </tr>
                        </table></form>`;

    else addition.innerHTML=``;
    
}





async function classes()
{
    const addition= document.getElementById("additional");
    addition.innerHTML="";

    const classes= await getData("Class");
    var place=document.getElementById("content");
    place.innerHTML="";
    var table=``;
    table+="<table class='table table-dark table-striped table-hover'> <tr><th>#</th><th>Kép</th><th>Név</th><th>Leírás</th><th>Dátum</th><th>Ár</th><th>Edző</th><th></th></tr>";

    for(const e of classes)
    {
        let imgSrc=await img(e.imgUrl);
        table+=`<tr><td>${e.id}</td><td>${imgSrc}</td><td>${e.name}</td><td>${e.description}</td><td>${new Date(e.date)}</td><td>${e.price}</td><td>${e.trainerName}</td><td><a class="btn btn-dark">Módosítás</a></td></tr>`;
    }

    table+=`<tr><td colspan="8"> <a class="btn btn-dark newClass" onclick="newClassForm()">Új edzés hozzáadása</a></td></tr>`;
    table+=`</table>`;
    place.innerHTML=table;
}

function newClassForm()
{
    const addition= document.getElementById("additional");
    if(addition.innerHTML==``||addition.innerHTML==null)
    addition.innerHTML+=`
    <form id="uploadFormC">
                        <table>
                            <tr>
                                <td class="text-end"><label>Elnevezés:</label></td>
                                <td><input class="input" type="text" id="name" required><br></td>
                            </tr>
                            <tr>
                                <td class="text-end"><label>Leírás:</label></td>
                                <td><input class="input" type="text" id="description" required><br></td>
                            </tr>
                            <tr>
                                <td class="text-end"><label>Dátum:</label></td>
                                <td><input class="input" type="datetime-local" id="date" required><br></td>
                            </tr>
                            <tr>
                                <td class="text-end"><label >Ár:</label></td>
                                <td><input class="input" type="number" id="price" required><br></td>
                            </tr>
                            <tr>
                                <td class="text-end"><label>Edző:</label></td>
                                <td><input class="input" type="text" id="trainer" required><br></td>
                            </tr>
                            <tr>
                                <td class="text-end"><label>Képe:</label></td>
                                <td><input class="ImgInput" type="file" id="image" accept="image/*" required><br></td>
                            </tr>
                            <tr>
                                <td colspan="2"><button class="btn " type="submit">Feltöltés</button></td>
                            </tr>
                        </table></form>`;

    else addition.innerHTML=``;
}
//img to blob
async function img(url) 
{
    console.log(url);
    try
    {
        const imgResponse=await fetch(url);

        const blob=await imgResponse.blob();

        const blobUrl=URL.createObjectURL(blob);

        return blobUrl;
    }
    catch(error)
    {
        console.error("error loading img: ",error);
        return "";
    }
}

async function ChangeTicket(id,name,duration, price)   
{
    const addition= document.getElementById("additional");
    if(addition.innerHTML==``||addition.innerHTML==null)
    addition.innerHTML+=`
    <form id="updateFormT">
                        <table>
                            <tr>
                                <td class="text-end"><label>Sorszám:</label></td>
                                <td id="id">${id}</td>
                            </tr>
                            <tr>
                                <td class="text-end"><label>Elnevezés:</label></td>
                                <td>${name}</td>
                            </tr>
                            <tr>
                                <td class="text-end"><label>Időtartalma:</label></td>
                                <td>${duration}</td>
                            </tr>
                            <tr>
                                <td class="text-end"><label >Ár:</label></td>
                                <td><input class="input" type="number" id="price" name="${price}" value="${price}"></td>
                            </tr>
                            <tr>
                                <td class="text-end"><label>Képe:</label></td>
                                <td><input class="ImgInput" type="file" id="image" accept="image/*" </td>
                            </tr>
                            <tr>
                                <td colspan="2"><button class="btn " type="submit">Feltöltés</button></td>
                            </tr>
                        </table></form>`;

    else addition.innerHTML=``;
}





const observer = new MutationObserver(() => {
    const uploadForm = document.getElementById("uploadFormT")?document.getElementById("uploadFormT"):document.getElementById("uploadFormC")?document.getElementById("uploadFormC"):document.getElementById("updateFormT");

    if(uploadForm!==null)
    {
        if (uploadForm.id==="uploadFormT") 
        {
            console.log(uploadForm.id);

            uploadForm.addEventListener("submit", async function (event) {
                event.preventDefault();

                await uploadTicket();
            });
            // Mark the form to prevent duplicate listeners
            uploadForm.dataset.listenerAdded = "true";
        }
        else if(uploadForm.id==="uploadFormC")
        {
            console.log(uploadForm.id);
        }
        else if(uploadForm.id==="updateFormT")
        {
            console.log(uploadForm.id);
            
            uploadForm.addEventListener("submit", async function (event) {
                event.preventDefault();

                await updateTicket(document.getElementById("id").innerHTML, document.getElementById("price").value,document.getElementById("price").name,document.getElementById("image").files);
            });

            uploadForm.dataset.listenerAdded = "true";
        }
    }
});

async function uploadTicket()
{
    let formData = new FormData();
    formData.append("Name", document.getElementById("name").value);
    formData.append("Duration", document.getElementById("duration").value);
    formData.append("Price", document.getElementById("price").value);
    formData.append("Image", document.getElementById("image").files[0]);

    console.log(formData.getAll("Name"));
    const response = fetch(defaultUrl+"Ticket/NewTicket",{
        method: "POST",
        headers:{
            Authorization: "bearer " + JSON.parse(sessionStorage.getItem("data")).token
        },
        body: formData

    });

    console.log(response);
}

async function updateTicket(id,newPrice,oldPrice,file)
{
    console.log(id,newPrice,oldPrice,file);
    if(newPrice!=oldPrice)
    {
        const response = await fetch(defaultUrl+"Ticket/ChangePrice/"+id,{
            method: "PATCH",
            headers:{
                "Content-Type": "application/json",
                Authorization: "bearer " + JSON.parse(sessionStorage.getItem("data")).token
            },
            body: JSON.stringify({price:newPrice})
        });

        console.log(response);
    }
    if(file.lenght>0)
    {
        const response = await fetch(defaultUrl+"Ticket/ChangeImage/"+id,{
            method: "PATCH",
            headers:{
                Authorization: "bearer " + JSON.parse(sessionStorage.getItem("data")).token
            },
            body: file[0]
        });
    }

    location.reload();
}
// Start observing changes in the document body
observer.observe(document.body, { childList: true, subtree: true });