/*Aufgabe: Abschlussarbeit Eisdealer
Name: Kim Langer
Matrikelnummer: 272232
Quellen: -

Anmerkungen:
keine Zusammenarbeit(en)
*/
var finaltask;
(function (finaltask) {
    window.addEventListener("load", handleLoad);
    let canvas;
    let backgroundCanvas;
    let backgroundContext;
    let editbutton;
    let startbutton;
    function handleLoad(_event) {
        canvas = document.querySelector('canvas#front');
        finaltask.crc2 = canvas.getContext('2d');
        // Hintergrund mit statischen Zeichnungen auf ein anderes Canvas speichern
        backgroundCanvas = document.querySelector('canvas#back');
        backgroundCanvas.width = canvas.width;
        backgroundCanvas.height = canvas.height;
        backgroundContext = backgroundCanvas.getContext("2d");
        drawBackground(backgroundContext);
        drawicecreamdealer(backgroundContext, { x: 400, y: 200 }, { x: 200, y: 280 });
        drawicecreamcounter(backgroundContext);
        drawstandingDesk(backgroundContext, { x: 900, y: 280 }, 50);
        drawstandingDesk(backgroundContext, { x: 940, y: 600 }, 50);
        drawstandingDesk(backgroundContext, { x: 670, y: 600 }, 50);
        drawstandingDesk(backgroundContext, { x: 300, y: 640 }, 50);
        createEditButton();
        createStartButton();
        drawEarnings();
    }
    ;
    // Die Buttons auf dem Canvas
    function createEditButton() {
        editbutton = document.createElement("button");
        editbutton.innerHTML = "View your ice cream counter";
        editbutton.id = "edit-button";
        document.body.appendChild(editbutton);
        editbutton.addEventListener("click", handleEditButtonClick);
    }
    // Interaktion mit dem Edit Button (ermöglicht Bearbeiten des Eisangebots)
    let editContainer = document.getElementById("edit-container");
    function handleEditButtonClick(event) {
        event.preventDefault();
        editContainer = document.getElementById("edit-container");
        editContainer.classList.add("visible");
    }
    function createStartButton() {
        startbutton = document.createElement("button");
        startbutton.innerHTML = "Open the ice cafe for visitors";
        startbutton.id = "start-button";
        document.body.appendChild(startbutton);
    }
    // Funktionen für das Berechnen und Anzeigen der Einnahmen
    function drawEarnings() {
        finaltask.crc2.fillStyle = "black";
        finaltask.crc2.font = "bold 16px Arial";
        finaltask.crc2.fillText("Your Earnings:", 20, 40); // Position des Textes anpassen --> + earnings.toFixed(2) + " €", 10, 20)
    }
    // Hintergrundfarbe zeichnen
    function drawBackground(crc2) {
        crc2.fillStyle = "#E8DCCA";
        crc2.fillRect(0, 0, crc2.canvas.width, crc2.canvas.height);
    }
    // Eistheke zeichnen
    function drawicecreamcounter(crc2) {
        crc2.fillStyle = "#D9D9D9";
        crc2.strokeStyle = "#000";
        crc2.lineWidth = 0.5;
        let x = 170;
        let y = 230;
        let width = 500;
        let height = 200;
        let cornerRadius = 10;
        crc2.beginPath();
        crc2.moveTo(x + cornerRadius, y);
        crc2.arcTo(x + width, y, x + width, y + cornerRadius, cornerRadius);
        crc2.arcTo(x + width, y + height, x + width - cornerRadius, y + height, cornerRadius);
        crc2.arcTo(x, y + height, x, y + height - cornerRadius, cornerRadius);
        crc2.arcTo(x, y, x + cornerRadius, y, cornerRadius);
        crc2.closePath();
        crc2.fill();
        crc2.stroke();
    }
    ;
    // Eisdealer/User zeichnen (nur zur Veranschauung da, keine Interaktion möglich)
    function drawicecreamdealer(crc2, position, size) {
        crc2.save();
        crc2.translate(position.x, position.y);
        // Körper
        crc2.beginPath();
        crc2.arc(0, 0, size.x / 4, 0, 2 * Math.PI);
        crc2.fillStyle = "blue";
        crc2.fill();
        crc2.closePath();
        // Kopf
        crc2.beginPath();
        crc2.arc(0, -size.x / 4, size.x / 8, 0, 2 * Math.PI);
        crc2.fillStyle = "#D9BB9B";
        crc2.fill();
        crc2.closePath();
        crc2.restore();
    }
    ;
    function drawstandingDesk(crc2, position, radius) {
        crc2.save();
        crc2.beginPath();
        crc2.arc(position.x, position.y, radius, 0, 2 * Math.PI);
        crc2.fillStyle = "#79553C";
        crc2.fill();
        crc2.closePath();
        crc2.restore();
    }
    ;
})(finaltask || (finaltask = {}));
//# sourceMappingURL=Main.js.map