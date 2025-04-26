async function getUserData()
{
  const data = await getData("User");
  console.log(data);
  
  const content=document.getElementById("content");
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
  const myTickets=await getData("Ticket/myTickets");
  console.log(myTickets);
}

async function deleteProfile()
{
  console.log("in");
  if(confirm("Biztos törölni szeretné a fiókot?\n Végelegesen törlődik minden"))
    //await fetch(defaultUrl+"User/DeleteUser");

  window.location="index.html";

}


function makeTable(data)
{
  const dataArray=Array.isArray(data)?data:[data];
  console.log(data);

  var table=`<table border="1">`;
  

  dataArray.forEach(e => {
    const fields=Object.keys(e);

    fields.forEach(f => {
      table+=`<tr>
      <td>${f}</td>
      <td>${e[f]}</td
      <tr>`;
    });
  });
  table+=`</table>`;

  return table;
}