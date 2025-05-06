var user=sessionStorage.getItem('data');

//if(localStorage.getItem('data')!= null) user=localStorage.getItem('data');

var userData=JSON.parse(user);
var defaultUrl= "https://localhost:7289/api/";

window.onload=function()
{
    ////console.log(userData);
    userDropdown();
    var currentWindow=window.location.pathname.split('/').slice(-1);
    if(currentWindow[0] != "index.html" && currentWindow[0]!= "aboutUs.html" && currentWindow[0]!="profil.html") ShowCards();
    else if(currentWindow[0] == "index.html")
    {
      showTickets();
      showTrainers();
      showClasses();
    }
}


function userDropdown()
{
    var uls = document.getElementById("userDropdownStandard");
    var ulo = document.getElementById("userDropdownOffCanvas");

    if(!uls && !ulo)
    {
      console.error("Dropdown now found");
      return;
    }

    if(userData === null)
    {
        uls.innerHTML=`  <form class="loginForm"><li><label class="loginLabel navButton">Felhasználónév</label><input id="UsernameS" class="dropdown-item loginField" type="text" placeholder="felhasználónév" aria-label="Username" aria-describedby="basic-addon1" autocomplete="username"></li>
                        <li><label class="loginLabel navButton">Jelszó</label><input id="PasswordS" class="dropdown-item loginField" type="password" placeholder="jelszó" aria-label="Password" aria-describedby="basic-addon1" autocomplete="current-password"></li>
                        <li><p class="reg"><a class="dropdown-item text-end reg" href="registration.html">Regisztráció</a></p></li>
                        <li><hr class="dropdown-divider"></li>
                        <li><a class="dropdown-item loginButton" type="submit" onclick="login()">bejelentkezés</a></li>
                        <li>
                            <div class="dropdown-item loggedin">
                                <input class="checkBox" id="stayLoggedInS" type="checkbox">
                                <label for="stayLoggedInS">Bejelentkezve&nbsp;marad</label>
                            </div>
                        </li></form>`;
        ulo.innerHTML=`  <form  class="loginForm"><li><label class="loginLabel navButton">Felhasználónév</label><input id="UsernameO" class="dropdown-item loginField" type="text" placeholder="felhasználónév" aria-label="Username" aria-describedby="basic-addon1"  autocomplete="username"></li>
                        <li><label class="loginLabel navButton">Jelszó</label><input id="PasswordO" class="dropdown-item loginField" type="password" placeholder="jelszó" aria-label="Password" aria-describedby="basic-addon1"  autocomplete="current-password"></li>
                        <li><p class="reg"><a class="dropdown-item text-end reg" href="registration.html">Regisztráció</a></p></li>
                        <li><hr class="dropdown-divider"></li>
                        <li><a class="dropdown-item loginLogout  loginButton"  type="submit"  onclick="login()">Bejelentkezés</a></li>
                        <li>
                            <div class="dropdown-item loggedin">
                                <input class="checkBox" id="stayLoggedInO" type="checkbox">
                                <label for="stayLoggedInO">Bejelentkezve&nbsp;marad</label>
                            </div>
                        </li></form>`;

        //login with enter
        const loginform=document.getElementsByClassName("loginForm");
        
        for(const e of loginform) e.addEventListener("keyup",async function(event){
            if(event.keyCode === 13)
            {
                event.preventDefault();
                login();
            }
        })
    } 
    else
    {
        uls.innerHTML=`  <li><a class="dropdown-item format" href="profil.html">Profil</a></li>
                        <li><a class="dropdown-item  format" onclick="myTicketsShortcut()">Jegyeim</a></li>
                        ${userData.role=="Admin"?`<li><a class="dropdown-item format" href="adminPage.html">Admin oldal</a></li>`:""}
                        <li><hr class="dropdown-divider"></li>
                        <li><a class="dropdown-item logout" onclick="logout()">Kijelentkezés</a></li>`;
        
        
        ulo.innerHTML=uls.innerHTML;
    }

    if(uls)
    {
      uls.addEventListener("click", function(event){
        if(event.target.id!=="stayLoggedInS")event.stopPropagation();
      });

      const slis=document.getElementById("stayLoggedInS");
      if(slis)
        slis.addEventListener("click", function(event){
          event.stopPropagation();
        });
    }
    if(ulo)
    {
      ulo.addEventListener("click", function(event){
        if(event.target.id!=="stayLoggedInO") event.stopPropagation();
      });

      const slio=document.getElementById("stayLoggedInO");
      if(slio)
        slio.addEventListener("click", function(event){
          event.stopPropagation();
        });
    }


}

function displayUserInfo()
{
    if(user)
    {
        document.getElementById("profileData").innerHTML=
        `</br>${userData.username} </br>`;
    } 
}
function logout()
{
    try
    {
        localStorage.clear();
        sessionStorage.clear();
        userDropdown();
    }
    catch(error)
    {
        console.error("logout error: ",error);
    }
}
async function showTickets() 
{
    var div = document.getElementById("tickets");
    var displayNo=3;

    var tickets=await getData("Ticket",false);
    var standardOut=`<div class="row d-none d-lg-flex">`;
    var carouselOut=`<div class="row d-lg-none"><div class="col"> <div id="carousel" class="carousel slide"><div class="carousel-inner">`;


    for(var i=0;i<displayNo;i++)
    {
        let imgSrc= await img(tickets[i].imgUrl);
        standardOut+=`
                <div class="col">
                  <div class="card">
                    <img class="card-img-top card cardImgs" src="${imgSrc}" alt="card image cap">
                    <div class="card-body">
                      <h4>${tickets[i].name}</h4>
                      <!--<p class="card-text">${tickets[i].description}</p>-->
                      <p class="card-text price">Ár: ${tickets[i].price} ft</p>
                      <a href="#" class="btn btn-primary btnColor" onclick="purchaseTicket(${tickets[i].id})">vásárlás</a>
                    </div>
                  </div>
                </div>
        `;

        carouselOut+=`
                <div class="carousel-item ${i==0?"active":""}">
                    <div class="card carouselCard">
                      <img class="card-img-top card cardImgs" src="${imgSrc}" alt="card image cap">
                      <div class="card-body">
                        <h4>${tickets[i].name}</h4>
                      <!--<p class="card-text">${tickets[i].description}</p>-->
                      <p class="card-text price">Ár: ${tickets[i].price} ft</p>
                        <a href="#" class="btn btn-primary btnColor" onclick="purchaseTicket(${tickets[i].id})">vásárlás</a>
                      </div>
                    </div>
                  </div>
        `;
    }
    standardOut+=`</div>`;
    carouselOut+=`
            </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carousel" data-bs-slide="prev">
                  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carousel" data-bs-slide="next">
                  <span class="carousel-control-next-icon" aria-hidden="true"></span>
                  <span class="visually-hidden">Next</span>
                </button>
              </div>
            </div>
          </div>`;

          div.innerHTML=standardOut+carouselOut;
}

async function showTrainers()
{
  var div = document.getElementById("trainers");
  
  
  var trainers=await getData("User/Trainers",false);
  var displayNo=trainers.length >=  3  ? 3 : trainers.length;

  if(trainers.length===0)
  {
    div.innerHTML=`<h2>Nincs regisztrált edző a nyilvántartásban</h2>`;
    return;
  }
  else
  {
    var standardOut=`<div class="row d-none d-lg-flex">`;
    var carouselOut=`<div class="row d-lg-none"><div class="col"> <div id="carouselT" class="carousel slide"><div class="carousel-inner">`;
    
    for(var i=0;i<displayNo;i++)
    {
      let imgSrc= await img(trainers[i].imgUrl);

        standardOut+=`
                <div class="col">
                  <div class="card">
                    <img class="card-img-top card cardImgs" src="${imgSrc}" alt="card image cap">         
                    <div class="card-body">
                      <h5 id="name1">${trainers[i].name}</h5>
                      <p id="expertise1" class="card-text">${trainers[i].expertise}</p>
                      <p id="phoneNo1" class="card-text"><a href="tel:${trainers[i].phoneNumber}">${trainers[i].phoneNumber===''?'Nem adott meg telefonszámot':trainers[i].phoneNumber}</a></p>
                    </div>
                  </div>
                </div>
        `;
        carouselOut+=`
                    <div class="carousel-item  ${i==0?"active":""}">
                      <div class="card carouselCard">
                        <img class="card-img-top card cardImgs" src="${imgSrc}" alt="card image cap">         
                        <div class="card-body">
                          <h5 id="name1">${trainers[i].name}</h5>
                          <p id="expertise1" class="card-text">${trainers[i].expertise}</p>
                          <p id="phoneNo1" class="card-text"><a href="tel:${trainers[i].phoneNumber}">${trainers[i].phoneNumber===''?'Nem adott meg telefonszámot':trainers[i].phoneNumber}</a></p>
                        </div>
                      </div>
                    </div>
        `;
    }
    standardOut+=`</div>`;
    carouselOut+=`
            </div>
                <button name="nnnnnn" class="carousel-control-prev" type="button" data-bs-target="#carouselT" data-bs-slide="prev">
                  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselT" data-bs-slide="next">
                  <span class="carousel-control-next-icon" aria-hidden="true"></span>
                  <span class="visually-hidden">Next</span>
                </button>
              </div>
            </div>
          </div>`;
  
  }

  div.innerHTML=standardOut+carouselOut;

}

async function showClasses()
{
  var div = document.getElementById("classes");
  
  
  var classes=await getData("Class",false);
  var displayNo=classes.length >=  3  ? 3 : classes.length;
  if(classes.length===0)
  {
    div.innerHTML=`<h2>Jelenleg nincs kiírt edzés</h2>`;
    return;
  }
  else
  {
    var standardOut=`<div class="row d-none d-lg-flex">`;
    var carouselOut=`<div class="row d-lg-none"><div class="col"> <div id="carouselC" class="carousel slide"><div class="carousel-inner">`;
    
    for(var i=0;i<displayNo;i++)
    {
      let imgSrc= await img(classes[i].imgUrl);

      standardOut+=`
                <div class="col">
                  <div class="card">
                    <img class="card-img-top card cardImgs" src="${imgSrc}" alt="card image cap">         
                    <div class="card-body">
                      <h5 id="className1">${classes[i].name}</h5>
                      <p id="classTheme1" class="card-text">${classes[i].description}</p>
                      <p id="classTrainer1" class="card-text">${classes[i].trainerName}</p>
                      <p class="card-text">${classes[i].date}</p>
                      <a href="#" class="btn btn-primary btnColor" onclick="">jelentkezés</a>
                    </div>
                  </div>
                </div>
      `;

      carouselOut+=`
                   <div class="carousel-item  ${i==0?"active":""}">
                      <div class="card carouselCard">
                        <img class="card-img-top card cardImgs" src="${imgSrc}" alt="card image cap">         
                        <div class="card-body">
                          <h5 id="className1">${classes[i].name}</h5>
                          <p id="classTheme1" class="card-text">${classes[i].description}</p>
                          <p id="classTrainer1" class="card-text">${classes[i].trainerName}</p>
                          <p class="card-text">${classes[i].date}</p>
                          <a href="#" class="btn btn-primary btnColor" onclick="">jelentkezés</a>
                        </div>
                      </div>
                    </div>
      `;
    }
    standardOut+=`</div>`;
    carouselOut+=`
    </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselC" data-bs-slide="prev">
                  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselC" data-bs-slide="next">
                  <span class="carousel-control-next-icon" aria-hidden="true"></span>
                  <span class="visually-hidden">Next</span>
                </button>
              </div>
            </div>
          </div>`;

  }
  div.innerHTML=standardOut+carouselOut;
}

async function ShowCards()
{
  const page = window.location.pathname.split('/').slice(-1);
  var div = document.getElementById("content");
  var content=``;

  //get the right api path based on the page
  var apiPath;
  switch(page[0])
  {
    case "tickets.html":
      apiPath="Ticket";
      break;
    case "classes.html":
      if(userData!=null)
        if(userData.role==="Trainer") addTrainerButton();
      apiPath="Class";
      break;
    case "trainers.html":
      apiPath="User/Trainers";
      break;
    default:
      div.innerHTML=`<h2><b>Hiba az oldal betöltésekor</b></h2>`;
      return;
  }

  var data=await getData(apiPath,false); 

  //check if there is any data to display
  var noOfData=data.length;
  if(noOfData===0)
  {
    switch(page[0])
    {
      case "tickets.html":
        content=`<h2>Nem sikerült jegyeket betölteni</h2>`;
        break;
      case "classes.html":
        content=`<h2>Nincs kiírt edzés</h2>`;
        break;
      case "trainers.html":
        content=`<h2>Nincs regisztrált edző</h2>`;
        break;
      default:
        div.innerHTML=`<h2><b>Hiba az oldal adatok betöltésekor</b></h2>`;
        return;
    }
  }
  else
  {
    var addedToContent=0
    var NoOfRows=noOfData/3;
    content+=``;
    for(var i=0;i<NoOfRows;i++)
    {
      content+=`<div class="row">`;
      for(var j=0;j<3;j++)
      {
        if(addedToContent==noOfData) break;
        content+=await addCorrectCard(data[addedToContent],page[0]);
        addedToContent++;
      }
      content+=`</div>`;
    }
  }
  div.innerHTML=content;
}
function addTrainerButton()
{
  const place=document.getElementById('trainerBtn');
  place.innerHTML=`<input class="buttonColor btn btn-primary" type="button" value="Edzés hozzáadása" onclick="addNewClass()">`
}
function addNewClass()
{
  const place=document.getElementById('newClassForm');
  var text=`
    <form>
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
                                <td class="text-end"><label>Képe:</label></td>
                                <td><input class="ImgInput" type="file" id="image" accept="image/*" required><br></td>
                            </tr>
                            <tr>
                                <td colspan="2"><button class=" buttonColor btn btn-primary " type="button" onclick="uploadClass()">Feltöltés</button></td>
                            </tr>
                        </table></form>`;

    place.innerHTML=text;
}
async function uploadClass()
{
  const name=document.getElementById('name').value;
  const description=document.getElementById('description').value;
  const date=document.getElementById('date').value;
  const image=document.getElementById('image').files[0];

  const formData= new FormData();
  formData.append('Name',name);
  formData.append('description',description);
  formData.append('date',date);
  formData.append('TrainerName',userData.name);
  formData.append('image',image);

  const response =  await fetch(defaultUrl+"Class/newClass",{
      method:"POST",
      headers:{
          Authorization: "bearer " + JSON.parse(sessionStorage.getItem("data")).token
      },
      body: formData
  });

  console.log(response);

  location.reload();
}

async function addCorrectCard(data,page)
{
  let imgSrc=await img(data.imgUrl);
  switch(page)
  {
    case 'tickets.html':
      var content=``;
        content+=`<div class="col">
                <div class="card">
                    <img class="card-img-top card cardImgs" src="${imgSrc}" alt="card image cap">
                    <div class="card-body">
                      <h4>${data.name}</h4>
                      <!--<p class="card-text">${data.description}</p>-->
                      <p class="card-text price">Ár: ${data.price} ft</p>
                      <a href="#" class="btn btn-primary btnColor" onclick="purchaseTicket('${data.id}')">vásárlás</a>
                    </div>
                  </div>
                </div>
        `;
      break;
    case "classes.html":
      var content=``;
      content+=`
                <div class="col">
                  <div class="card">
                    <img class="card-img-top card cardImgs" src="${imgSrc}" alt="card image cap">         
                    <div class="card-body">
                      <h5 id="className1">${data.name}</h5>
                      <p id="classTheme1" class="card-text">${data.description}</p>
                      <p id="classTrainer1" class="card-text">${data.trainerName}</p>
                      <p class="card-text">${data.date}</p>
                      <a href="#" class="btn btn-primary btnColor" onclick="joinClass('${data.id}')">jelentkezés</a>
                    </div>
                  </div>
                </div>
      `;
      break;
    case "trainers.html":
      var content=``;
      content+=`
                <div class="col">
                  <div class="card">
                    <img class="card-img-top card cardImgs" src="${imgSrc}" alt="card image cap">         
                    <div class="card-body">
                      <h5 id="name1">${data.name}</h5>
                      <p id="expertise1" class="card-text">${data.expertise}</p>
                      <p id="phoneNo1" class="card-text"><a href="tel:${data.phoneNumber}">${data.phoneNumber===''?'Nem adott meg telefonszámot':data.phoneNumber}</a></p>
                    </div>
                  </div>
                </div>
        `;
        break;
    default:
      console.log("Unsupported page: ",page);
      return "";
  }
  return content;
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

function purchaseTicket(id)
{
  if(user==null) 
  {
    alert("Elöbb be kell jelentkeznie!");
    return;  
  }
  var wiw= window.open("purchase.html",'','height=500px,width=750px');
  wiw.ticketId=id;
}
let quickAccess=false;

async function myTicketsShortcut()
{
  quickAccess=true;
  console.log(quickAccess);
  window.location.href="profil.html";
}

async function joinClass(classId) 
{
  const response=await postData("Class/Join",classId);
  console.log(response);
}






