var dnaData = {
  "pattern01": [],
  "pattern02": [],
  "pattern03": [],
}

var currentPattern = "pattern01";

var nameList = {
  "male0": "Willy Rogers"
}

var bgsList = {
  "background1": "background01.png",
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




function updateEverything() {
  loadsCharactersAsOptions();
  updateAdvancedSettingsTab();
  updadte2DSettingsTab();
  updatePatternList();
  updateContainer();
}


document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem('dna-data') !== null) {
    // console.log(localStorage.getItem('dna-data'));
    console.log(localStorage.getItem('dna-data'));
    loadData(JSON.parse(localStorage.getItem('dna-data')));
    specialUIvisibility('hidden', 'startup');
    updateEverything();
  }


  // updateEverything();
});




// For pattern list
function updatePatternList() {
  const patternAsObj = Object.keys(dnaData);
  document.getElementById('patternList').innerHTML = "";
  patternAsObj.forEach((name, index) => {
    const patternElement = document.createElement('a'); patternElement.textContent = name;
    patternElement.classList.add('patternOption');
    // Also adds the selected class if its indeed selected
    if (name === currentPattern) {
      patternElement.classList.add('selectedPattern');
    }
    document.getElementById('patternList').appendChild(patternElement);
    
    // For changing patterns
    patternElement.addEventListener('click', function(event) {
      currentPattern = this.textContent
      updateEverything();
    })
  });

  const plusButton = document.createElement('a'); plusButton.textContent = "+"; plusButton.classList.add('addPattern');
  document.getElementById('patternList').appendChild(plusButton);
  // For creating new patterns
  plusButton.addEventListener('click', () => {
    console.log('creating pattern!')
  })
}





// Handle creating dialogues !
function createDialogue() {
  if (document.getElementById("dialogue-text").value === "" || document.getElementById('dialogue-type').value !== "dialogue") {return};

  let tempObj = {};
  // Persistent values : name, dialogue, world type 
  tempObj["name"] = document.getElementById("NAMEoption").value;
  tempObj["dialogue"] = document.getElementById("dialogue-text").value;
  tempObj["world-type"] = document.getElementById("world-type-selection").value;

  // Makes sounds and music if not empty
  if (document.getElementById('MUSoption').value !== "") {
    tempObj["music"] = document.getElementById('MUSoption').value;
  }
  if (document.getElementById('SNDoption').value !== "") {
    tempObj["sound"] = document.getElementById('SNDoption').value;
  }

  if (document.getElementById("world-type-selection").value === "2D") {
    // Makes Character Position if input is true
    if (document.getElementById('charVisible').checked === true) {
      var cposradio = document.getElementsByName('characterpos');

      for (var i = 0, length = cposradio.length; i<length; i++) {
        if (cposradio[i].checked) {
          tempObj['character-pos'] = cposradio[i].value;
          break;
        }
      }
    }
    
    // Makes Background if not empty
    if (document.getElementById('BGSoption').value !== "") {
      tempObj['background'] = document.getElementById('BGSoption').value;
    }
  }

  dnaData[currentPattern].push(tempObj);
  updateContainer();

  // Resets options to prevent redondancy
  document.getElementById("dialogue-text").value = "";
  document.getElementById('MUSoption').value = "";
  document.getElementById('SNDoption').value = "";
  document.getElementById('BGSoption').value = "";
}


// Toggle Pattern Editor Visibility
var isinPatternEditor = true;
function togglePatternSettings() {
  isinPatternEditor = !isinPatternEditor;

  // If is pattern editor
  if (isinPatternEditor) {
    document.getElementById('chapterEditor').style.width = "0"
    document.getElementById('chapterContainer').style.left = "-180px"
  } else {
    document.getElementById('chapterEditor').style.width = "100%";
    document.getElementById('chapterContainer').style.left = "0";
    updatePatternList();
  }
}




function updateContainer() {
  dnaContainer.innerHTML = "";
  dnaData[currentPattern].forEach((item, index) => {
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

    if (item["music"] !== undefined || item["sound"] !== undefined) {
      const addonElement = document.createElement('div'); addonElement.classList.add('dnaAddon');
      if (item['music'] !== undefined) {
        const musicIcon = document.createElement('i'); musicIcon.classList.add('fa-solid', 'fa-music');
        addonElement.appendChild(musicIcon);
      };
      if (item['sound'] !== undefined) {
        const soundIcon = document.createElement('i'); soundIcon.classList.add('fa-solid', 'fa-volume-high');
        addonElement.appendChild(soundIcon);
      };

      dialogueElement.appendChild(addonElement)
    }

    dialogueElement.appendChild(indexDisplay);
    
    dialogueElement.appendChild(wType);
    dialogueElement.appendChild(dialogueName); dialogueElement.appendChild(dialogueText);

    dialogueElement.setAttribute('dnaindex', index);

    // Make the dialogue show the dialogue editor when clicked
    dialogueElement.addEventListener("click", function(event) {
      updateEverything();
      excluUpdateEditor(this.getAttribute('dnaindex'))
      specialUIvisibility('visible', 'editDialogue');
    })

    dnaContainer.appendChild(dialogueElement);
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

  updateEverything()
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



function showCharacterPosInput(input) {
  const charPosInput = document.getElementsByName('characterpos');
  console.log(input)
  if(input === true) {
    charPosInput.forEach((element) => {
      document.getElementById('char-pos-label').style.opacity = "1";
      element.disabled = false;
    })
  } else {
    charPosInput.forEach((element) => {
      document.getElementById('char-pos-label').style.opacity = ".5";
      element.disabled = true;
    })
  }
}






function loadsCharactersAsOptions() {
  const listAsObj = Object.keys(nameList);
  const NAMEselect = document.getElementsByName('NAMEoption');

  NAMEselect.forEach((list, index) => {
    list.innerHTML = "";

    listAsObj.forEach((name, index) => {
      const nameOptionElement = document.createElement("option");
      nameOptionElement.textContent = nameList[name]; nameOptionElement.value = nameList[name];
      list.appendChild(nameOptionElement);
    });
  })
  
}



var advSettHeight = 140;

// Handles Input Settingd
function updateAdvancedSettingsTab() {
  if (document.getElementById('editor-mode').value === "advanced") {
    document.getElementById('advancedSettings').style.height = advSettHeight + "px";
  } else {
    document.getElementById('advancedSettings').style.height = "0";
  }

  const musicsAsList = Object.keys(musicList);
  const soundsAsList = Object.keys(soundList); 

  // Get all the select elements
  const allMUSselect = document.getElementsByName("MUSoption");
  const alSNDselect = document.getElementsByName("SNDoption");

  allMUSselect.forEach((list, index) => {
    list.innerHTML = ""
    const emptyMUS = document.createElement('option'); emptyMUS.textContent = ""; emptyMUS.value = ""; list.appendChild(emptyMUS);

    musicsAsList.forEach((music, index) => {
      const musOption = document.createElement('option'); musOption.textContent = music; musOption.value = musicList[music]; 
      list.appendChild(musOption);
    });
  });
  alSNDselect.forEach((list, index) => {
    list.innerHTML = ""
    const emptySND = document.createElement('option'); emptySND.textContent = ""; emptySND.value = ""; list.appendChild(emptySND);

    soundsAsList.forEach((sound, index) => {
      const sndOption = document.createElement('option'); sndOption.textContent = sound; sndOption.value = soundList[sound]; 
      list.appendChild(sndOption);
    });
  });
}

function updadte2DSettingsTab() {
  if (document.getElementById('world-type-selection').value === "2D") {
    document.getElementById('settings2d').style.height = "115px";
  } else {
    document.getElementById('settings2d').style.height = "0px";
  }

  const bgsAsList = Object.keys(bgsList);
  // document.getElementById('BGSimgs').innerHTML = "";
  const allBGoption = document.getElementsByName('BGSoption');

  allBGoption.forEach((list, index) => {
    list.innerHTML = ""
    const emptyBG = document.createElement('option'); emptyBG.textContent = ""; emptyBG.value = ""; list.appendChild(emptyBG);

    bgsAsList.forEach((bg, index) => {
      const bgOption = document.createElement('option'); bgOption.textContent = bg; bgOption.value = bgsList[bg];
      list.appendChild(bgOption);
    });
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


// Handle File manipulation
function exportFile(data) {
  if (data === undefined) {
    data = {
      "dnaData": dnaData,
      "musicList": musicList,
      "soundList": soundList,
      "nameList": nameList
    }
  };

  const jsonString = JSON.stringify(data);
  const blob = new Blob([jsonString], {type: "application/json"});

  const link = document.createElement('a');

  link.href = URL.createObjectURL(blob);
  link.download = "tempName.json";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  localStorage.setItem('dna-data', JSON.stringify(data));
}

function loadFile(ev) {
  const file = ev.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      try {
        console.log(JSON.parse(e.target.result))
        loadData(JSON.parse(e.target.result));
        specialUIvisibility('hidden', 'startup');
        updateEverything();
      } catch {
        console.error('Error parsing')
      }
    };
    reader.readAsText(file);
  }
}

function loadData(data) {
  dnaData = data['dnaData'];
  musicList = data['musicList'];
  soundList = data['soundList'];
  nameList = data['nameList'];
}




// To Keep Updating !!
function excluUpdateEditor(index) {
  const data = dnaData[currentPattern][index];
  console.log(data);
  document.getElementById('edit-world-type-selection').value = data['world-type'];
  document.getElementById('editNAMEoption').value = data['name'];
  document.getElementById('edit-dialogue-text').value = data['dialogue'];
  console.log(data['name'])
}