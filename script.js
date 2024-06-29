
// put your code here...
var dnaData = []
var nameList = {
  "male0": "Willy Rogers"
}

var bgsList = {
  "background1": "image.png",
}

var musicList = {
  "Menu Theme": "menu.mp3"
}

var soundList = {
  "Hit01": "hit01.ogg"
}






const uiInput = document.getElementById("UIInput");
const dnaContainer = document.getElementById("dna-container");
const dnaMamer = document.getElementById("dna-maker");

const nameSelection = document.getElementById("nameSelection");



document.addEventListener("DOMContentLoaded", () => {
  loadsCharactersAsOptions();
});




// Handle creating dialogues !
function createDialogue() {
  if (document.getElementById("nameSelection").value === "" || document.getElementById("dialogue-text").value === "")
    return

  let tempObj = {};
  tempObj["name"] = document.getElementById("nameSelection").value;
  tempObj["dialogue"] = document.getElementById("dialogue-text").value;
  tempObj["world-type"] = document.getElementById("world-type-selection").value;
  dnaData.push(tempObj);
  updateContainer();

  document.getElementById("dialogue-text").value = "";
}

function updateContainer() {
  dnaContainer.innerHTML = "";
  dnaData.forEach((item, index) => {
    const dialogueElement = document.createElement("div"); dialogueElement.classList.add("dialogue");
    const dialogueName = document.createElement("h2"); dialogueName.textContent = item["name"];
    const dialogueText = document.createElement("p"); dialogueText.textContent = item["dialogue"];

    const indexDisplay = document.createElement('span'); indexDisplay.textContent = index; indexDisplay.classList.add('indexDisplay');

    const wType = document.createElement("p"); wType.textContent = item["world-type"];
    wType.classList.add("wTypeText");


    if (item["world-type"] === "2D") {
      wType.style.backgroundColor = "#04f";
    } else {
      wType.style.backgroundColor = "#c15";
    }



    dnaContainer.appendChild(indexDisplay);
    dialogueElement.appendChild(wType);
    dialogueElement.appendChild(dialogueName); dialogueElement.appendChild(dialogueText);
    dnaContainer.appendChild(dialogueElement);
    



    console.log(item);
  });
}



// Basic Toggle for hiding the editor
var hideInputUi = true;
function toggleEditorVisible() {
  hideInputUi = !hideInputUi;

  if (hideInputUi) {
    uiInput.style.transform = "translateY(100%)";
    document.getElementById("hideButton").textContent = "Ouvrir l'editeur";
  } else {
    uiInput.style.transform = "translateY(0%)";
    document.getElementById("hideButton").textContent = "Fermer l'editeur";
  }
}

// Handle special Ui visibility
function specialUIvisibility(type, layer) {
  if (type === "hidden") {
    document.getElementById('specialUI').style.opacity = "0";
    document.getElementById(layer).style.display = "none"
  } else {
    document.getElementById('specialUI').style.visibility = type;
    document.getElementById('specialUI').style.opacity = "1";
    document.getElementById(layer).style.display = "block";
  }

  setTimeout(() => {
    document.getElementById('specialUI').style.visibility = type;
  }, 200);
}









function loadsCharactersAsOptions() {
  const listAsObj = Object.keys(nameList);

  document.getElementById("nameSelection").innerHTML = "";

  listAsObj.forEach((name, index) => {
    console.log(name);

    const nameOptionElement = document.createElement("option");
    nameOptionElement.textContent = nameList[name]; nameOptionElement.value = nameList[name];

    document.getElementById("nameSelection").appendChild(nameOptionElement);
  });
}

// Handles Input Settingd
function updateAdvancedSettingsTab() {
  console.log(document.getElementById('editor-mode').value)

  if (document.getElementById('editor-mode').value === "advanced") {
    document.getElementById('advancedSettings').style.height = "90px"
  } else {
    document.getElementById('advancedSettings').style.height = "0"
  }

  const musicsAsList = Object.keys(musicList);
  const soundsAsList = Object.keys(soundList); 

  document.getElementById('MUSoption').innerHTML = "";
  document.getElementById('SNDoption').innerHTML = "";

  const emptyMUS = document.createElement('option'); emptyMUS.textContent = ""; emptyMUS.value = ""; document.getElementById('MUSoption').appendChild(emptyMUS);
  const emptySND = document.createElement('option'); emptySND.textContent = ""; emptySND.value = ""; document.getElementById('SNDoption').appendChild(emptySND);

  musicsAsList.forEach((music, index) => {
    console.log(music)
    const musOption = document.createElement('option'); musOption.textContent = music; musOption.value = musicList[music]; 
    document.getElementById('MUSoption').appendChild(musOption);
  })
  soundsAsList.forEach((sound, index) => {
    console.log(sound)
    const sndOption = document.createElement('option'); sndOption.textContent = sound; sndOption.value = soundList[sound]; 
    document.getElementById('SNDoption').appendChild(sndOption);
  });
}

function updadte2DSettingsTab() {
  console.log(document.getElementById('world-type-selection').value)
  if (document.getElementById('world-type-selection').value === "2D") {
    document.getElementById('settings2d').style.height = "100px"
  } else {
    document.getElementById('settings2d').style.height = "0px"
  }

  const bgsAsList = Object.keys(bgsList);
  document.getElementById('BGSimgs').innerHTML = "";
  
  const emptyBG = document.createElement('option'); emptyBG.textContent = ""; emptyBG.value = ""; document.getElementById('BGSimgs').appendChild(emptyBG);

  bgsAsList.forEach((bg, index) => {
    console.log(bg)
    const bgOption = document.createElement('option'); bgOption.textContent = bg; bgOption.value = bgsList[bg];
    document.getElementById('BGSimgs').appendChild(bgOption);
  });
}






// Handle Character Creation
function updateCreateCharacter() {
  console.log(nameList[document.getElementById('add-c-input-id').value])

  if (document.getElementById('add-c-input-name').value === "" || document.getElementById('add-c-input-id').value === "" || nameList[document.getElementById('add-c-input-id').value.toLowerCase().replace(/ /g, "_")] !== undefined) {
    document.getElementById('createCharBtn').disabled = true;
    document.getElementById('idTempResults').style.opacity = "0";
    return
  }
  document.getElementById('idTextResults').textContent = document.getElementById('add-c-input-id').value.toLowerCase().replace(/ /g, "_");
  document.getElementById('createCharBtn').disabled = false;
  document.getElementById('idTempResults').style.opacity = "1";
}

function addCharacter() {
  


  nameList[document.getElementById('add-c-input-id').value.toLowerCase().replace(/ /g, "_")] = document.getElementById('add-c-input-name').value;
  loadsCharactersAsOptions();
  document.getElementById('add-c-input-name').value = "";
  document.getElementById('add-c-input-id').value = "";
  updateCreateCharacter();
  specialUIvisibility("hidden", "addCharacters");
}