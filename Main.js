/*Aufgabe: Abschlussarbeit Eisdealer
Name: Kim Langer
Matrikelnummer: 272232
Quellen:
Anmerkungen:

*/
var finaltask01;
(function (finaltask01) {
    window.addEventListener("load", handleLoad);
    let editbutton;
    let startbutton;
    function handleLoad(_event) {
        finaltask01.canvas = document.querySelector('canvas#front');
        finaltask01.crc2 = finaltask01.canvas.getContext('2d');
        // Hintergrund mit statischen Zeichnungen auf ein anderes Canvas speichern
        finaltask01.backgroundCanvas = document.querySelector('canvas#back');
        finaltask01.backgroundCanvas.width = finaltask01.canvas.width;
        finaltask01.backgroundCanvas.height = finaltask01.canvas.height;
        finaltask01.backgroundContext = finaltask01.backgroundCanvas.getContext("2d");
        drawBackground(finaltask01.backgroundContext);
        drawicecreamdealer(finaltask01.backgroundContext, { x: 400, y: 200 }, { x: 200, y: 280 });
        drawicecreamcounter(finaltask01.backgroundContext);
        drawstandingDesk(finaltask01.backgroundContext, { x: 900, y: 280 }, 50);
        drawstandingDesk(finaltask01.backgroundContext, { x: 940, y: 600 }, 50);
        drawstandingDesk(finaltask01.backgroundContext, { x: 670, y: 600 }, 50);
        drawstandingDesk(finaltask01.backgroundContext, { x: 300, y: 640 }, 50);
        createEditButton();
        createStartButton();
        drawEarnings();
    }
    ;
    finaltask01.eissorten = []; // Array zur Speicherung der Eissorten
    // Hinweis auf fehlende Eissorten
    function showAlert() {
        alert("Please fill the ice cream counter before you start the game!");
    }
    // Eisgame starten 
    function startgame() {
        if (finaltask01.eissorten.length === 0) {
            showAlert();
        }
        else {
            let newVisitor = new finaltask01.Visitor(565, 62, 0, 0);
            newVisitor.drawvisitor();
            newVisitor.createButton();
        }
    }
    // Der "Add a new Ice Cream Button"
    function createEditButton() {
        editbutton = document.createElement("button");
        editbutton.innerHTML = "Add a new ice cream";
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
        let InputHtml = `
        <div class="input-container">
          <label for="text-input">New flavor:</label>
          <input type="text" id="text-input" placeholder="Name your new flavor">
          <label for="price-input">Price:</label>
          <input type="number" id="price-input" placeholder="What should it cost?">
          <label for="color-input">Choose a color</label>
          <input type="color" id="color-input">
          <label for="type-input">Flavour or Topping?</label>
          <select id="type-input">
            <option value="flavour">Flavour</option>
            <option value="topping">Topping</option>
          </select>
          <button id="addbutton" type="submit">Add</button>
        </div>
      `;
        editContainer.innerHTML = InputHtml;
        // Eisauswahl bestätigen
        let addbutton = document.getElementById("addbutton");
        addbutton.addEventListener("click", handleFormSubmit);
    }
    // Neues Eisangebot im Array speichern
    function handleFormSubmit(_event) {
        _event.preventDefault();
        // Formulardaten abrufen
        let nameInput = document.getElementById("text-input");
        let priceInput = document.getElementById("price-input");
        let colorInput = document.getElementById("color-input");
        let typeInput = document.getElementById("type-input");
        // Neue Eissorte oder neues Topping erstellen
        let name = nameInput.value;
        let preis = parseFloat(priceInput.value);
        let color = colorInput.value;
        let isFlavour = typeInput.value === "flavour";
        if (isFlavour) {
            let eissorte = new finaltask01.IceCream(name, preis, color);
            finaltask01.eissorten.push(eissorte);
        }
        else {
            let topping = new finaltask01.Topping(name, preis, color);
            finaltask01.eissorten.push(topping);
        }
        // Formular zurücksetzen
        nameInput.value = "";
        priceInput.value = "";
        colorInput.value = "";
        typeInput.value = "flavour";
        editContainer.classList.remove("visible");
        // Daten im HTML-Div "icecreamselection" darstellen
        let icecreamSelectionDiv = document.getElementById("icecreamselection");
        let newicecream = document.createElement("div");
        icecreamSelectionDiv.innerHTML = `
    <p>Name: ${name}</p>
    <p>Price: ${preis.toFixed(2)} €</p>
    <p>Color: ${color}</p>
  `;
        icecreamSelectionDiv.appendChild(newicecream);
        console.log(finaltask01.eissorten);
    }
    // Button zum Spiel starten
    function createStartButton() {
        startbutton = document.createElement("button");
        startbutton.innerHTML = "Open the ice cafe for visitors";
        startbutton.id = "start-button";
        document.body.appendChild(startbutton);
        startbutton.addEventListener("click", startgame);
    }
    // Funktionen für das Berechnen und Anzeigen der Einnahmen
    function drawEarnings() {
        finaltask01.crc2.fillStyle = "black";
        finaltask01.crc2.font = "bold 16px Arial";
        finaltask01.crc2.fillText("Your Earnings:", 20, 40); // Position des Textes anpassen --> + earnings.toFixed(2) + " €", 10, 20)
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
    function drawicecreamdealer(crc2, _position, _size) {
        crc2.save();
        crc2.translate(_position.x, _position.y);
        // Körper
        crc2.beginPath();
        crc2.arc(0, 0, _size.x / 4, 0, 2 * Math.PI);
        crc2.fillStyle = "blue";
        crc2.fill();
        crc2.closePath();
        // Kopf
        crc2.beginPath();
        crc2.arc(0, -_size.x / 4, _size.x / 8, 0, 2 * Math.PI);
        crc2.fillStyle = "#D9BB9B";
        crc2.fill();
        crc2.closePath();
        crc2.restore();
    }
    ;
    function drawstandingDesk(crc2, _position, _radius) {
        crc2.save();
        crc2.beginPath();
        crc2.arc(_position.x, _position.y, _radius, 0, 2 * Math.PI);
        crc2.fillStyle = "#79553C";
        crc2.fill();
        crc2.closePath();
        crc2.restore();
    }
    ;
    function drawSmiley(crc2, _position, _radius) {
        // Gesicht
        crc2.beginPath();
        crc2.arc(_position.x, _position.y, _radius, 0, 2 * Math.PI);
        crc2.fillStyle = "lightgreen";
        crc2.fill();
        crc2.strokeStyle = "black";
        crc2.lineWidth = 1;
        crc2.stroke();
        crc2.closePath();
        // Augen
        crc2.beginPath();
        crc2.arc(_position.x - _radius / 3, _position.y - _radius / 6, _radius / 8, 0, 2 * Math.PI);
        crc2.fillStyle = "black";
        crc2.fill();
        crc2.closePath();
        crc2.beginPath();
        crc2.arc(_position.x + _radius / 3, _position.y - _radius / 6, _radius / 8, 0, 2 * Math.PI);
        crc2.fillStyle = "black";
        crc2.fill();
        crc2.closePath();
        // Mund
        crc2.beginPath();
        crc2.arc(_position.x, _position.y + _radius / 6, _radius / 3, 0.2 * Math.PI, 0.8 * Math.PI);
        crc2.strokeStyle = "black";
        crc2.lineWidth = 3;
        crc2.stroke();
        crc2.closePath();
    }
})(finaltask01 || (finaltask01 = {}));
//# sourceMappingURL=Main.js.map