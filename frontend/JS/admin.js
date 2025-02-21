var user=sessionStorage.getItem('data');
var userData=JSON.parse(user);
window.onload=function()
{
    console.log(userData);
}

async function users()
{
    const addition= document.getElementById("additional");
    addition.innerHTML="";

    const users= await getData("User/allUser");
    var place=document.getElementById("content");
    place.innerHTML="";
    var table=``;
    table+="<table class='table table-dark table-striped table-hover'> <tr><th>#</th><th>Felhasználónév</th><th>Név</th><th>Jogosultság</th><th></th></tr>";

    for(const e of users)
    {
        table+=`<tr><td>${e.id}</td><td>${e.username}</td><td>${e.name}</td><td>${e.role}</td><td><a class="btn btn-dark">Módosítás</a></td></tr>`;
    }

    table+=`</table>`;
    place.innerHTML=table;
}


async function tickets()
{
    const tickets= await getData("Ticket");
    var place=document.getElementById("content");
    place.innerHTML="";
    var table=``;
    table+="<table class='table table-dark table-striped table-hover'> <tr><th>#</th><th>Kép</th><th>Név</th><th>Idő</th><th>Ár</th><th></th></tr>";

    for(const e of tickets)
    {
        let imgSrc= await img(e.imgUrl);
    
        table+=`<tr><td>${e.id}</td><td><img src="${imgSrc}"></td><td>${e.name}</td><td>${e.duration}</td><td>${e.price}</td><td><a class="btn btn-dark">Módosítás</a></td></tr>`;
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
                                <td colspan="2"><button class="btn " type="submit">Feltöltés</button></td>
                            </tr>
                        </table></form>`;

    else addition.innerHTML=``;
    
}



//uploadForm for tickets
const observerT = new MutationObserver(() => {
    const uploadForm = document.getElementById("uploadFormT");
    if (uploadForm) 
    {
        uploadForm.addEventListener("submit", async function (event) {
            event.preventDefault();

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
        });
        // Mark the form to prevent duplicate listeners
        uploadForm.dataset.listenerAdded = "true";
    }
});
// Start observing changes in the document body
observerT.observe(document.body, { childList: true, subtree: true });



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
const observerC = new MutationObserver(() => {
    const uploadForm = document.getElementById("uploadFormC");
    if (uploadForm) 
    {
        uploadForm.addEventListener("submit", async function (event) {
            event.preventDefault();

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
        });
        // Mark the form to prevent duplicate listeners
        uploadForm.dataset.listenerAdded = "true";
    }
});
// Start observing changes in the document body
observerC.observe(document.body, { childList: true, subtree: true });



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