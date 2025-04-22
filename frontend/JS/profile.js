async function getUserData()
{
  const data = await getData("User");
  console.log(data);
  
  const content=document.getElementById("content");
  var ihtml=`
    <table>
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

async function deleteProfile()
{
  console.log("in");
  if(confirm("Biztos törölni szeretné a fiókot?\n Végelegesen törlődik minden"))
    //await fetch(defaultUrl+"User/DeleteUser");

  window.location="index.html";
}


function makeTable(data)
{
  var table=`<table>`;
  for(var i in data)
  {
  }
}