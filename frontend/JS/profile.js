async function getUserData()
{

  const content=document.getElementById("content");
  content.innerHTML=``;

  const data = await getData("User");
  console.log(data);
  
  var ihtml=`
    <table class='table table-dark table-striped table-hover'>
      <tr>
        <td>Felhasználónév:</td>
        <td>${data.username}</td>
      <tr>
      <tr>
        <td>Név:</td>
        <td>${data.name}</td>
    </table>

    `;
    content.innerHTML=ihtml;
}

async function myTickets()
{
  const content=document.getElementById("content");
  content.innerHTML=``;

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
        <td><input type="button" value="felhasználás" onclick="useTicket(${e.boughtTicketId})"></td>
        <td class="activeTicket"></td>
        </tr>`;
    });
    activeTickets(myTickets);

    table+=`</table>`;

    content.innerHTML=table;
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
        aciveT[i].innerHTML=`${e.accessCode}`;
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

