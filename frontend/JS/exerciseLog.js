async function addExercise()
{
    const exercises= await getData("Logging/getExercises");
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
    const logs=await getData("Logging/getLogs");
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
                <td>${e.repetition}</td>
                <td>${e.date}</td>
            </tr>
        `
    })
    text+=`</table>`;
    stuff.innerHTML=text;

}

function addExType()
{
  const stuffDiv=document.getElementById('stuff');
  var text=`
    <form>
       <table>
             <tr>
                 <td class="text-end"><label>Elnevezés:</label></td>
                <td><input class="input" type="text" id="name" required><br></td>
            </tr>
            <tr>
                <td class="text-end"><label>Izom csoport:</label></td>
                <td><input class="input" type="text" id="muscle" required><br></td>
            </tr>
            <tr>
            <td colspan="2">
            <input class="buttonColor btn btn-primary" type="button" value="Hozzáad" onclick="addEx()">
            </td>
            </tr>
        </table>
    </form>
  `;
  stuffDiv.innerHTML=text;
}
async function addEx()
{
  const name=document.getElementById("name").value;
  const muscle=document.getElementById("muscle").value;

  var ex={
    Name:name,
    TargetMuscle:muscle
  };

  const resposne=await postData("Logging/addExercise",ex);
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

async function logIt()
{
  const ex=document.getElementById('exerciseSelect').value;
  const sets=document.getElementsByClassName('sets');
  var list=[];

  
  for(var i=0;i<sets.length;i++)
  {
    const rep=document.getElementById(`reps${i+1}`).value;
    const data={
      Exercise:ex,
      Repetition:rep
    };

    list.push(data);
  }


  const response= await postData("Logging/addLog",list);
  console.log(response);
}