let creativeMode = false;

document.getElementById("creativeBtn").addEventListener("click", function() {
    creativeMode = true;
    document.getElementById("myAlert").style.display = "none";
});

let christmasSpecials = [];

fetch("assets/tarjoukset.json")
  .then(response => response.json())
  .then(data => {
    christmasSpecials = data.christmasSpecials;
    createCalendar();
    $('#calendar-body .calendar-door').shuffle();
  })
  .catch(err => console.error("JSON load error:", err));

function createCalendar() {
const calendar = document.getElementById("calendar-body");

for (let i = 1; i <= 24; i++) {
    const box = document.createElement("div");
    box.className = "calendar-door";
    box.textContent = i;
    box.id = "door" + i;

    $(box).on("click", function() {
    openDoor(i, this);
});

        calendar.appendChild(box);
    }
}

function openDoor(i, box) {
    const today = new Date()
    const currentDay = today.getDate();
    const currentMonth = today.getMonth();

    const monthNames = [
    "januari", "februari", "mars", "april", "maj", "juni",
    "juli", "augusti", "september", "oktober", "november", "december"
];

const monthName = monthNames[currentMonth];

    if (!creativeMode && currentMonth !== 11) {
        document.getElementById("myAlertText").innerHTML = "<h3>Vi är i " + monthName + "...</h3>";
        document.getElementById("myAlert").style.backgroundColor = "#f44336";
        document.getElementById("creativeBtn").style.display = "block";
        document.getElementById("myAlert").style.display = "block";
        return;
    } 

    document.getElementById("myAlert").style.backgroundColor = "";
    document.getElementById("creativeBtn").style.display = "none";
    
    if (i === currentDay) {
        console.log("Lucka " + i + " öppnad!");
    } else if (i < currentDay) {
        console.log("Lucka " + i + " öppnad sent!");
    } else {
        console.log("Lucka " + i + " är inte tillgänglig än!");
        return;
    }

const surprise = christmasSpecials[i - 1];

document.getElementById("creativeBtn").style.display = "none";

document.getElementById("myAlertText").innerHTML =
    "<h3>Lucka " + i + "</h3>" +
    "<p>" + surprise.label + "</p>" +
    "<p><strong>Kupongkod:</strong> " + surprise.code + "</p>";

document.getElementById("myAlert").style.display = "block";

    
    box.style.backgroundImage = "url('img/bild" + i + ".jpg')";
    box.style.backgroundSize = "cover";

}
