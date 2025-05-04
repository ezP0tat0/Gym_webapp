async function getUserData()
{

  const content=document.getElementsByClassName("content");
  content[0].innerHTML=``;
  content[1].innerHTML=``;

  const data = await getData("User");
  console.log(data);
  var ihtml=`
    <table class='table table-dark table-striped table-hover'>
      <tr>
        <td>Felhasználónév:</td>
        <td>${data.username}</td>
        <td></td>
      <tr>
      <tr>
        <td>Név:</td>
        <td>${data.name}</td>
        <td></td>
        ${data.role=="Trainer"?await trainerData(data.id):""}

    </table>

    `;
    content[0].innerHTML=ihtml;
    content[1].innerHTML=ihtml;
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
async function trainerData(id)
{
  const data=await getData("User/oneTrainer/"+id);
  console.log(data);
  let imgSrc=await img(data.imgUrl);
  var text=`<tr>
    <td>Szakosodás:</td>
    <td id="Exptd">${data.expertise==''?'Nincs megadva':data.expertise}</td>
    <td>
      <input class="buttonColor btn btn-primary" id="changeExp" onclick='changeInit("Exptd")' type="button" value="Módosítás">
    </td>
    </tr>
    <tr>
    <td>tel:</td>
    <td id="PNtd">${data.phoneNumber==''?'Nincs megadva':data.phoneNumber}</td>
    <td>
      <input class="buttonColor btn btn-primary" id="changePN" onclick='changeInit("PNtd")' type="button" value="Módosítás">
    </td>
    </tr>
      <tr>
        <td>Kép:</td>
        <td id="Imgtd"><img style="width:70%;height:auto;max-width:10rem" src="${imgSrc}"></td>
        <td>
          <input class="buttonColor btn btn-primary" id="changeImg" onclick='changeInit("Imgtd")' type="button" value="Módosítás">
        </td>
      <tr>
  `;
  return text;
}
function changeInit(id)
{
  const td=document.getElementById(id);
  if(id==="Imgtd")
    td.innerHTML=`
      <input id="${id}Input" type="file" accept="image/*">
     `;
  else
    td.innerHTML=`
      <input id="${id}Input" type="text" value="${td.innerHTML}">
    `;
  const button=document.getElementById(id==="Exptd"?"changeExp":id==="changePN"?"changePN":"changeImg");
  button.setAttribute("onclick",`updateTrainerInfo('${id}');`);
  button.value="Mentés";

}

async function updateTrainerInfo(tdId) 
{
  if(tdId==="Exptd")
  {
    const exp=document.getElementById('ExptdInput').value;
    console.log(exp);

    const response=await patchData("User/Expertise",{text:exp});
    console.log(response);
  }
  else if(tdId==="PNtd")
  {
    const pn=document.getElementById('PNtdInput').value;
    console.log(pn);

    const response=await patchData("User/AddPhoneNo",{text:pn});
    console.log(response);
  }
  else if(tdId==="Imgtd")
  {
    const file=document.getElementById('ImgtdInput').files;
    const formData = new FormData();
    formData.append('Image',file[0]);

    const response = await fetch(defaultUrl+"User/ChangeImg",{
      method: "PATCH",
      headers:{
          Authorization: "bearer " + JSON.parse(sessionStorage.getItem("data")).token
      },
      body: formData
  });
    console.log(response);
  }
  location.reload();
}
async function myTickets()
{
  
  const content=document.getElementsByClassName("content");
  content[0].innerHTML=``;
  content[1].innerHTML=``;

  const myTickets=await getData("Ticket/myTickets");

  var table=`<table class='table table-dark table-striped table-hover'>
        <tr>
        <th>Megnevezés</th>
        <th>Érvényességi idő</th>
        <th></th>
        <th>Aktív</th>
        </tr>`;
    myTickets.forEach(e => {
      table+=`<tr>
        <td>${e.ticketName}</td>
        <td>${e.ticketDuration}</td>
        <td><input class="buttonColor btn btn-primary useTicketBtn" type="button" value="felhasználás" onclick="useTicket(${e.boughtTicketId})"></td>
        <td class="activeTicket"></td>
        </tr>`;
    });
    activeTickets(myTickets);

    table+=`</table>`;

    content[0].innerHTML=table;
    content[1].innerHTML=table;
}

async function useTicket(id) 
{
  console.log(id);
  const response=await postData("Ticket/useTicket",{boughtTicketId: id});

  console.log(response);
}

async function activeTickets(tickets)
{
  const aciveT=document.getElementsByClassName('activeTicket');
  const activeTickets= await getData("Ticket/activeTickets");
 
  console.log(tickets);
  console.log(activeTickets);
  for(var i=0;i<tickets.length;i++)
  {
    var code;
    for(var e in activeTickets)
    {
      console.log("e: ",e," i: ",i);
      console.log(activeTickets[e].boughtTicketId,"----",tickets[i].boughtTicketId);
      if(activeTickets[e].boughtTicketId==tickets[i].boughtTicketId)
      {
        aciveT[i].innerHTML=`${activeTickets[e].accessCode}`;
        break;
      }
      else aciveT[i].innerHTML=`nem aktív`;
    }
  }
  //get active tickets funvction to backend!!!!!!!
}

async function deleteProfile()
{
  if(confirm("Biztos törölni szeretné a fiókot?\n Végelegesen törlődik minden"))
  {
    const response=await fetch(defaultUrl+"User/DeleteUser",{
      method: "PATCH",
        headers:{
            "Content-Type": "application/json",
            Authorization: "bearer " + JSON.parse(sessionStorage.getItem("data")).token
        },
        body: JSON.stringify({userId:0})
    });
    console.log(response);

    window.location="index.html";
  }
}

function exerciseLog()
{
  const content=document.getElementById("exLog");
  content.innerHTML=``;
  
  var text=`
    <div class="row">
    <div class="col">
      <input class="buttonColor btn btn-primary" type="button" value="Gyakorlat felvitele" onclick="addExercise()">
      <input class="buttonColor btn btn-primary" type="button" value="Edzések listázása" onclick="getExerciseLogs()">
    </div>
  </div>
  <div class="row">
    <div class="col">
      <div id="stuff">

      </div>
    </div>
  </div>
  `;
  content.innerHTML=text;
  
}
async function myClasses()
{
  const content=document.getElementsByClassName("content");
  content[0].innerHTML=``;
  content[1].innerHTML=``;

  const myClasses=await getData("Class/MyClasses");
  console.log(myClasses);
  var table=`<table class='table table-dark table-striped table-hover'>
        <tr>
        <th>Kép</th>
        <th>Megnevezés</th>
        <th>Leírás</th>
        <th>Dátum</th>
        <th>Időtartam</th>
        <th>Edző</th>
        </tr>`;
    myClasses.forEach(e => {
      let imgSrc=img=(e.imgUrl);
      table+=`<tr>
        <td><img style="width:70%;height:auto;max-width:10rem" src="${imgSrc}"></td>
        <td>${e.name}</td>
        <td>${e.description}</td>
        <td>${e.date}</td>
        <td>${e.duration}</td>
        <td>${e.trainerName}</td>
        </tr>`;
    });


    table+=`</table>`;
    content[0].innerHTML=table;
    content[1].innerHTML=table;

    if(userData.role==="Trainer")
    {
      const newClassDiv=document.getElementsByClassName('newClass');
      newClassDiv[0].innerHTML=`<input class="buttonColor btn btn-primary" id="newClassInitBtn" onclick='newClassInit()' type="button" value="Új edzés felvétele">`;
      newClassDiv[1].innerHTML=`<input class="buttonColor btn btn-primary" id="newClassInitBtn" onclick='newClassInit()' type="button" value="Új edzés felvétele">`;
    }

}

function newClassInit()
{
  const newClassDiv=document.getElementsByClassName('newClass');
  var form=`<form>
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
                                <td class="text-end"><label>Edző:</label></td>
                                <td><input class="input" type="text" id="trainer" required><br></td>
                            </tr>
                            <tr>
                                <td class="text-end"><label>Képe:</label></td>
                                <td><input class="ImgInput" type="file" id="image" accept="image/*" required><br></td>
                            </tr>
                            <tr>
                                <td colspan="2"><button class="btn " type="button" onclick="uploadClass()">Feltöltés</button></td>
                            </tr>
                        </table></form>`;
                  
  newClassDiv[0].innerHTML=form;
  newClassDiv[1].innerHTML=form;
}

async function uploadClass() //ez sem jó
{
  const name=document.getElementById('name').value;
    const description=document.getElementById('description').value;
    const date=document.getElementById('date').value;
    const trainer=document.getElementById('trainer').value;
    const image=document.getElementById('image').files[0];

    const formData= new FormData();
    formData.append('Name',name);
    formData.append('description',description);
    formData.append('date',date);
    formData.append('TrainerName',trainer);
    formData.append('image',image);

    const response =  await fetch(defaultUrl+"Class/newClass",{
        method:"POST",
        headers:{
            Authorization: "bearer " + JSON.parse(sessionStorage.getItem("data")).token
        },
        body: formData
    });

    console.log(response);
}

