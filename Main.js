/*Aufgabe: Abschlussarbeit Eisdealer
Name: Kim Langer
Matrikelnummer: 272232
letzte Änderung: 18.07.2023
Quellen: W3Schools, ChatGPT, bisherige EIA2 Aufgaben
Anmerkungen: keine Zusammenarbeit(en)

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
    finaltask01.toppings = []; // Array zur Speicherung der Toppings
    // Hinweis auf fehlende Eissorten
    function showAlert() {
        alert("Please fill the ice cream counter before you start the game! You need at least 1 flavour and 1 topping");
    }
    // Eisgame starten 
    function startgame() {
        if (finaltask01.eissorten.length === 0 || finaltask01.toppings.length === 0) {
            showAlert();
        }
        else {
            let createNewVisitor = () => {
                let newVisitor = new finaltask01.Visitor(565, 62, 0);
                newVisitor.mood = finaltask01.MoodVisitor.Happy;
                newVisitor.drawvisitor();
                newVisitor.createButton();
                // Nach 15 Sekunden Stimmung zu Neutral ändern
                setTimeout(() => {
                    newVisitor.mood = finaltask01.MoodVisitor.Neutral;
                    newVisitor.drawvisitor();
                }, 15000);
                // Nach 20 Sekunden Stimmung zu Angry ändern
                setTimeout(() => {
                    newVisitor.mood = finaltask01.MoodVisitor.Angry;
                    newVisitor.drawvisitor();
                }, 20000);
            };
            createNewVisitor();
            setInterval(createNewVisitor, 30000);
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
    function handleEditButtonClick(_event) {
        event.preventDefault();
        editContainer = document.getElementById("edit-container");
        editContainer.classList.add("visible");
        let InputHtml = `
        <div class="input-container">
          <label for="text-input">New flavor or topping:</label>
          <input type="text" id="text-input" placeholder="Yum yum">
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
            finaltask01.toppings.push(topping);
        }
        // Formular zurücksetzen
        nameInput.value = "";
        priceInput.value = "";
        colorInput.value = "";
        typeInput.value = "flavour";
        editContainer.classList.remove("visible");
        let iceCreamSelection = document.getElementById("icecreamselection");
        let newicecream = document.createElement("div");
        newicecream.id = "newicecream";
        newicecream.style.left = `${100 + finaltask01.eissorten.length * 100}px`;
        newicecream.style.top = isFlavour ? "230px" : "300px";
        newicecream.style.backgroundColor = color;
        let text = document.createElement("p");
        text.innerText = name;
        text.style.position = "relative";
        text.style.color = "white";
        newicecream.appendChild(text);
        // neue Eissorte zum HTML-Div hinzufügen
        iceCreamSelection.appendChild(newicecream);
        console.log(finaltask01.eissorten);
        console.log(finaltask01.toppings);
    }
    // Button zum Spiel starten
    function createStartButton() {
        startbutton = document.createElement("button");
        startbutton.innerHTML = "Open the ice cafe for visitors";
        startbutton.id = "start-button";
        document.body.appendChild(startbutton);
        startbutton.addEventListener("click", startgame);
    }
    finaltask01.currentEarnings = 0;
    function getCurrentEarnings() {
        return finaltask01.currentEarnings;
    }
    finaltask01.getCurrentEarnings = getCurrentEarnings;
    function updateCurrentEarnings(earnings) {
        finaltask01.currentEarnings += earnings;
        drawEarnings();
    }
    finaltask01.updateCurrentEarnings = updateCurrentEarnings;
    // Funktion für das Berechnen und Anzeigen der Einnahmen
    function drawEarnings() {
        finaltask01.crc2.clearRect(0, 0, finaltask01.canvas.width, 50);
        finaltask01.crc2.fillStyle = "black";
        finaltask01.crc2.font = "bold 16px Arial";
        finaltask01.crc2.fillText("Your Earnings: " + finaltask01.currentEarnings.toFixed(2) + " €", 20, 40);
    }
    finaltask01.drawEarnings = drawEarnings;
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
})(finaltask01 || (finaltask01 = {}));
//# sourceMappingURL=Main.js.map