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
  console.log(myTickets);

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

    console.log(table);
    table+=`</table>`;

    console.log(table);
    content.innerHTML=table;
}

async function useTicket(id) 
{
  const response=await postData("Ticket/useTicket",{boughtTicketId: id});

  console.log(response);
}

async function activeTickets()
{
  const aciveT=document.getElementsByClassName('activeTickets');
  //get active tickets funvction to backend!!!!!!!
}

async function deleteProfile()
{
  console.log("in");
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

