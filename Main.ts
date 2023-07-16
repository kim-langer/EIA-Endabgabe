/*Aufgabe: Abschlussarbeit Eisdealer
Name: Kim Langer
Matrikelnummer: 272232
Quellen: 
Anmerkungen: 

*/
namespace finaltask01 {

    window.addEventListener("load", handleLoad);

    export interface Vector {
        x: number;
        y: number;
    }

    export let crc2: CanvasRenderingContext2D;
    export let canvas: HTMLCanvasElement;
    export let backgroundContext: CanvasRenderingContext2D;
    export let backgroundCanvas: HTMLCanvasElement;
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

        createEditButton();
        createStartButton();
        drawEarnings();

    };

    export let eissorten: IceCream[] = []; // Array zur Speicherung der Eissorten
    export let toppings: Topping[] = []; // Array zur Speicherung der Toppings

    // Hinweis auf fehlende Eissorten
    function showAlert(): void {
        alert("Please fill the ice cream counter before you start the game!");
      }
      
    // Eisgame starten 
    function startgame(): void {
        if (eissorten.length === 0) {
          showAlert();
        } else {
          let createNewVisitor = (): void => {
            let newVisitor = new Visitor(565, 62, 0);
            newVisitor.mood = MoodVisitor.Happy; 
            newVisitor.drawvisitor();
            newVisitor.createButton();
      
            // Nach 15 Sekunden Stimmung zu Neutral ändern
            setTimeout(() => {
              newVisitor.mood = MoodVisitor.Neutral;
              newVisitor.drawvisitor();
            }, 15000);
      
            // Nach 20 Sekunden Stimmung zu Angry ändern
            setTimeout(() => {
              newVisitor.mood = MoodVisitor.Angry; 
              newVisitor.drawvisitor();
            }, 20000);
          };
          createNewVisitor();
      
          setInterval(createNewVisitor, 30000);
        }
      }
      
      

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

    function handleEditButtonClick(_event: Event): void {
        event.preventDefault();
        editContainer = document.getElementById("edit-container") as HTMLDivElement;
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
    function handleFormSubmit(_event: Event) {
        _event.preventDefault();
    
        // Formulardaten abrufen
        let nameInput = document.getElementById("text-input") as HTMLInputElement;
        let priceInput = document.getElementById("price-input") as HTMLInputElement;
        let colorInput = document.getElementById("color-input") as HTMLInputElement;
        let typeInput = document.getElementById("type-input") as HTMLSelectElement;
    
        // Neue Eissorte oder neues Topping erstellen
        let name = nameInput.value;
        let preis = parseFloat(priceInput.value);
        let color = colorInput.value;
        let isFlavour = typeInput.value === "flavour";

        if (isFlavour) {
            let eissorte = new IceCream(name, preis, color);
            eissorten.push(eissorte);
        } else {
            let topping = new Topping(name, preis, color);
            toppings.push(topping);
        }
    
        // Formular zurücksetzen
        nameInput.value = "";
        priceInput.value = "";
        colorInput.value = "";
        typeInput.value = "flavour";
    
        editContainer.classList.remove("visible");
    
        let iceCreamSelection = document.getElementById("icecreamselection");
    
        let newicecream = document.createElement("div");
        newicecream.id = "newicecream"
        newicecream.style.left = `${100+ eissorten.length * 100}px`;
        newicecream.style.top = isFlavour ? "230px" : "300px";
        newicecream.style.backgroundColor = color;
    
        let text = document.createElement("p");
        text.innerText = name;
        text.style.position = "relative";
        text.style.color = "white";
        newicecream.appendChild(text);
        
        // neue Eissorte zum HTML-Div hinzufügen
        iceCreamSelection.appendChild(newicecream);
        
        console.log(eissorten);
        console.log(toppings);
    }    


    // Button zum Spiel starten
    function createStartButton(): void {
        startbutton = document.createElement("button");
        startbutton.innerHTML = "Open the ice cafe for visitors";
        startbutton.id = "start-button"

        document.body.appendChild(startbutton);

        startbutton.addEventListener ("click", startgame)
    }

   export let currentEarnings: number = 0;

   export function getCurrentEarnings(): number {
        return currentEarnings;
      }
    export function updateCurrentEarnings(earnings: number): void {
        currentEarnings += earnings;
        drawEarnings();
      }      

    // Funktionen für das Berechnen und Anzeigen der Einnahmen
    export function drawEarnings(): void {
        crc2.clearRect(0, 0, canvas.width, 50);
        crc2.fillStyle = "black";
        crc2.font = "bold 16px Arial";
        crc2.fillText("Your Earnings: " + currentEarnings.toFixed(2) + " €", 20, 40);
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
    function drawicecreamdealer(crc2: CanvasRenderingContext2D, _position: Vector, _size: Vector) {
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
    };

    function drawstandingDesk(crc2: CanvasRenderingContext2D, _position: Vector, _radius: number): void {
        crc2.save();

        crc2.beginPath();
        crc2.arc(_position.x, _position.y, _radius, 0, 2 * Math.PI);
        crc2.fillStyle = "#79553C";
        crc2.fill();
        crc2.closePath();

        crc2.restore();
    };

}
