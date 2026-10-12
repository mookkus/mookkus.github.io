let audio = {};
let activePad = "pad1";

async function loadAudio() {

        const response = await fetch("audio.json");
        audio = await response.json();
        
        generatePad("pad1", audio.pad1);
        generatePad("pad2", audio.pad2);
        
}

const keys = ["q", "w", "e", "r", "a", "s", "d", "f", "z", "x", "c", "v"];
// Generera drumpads
function generatePad(padId, audioList) {
    const padContainer = document.getElementById(padId);
    padContainer.innerHTML = "";

    for (let i = 0; i < audioList.length; i++) {
    const currentAudio = audioList[i];
    const btn = document.createElement("div");

    btn.classList.add("btn");
    btn.id = padId + "-btn" + (i + 1);
    
    const hotkeySpan = document.createElement("span");
    hotkeySpan.classList.add("hotkey");
    hotkeySpan.innerText = keys[i].toUpperCase();

    const nameSpan = document.createElement("span");
    nameSpan.classList.add("name");
    nameSpan.innerText = currentAudio.name;

    btn.appendChild(hotkeySpan);
    btn.appendChild(nameSpan);

    let filePath = currentAudio.file;

    btn.addEventListener("click", function() {
        playAudio(filePath);
    });

    padContainer.appendChild(btn);
    }
}

function playAudio(filePath) {
    const audio = new Audio(filePath);
    audio.play();
}

function changePad(padId) {
    activePad = padId;
    document.getElementById("pad1").classList.remove("active");
    document.getElementById("pad2").classList.remove("active");

    document.getElementById(padId).classList.add("active");

    document.getElementById("tab-pad1").classList.remove("active");
    document.getElementById("tab-pad2").classList.remove("active");
    document.getElementById("tab-" + padId).classList.add("active");
}
// keypress audio
document.onkeydown = function(event) {

    if (event.repeat) { return;
    }

    let currentSounds;
    if (activePad === "pad1") {
        currentSounds = audio.pad1;
    } else {
        currentSounds = audio.pad2;
    }
    switch (event.key) {
        // Row 1
        case 'q': playAudio(currentSounds[0].file); break;
        case 'w': playAudio(currentSounds[1].file); break;
        case 'e': playAudio(currentSounds[2].file); break;
        case 'r': playAudio(currentSounds[3].file); break;
        // Row 2 
        case 'a': playAudio(currentSounds[4].file); break;
        case 's': playAudio(currentSounds[5].file); break;
        case 'd': playAudio(currentSounds[6].file); break;
        case 'f': playAudio(currentSounds[7].file); break;
        // Row 3
        case 'z': playAudio(currentSounds[8].file); break;
        case 'x': playAudio(currentSounds[9].file); break;
        case 'c': playAudio(currentSounds[10].file); break;
        case 'v': playAudio(currentSounds[11].file); break;
    }
};
// tab switch
window.addEventListener("keydown", function(event) {
    if (event.key === "Tab") {
        event.preventDefault();
        if (activePad === "pad1") {
            changePad("pad2");
        } else {
            changePad("pad1");
        }
        return;
    }
});

window.addEventListener("keydown", function(event) {
    if (event.repeat) { return; }

    const keyIndex = keys.indexOf(event.key);
    if (keyIndex !== -1) {
        const btnId = activePad + "-btn" + (keyIndex + 1);
        const targetBtn = document.getElementById(btnId);

        if (targetBtn) {
            targetBtn.classList.add("pressed");
            setTimeout(function() {
                targetBtn.classList.remove("pressed");
            }, 150);
        }
    }
});

loadAudio();