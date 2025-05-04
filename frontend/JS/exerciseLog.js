async function addExercise()
{
    const exercises= await getData("Logging/getExercises");
    console.log(exercises);
    const stuffDiv=document.getElementById('stuff');

    var text=`
    <form>
    <div class="row">
            <div class="col">
                <select id="exerciseSelect" class="form-select" aria-label="Default select">`;
    exercises.forEach(e => {
        text+=`<option value="${e.name}">${e.name}</option>`
    });
    text+=`</select>`;

    text+=`
    <div id="setGroup">
        <div class="row sets">
            <div class="col">
              <p id="No1">1.</p>
            </div>
            <div class="col">
              <input type="number" name="reps" id="reps1" value='0'>
            </div>
          </div>
          </div>
          <div class="row">
            <div class="col">
              <input class="buttonColor btn btn-primary" type="button" value="+" onclick="oneMore()">
              <input class="buttonColor btn btn-primary" type="button" value="-" onclick="oneLess()">
            </div>
          </div>
          <div class="row">
            <div class="col">
              <input class="buttonColor btn btn-primary" type="button" value="Hozzáad" onclick="logIt()">
            </div>
          </div>

        </form>    
    `;

    stuffDiv.innerHTML=text;

}
async function getExerciseLogs()
{
    const stuff=document.getElementById('stuff');
    stuff.innerHTML=``;
    console.log(logs);
    var text=`
        <table class='table table-dark table-striped table-hover'>
        <tr>
        <th>Gyakorlat</th>
        <th>Ismétlés szám</th>
        <th>Dátum</th>
        </tr>
    `;
    logs.forEach(e=>{
        text+=`
            <tr>
                <td>${e.exercise}</td>
                <td>${e.date}</td>
                <td>${e.repetition}</td>
            </tr>
        `


        //settek külön legyenek
    })
    text+=`</table>`;
    stuff.innerHTML=text;

}

function oneMore()
{
    const setGroup=document.getElementById('setGroup');
    var sets = document.getElementsByClassName('sets');
    var text=``;
    for(var i=0;i<sets.length;i++)
    {
      const value=document.getElementById(`reps${i+1}`).value;
      text+=`
          <div class="row sets">
              <div class="col">
                <p id="No${i+1}">${i+1}.</p>
              </div>
              <div class="col">
                <input type="number" name="reps" id="reps${i+1}" value='${value}'>
              </div>
          </div>
      `;
  }
  text+=`
          <div class="row sets">
              <div class="col">
                <p id="No${i+1}">${i+1}.</p>
              </div>
              <div class="col">
                <input type="number" name="reps" id="reps${i+1}" value='0'>
              </div>
          </div>
      `;
    
      setGroup.innerHTML=text;
}
function oneLess()
{
    const setGroup=document.getElementById('setGroup');
    var sets = document.getElementsByClassName('sets');
    console.log(sets);
    var text=``;
    for(var i=0;i< sets.length-1;i++)
    {
        console.log(`No${i+1}`);
        var setNo=document.getElementById(`No${i+1}`).innerHTML;
        var reps=document.getElementById(`reps${i+1}`).value;
        console.log(`reps${i+1} value: `,reps);
        text+=`
            <div class="row sets">
            <div class="col">
              <p id="No${i+1}">${setNo}</p>
            </div>
            <div class="col">
              <input type="number" name="reps" id="reps${i+1}" value="${reps?reps:'0'}">
            </div>
        </div>
        `;
    }
    setGroup.innerHTML=text;
}
function writeInnerHtml(place,text)
{
  place[0].innerHTML=text;
  place[1].innerHTML=text;
}

async function logIt()
{
    //get the data then send it
}