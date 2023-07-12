/*Aufgabe: Abschlussarbeit Eisdealer
Name: Kim Langer
Matrikelnummer: 272232
Quellen: W3 Schools, ChatGPT, bisherige Aufgaben EIA2

Anmerkungen: 
keine Zusammenarbeit(en)
*/
namespace finaltask {

    window.addEventListener("load", handleLoad);

    interface Vector {
        x: number;
        y: number;
    }

    export let crc2: CanvasRenderingContext2D;
    let canvas: HTMLCanvasElement;
    let backgroundCanvas: HTMLCanvasElement;
    let backgroundContext: CanvasRenderingContext2D;
    let editbutton: HTMLButtonElement;
    let startbutton: HTMLButtonElement;

    function handleLoad(_event: Event): void {

        canvas = document.querySelector('canvas#front');
        crc2 = canvas.getContext('2d');
        // Hintergrund mit statischen Zeichnungen auf ein anderes Canvas speichern
        backgroundCanvas = document.querySelector('canvas#back');
        backgroundCanvas.width = canvas.width;
        backgroundCanvas.height = canvas.height;
        backgroundContext = backgroundCanvas.getContext("2d");

        drawBackground(backgroundContext);
        drawicecreamdealer(backgroundContext, { x: 400, y: 200 }, { x: 200, y: 280 });
        drawicecreamcounter(backgroundContext);
        drawstandingDesk(backgroundContext, { x: 900, y: 280 }, 50)
        drawstandingDesk(backgroundContext, { x: 940, y: 600 }, 50)
        drawstandingDesk(backgroundContext, { x: 670, y: 600 }, 50)
        drawstandingDesk(backgroundContext, { x: 300, y: 640 }, 50)

        drawSmiley(backgroundContext, { x: 1170, y: 100 }, 30)

        createEditButton();
        createStartButton();
        drawEarnings();

    };

    let eissorten: IceCream[] = []; // Array zur Speicherung der Eissorten


    // Der "Add a new Ice Cream Button"
    function createEditButton(): void {
        editbutton = document.createElement("button");
        editbutton.innerHTML = "Add a new ice cream";
        editbutton.id = "edit-button"

        document.body.appendChild(editbutton);

        editbutton.addEventListener("click", handleEditButtonClick);
    }

    // Interaktion mit dem Edit Button (ermöglicht Bearbeiten des Eisangebots)
    let editContainer = document.getElementById("edit-container");

    function handleEditButtonClick(event: Event): void {
        event.preventDefault();
        editContainer = document.getElementById("edit-container") as HTMLDivElement;
        editContainer.classList.add("visible");

        let InputHtml = `
        <div class="input-container">
          <label for="text-input">New flavor:</label>
          <input type="text" id="text-input" placeholder="Name your new flavor">
          <label for="price-input">Price:</label>
          <input type="number" id="price-input" placeholder="What should it cost?">
          <label for="color-input">Choose a color</label>
          <input type="color" id="color-input">
          <label for="type-input">Flavor or Topping?</label>
          <select id="type-input">
            <option value="flavor">Flavor</option>
            <option value="topping">Topping</option>
          </select>
          <button id="addbutton" type="submit">Add</button>
        </div>
      `;

        editContainer.innerHTML = InputHtml;
    }

    // Neues Eisangebot hinzufügen und speichern
    function handleFormSubmit(event: Event) {
        event.preventDefault();

        // Formulardaten abrufen
        let nameInput = document.getElementById("text-input") as HTMLInputElement;
        let priceInput = document.getElementById("price-input") as HTMLInputElement;
        let colorInput = document.getElementById("color-input") as HTMLInputElement;
        let typeInput = document.getElementById("type-input") as HTMLSelectElement;

        // Neue Eissorte oder neues Topping erstellen
        const name = nameInput.value;
        const preis = parseFloat(priceInput.value);
        const color = colorInput.value;
        const isFlavour = typeInput.value === "flavor";

        if (isFlavour) {
            let eissorte = new IceCream(name, preis, color);
            eissorten.push(eissorte);
        } else {
            let topping = new Topping(name, preis, color);
            eissorten.push(topping);
        }

        // Formular zurücksetzen
        nameInput.value = "";
        priceInput.value = "";
        colorInput.value = "";
        typeInput.value = "flavor";

        editContainer.classList.remove("visible");

        console.log(eissorten); // Ausgabe der gespeicherten Eissorten im Array
    }

    // Event-Listener für das Formular-Submit-Ereignis
    let addbutton = document.getElementById("addbutton");
    addbutton.addEventListener("submit", handleFormSubmit);


    function createStartButton(): void {
        startbutton = document.createElement("button");
        startbutton.innerHTML = "Open the ice cafe for visitors";
        startbutton.id = "start-button"

        document.body.appendChild(startbutton);
    }

    // Funktionen für das Berechnen und Anzeigen der Einnahmen
    function drawEarnings(): void {
        crc2.fillStyle = "black";
        crc2.font = "bold 16px Arial";
        crc2.fillText("Your Earnings:", 20, 40); // Position des Textes anpassen --> + earnings.toFixed(2) + " €", 10, 20)
    }

    // Hintergrundfarbe zeichnen
    function drawBackground(crc2: CanvasRenderingContext2D): void {
        crc2.fillStyle = "#E8DCCA";
        crc2.fillRect(0, 0, crc2.canvas.width, crc2.canvas.height);
    }

    // Eistheke zeichnen
    function drawicecreamcounter(crc2: CanvasRenderingContext2D) {

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

    };

    // Eisdealer/User zeichnen (nur zur Veranschauung da, keine Interaktion möglich)
    function drawicecreamdealer(crc2: CanvasRenderingContext2D, position: Vector, size: Vector) {
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
    };

    function drawstandingDesk(crc2: CanvasRenderingContext2D, position: Vector, radius: number): void {
        crc2.save();

        crc2.beginPath();
        crc2.arc(position.x, position.y, radius, 0, 2 * Math.PI);
        crc2.fillStyle = "#79553C";
        crc2.fill();
        crc2.closePath();

        crc2.restore();
    };

    function drawSmiley(crc2: CanvasRenderingContext2D, position: Vector, radius: number): void {
        // Gesicht
        crc2.beginPath();
        crc2.arc(position.x, position.y, radius, 0, 2 * Math.PI);
        crc2.fillStyle = "lightgreen";
        crc2.fill();
        crc2.strokeStyle = "black";
        crc2.lineWidth = 1;
        crc2.stroke();
        crc2.closePath();
      
        // Augen
        crc2.beginPath();
        crc2.arc(position.x - radius / 3, position.y - radius / 6, radius / 8, 0, 2 * Math.PI);
        crc2.fillStyle = "black";
        crc2.fill();
        crc2.closePath();
      
        crc2.beginPath();
        crc2.arc(position.x + radius / 3, position.y - radius / 6, radius / 8, 0, 2 * Math.PI);
        crc2.fillStyle = "black";
        crc2.fill();
        crc2.closePath();
      
        // Mund
        crc2.beginPath();
        crc2.arc(position.x, position.y + radius / 6, radius / 3, 0.2 * Math.PI, 0.8 * Math.PI);
        crc2.strokeStyle = "black";
        crc2.lineWidth = 3;
        crc2.stroke();
        crc2.closePath();
      }

}