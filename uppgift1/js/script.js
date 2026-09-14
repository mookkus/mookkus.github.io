let yearsLeft

while (true) {
  yearsLeft = Number(prompt("How many years left until you finish school?"));

if (isNaN(yearsLeft)) {
    alert("Please enter a valid number.");
    continue;
}
break;
}

if (yearsLeft === 0) {
  message = "Congratulations! You have finished school!";
}  else if (yearsLeft === 1) {
  message = "Nearly there!";
}  else if (yearsLeft === 2) {
  message = "Still learning!";
}  else if (yearsLeft === 3) {
  message = "Sucks to be you :)";
} else {
  message = "I hope you are kidding..";
}
alert(message);