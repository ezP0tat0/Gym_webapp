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
    addition.innerHTML+=`
    <form id="uploadForm">
        <h3>Új jegy hozzáadása</h3>
        <label>Elnevezés:</label>
        <input type="text" id="name" required><br>

        <label>Ár:</label>
        <input type="text" id="price" required><br>

        <label>Időtartalma:</label>
        <input type="text" id="duration" required><br>

        <label>Képe:</label>
        <input type="file" id="image" accept="image/*" required><br>

        <button class="btn btn-dark" type="submit">Feltöltés</button>
    </form>`;
    
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
/*
async function postData(url = "", data = {}, needAuth = true) {
    // Default options are marked with *
    const response = await fetch(defaultUrl + url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
            "Content-Type": "application/json",
            Authorization: "bearer " + (needAuth ? JSON.parse(localStorage.getItem("data")).token : null),
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: testJSON(data) ? data : JSON.stringify(data), // body data type must match "Content-Type" header
        processData: false,
        contentType: false,
    });
    console.log(response);
    if (response.status === 401 || response.status === 403) {
        logout();
    }
    try {
        return await response.json(); // parses JSON response into native JavaScript objects
    } catch (error) {
        console.error("Error parsing JSON:", error);
        return {}; // or handle the error as per your requirement
    }
}
async function getData(url = "", needAuth = true) {
    // Default options are marked with *
    const response = await fetch(defaultUrl + url, {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + (needAuth ? JSON.parse(localStorage.getItem("data")).token : null),
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    });
    if (response.status === 401 || response.status === 403) {
        logout();
    }
    return response.json(); // parses JSON response into native JavaScript objects
}*/