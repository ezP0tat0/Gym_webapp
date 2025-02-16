var user=sessionStorage.getItem('data');
var userData=JSON.parse(user);
window.onload=function()
{
    console.log(userData);}
async function users()
{

}
async function tickets()
{
    const tickets= await getData("Ticket");
    var place=document.getElementById("content");
    place.innerHTML="";
    place.innerHTML+="<table class='table table-dark table-striped table-hover'> <tr><th>#</th><th>Kép</th><th>Név</th><th>Idő</th><th>Ár</th><th><th></tr>";

    for(const e of tickets)
    {
        let imgSrc= await img(e.imgUrl);
    
        place.innerHTML+=`<tr><td><img src="${imgSrc}"></td><td>${e.Id}</td><td>${e.Name}</td><td>${e.Duration}</td><td>${e.Price}</td><td><a class="btn btn-dark">Módosítás</a></td></tr>`;
    }
    place.innerHTML+=`<tr><td colspan="7"> <a class="btn btn-dark newticket" onclick="newTicket()">új jegytípus hozzáadása</a></td></tr>`;
    place.innerHTML+=`</table>`;
    
    
}
async function newTicket()
{
    const addition= document.getElementById("additional");
    if(addition.innerHTML==``||addition.innerHTML==null)
    addition.innerHTML+=`
    <form id="uploadForm">
                        <table>
                            <tr>
                                <td class="text-end"><label>Elnevezés:</label></td>
                                <td><input class="input" type="text" id="name" required><br></td>
                            </tr>
                            <tr>
                                <td class="text-end"><label>Időtartalma:</label></td>
                                <td><input class="input" type="number" id="duration" required><br></td>
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
                                <td colspan="2"><button class="btn " type="submit" onclick="uploadTicket()">Feltöltés</button></td>
                            </tr>
                        </table></form>`;

    else addition.innerHTML=``;
    
}
async function classes()
{

}

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

var defaultUrl= "https://localhost:7289/api/";
var uploadForm = document.getElementById("uploadForm");
if(uploadForm !== null)
    uploadForm.addEventListener("submit",async function (event) {
   event.preventDefault(); 

   let formData = new FormData();
   formData.append("name",document.getElementById("name").value);
   formData.append("duration",document.getElementById("duration").value);
   formData.append("price",document.getElementById("price").value);
   formData.append("image",document.getElementById("image").files[0]);

   fetch(defaultUrl+"Ticket/NewTicket",
    {
        method: "POST",
        body: formData
    }).then(response => response.json()).then(data => { console.log(data); alert(data);})
    .catch(error=>{console.log(error); alert(error);});
});