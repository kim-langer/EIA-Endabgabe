namespace finaltask01 {

  export enum MoodVisitor {
    Happy,
    Neutral,
    Angry,
  }

  export class Visitor {
    x: number;
    y: number;
    mood: MoodVisitor;
    pricetopay: number;
    order: IceCream | null;


    constructor(x: number, y: number, pricetopay: number, mood: MoodVisitor) {
      this.x = x;
      this.y = y;
    }

    drawvisitor(): void {
      crc2.save();
      crc2.translate(this.x, this.y);

      crc2.beginPath();
      crc2.arc(this.x, this.y, 30, 0, 2 * Math.PI);
      crc2.fillStyle = "lightgreen";
      crc2.fill();
      crc2.strokeStyle = "black";
      crc2.lineWidth = 1;
      crc2.stroke();
      crc2.closePath();

      crc2.beginPath();
      crc2.arc(this.x - 30 / 3, this.y - 30 / 6, 30 / 8, 0, 2 * Math.PI);
      crc2.fillStyle = "black";
      crc2.fill();
      crc2.closePath();

      crc2.beginPath();
      crc2.arc(this.x + 30 / 3, this.y - 30 / 6, 30 / 8, 0, 2 * Math.PI);
      crc2.fillStyle = "black";
      crc2.fill();
      crc2.closePath();

      crc2.beginPath();
      crc2.arc(this.x, this.y + 30 / 6, 30 / 3, 0.2 * Math.PI, 0.8 * Math.PI);
      crc2.strokeStyle = "black";
      crc2.lineWidth = 3;
      crc2.stroke();
      crc2.closePath();

      crc2.restore();
    }

    createButton(): void {
      let assignbutton = document.createElement("button");
      assignbutton.innerText = "assign a place";
      assignbutton.id = "assign-button";
      assignbutton.addEventListener("click", () => {
        crc2.clearRect(this.x - 70, this.y - 70, 70, 70);
        this.getToTable();
        assignbutton.style.display = "none";
      });
      document.body.appendChild(assignbutton);
    }

    getToTable(): void {
      let tableoptions = [
        { x: 200, y: 300 },
        { x: 470, y: 253 },
        { x: 450, y: 95 },
        { x: 285, y: 300 }
      ];
      // Wähle einen zufälligen Platz aus
      let randomIndex = Math.floor(Math.random() * tableoptions.length);
      let chosenPlace = tableoptions[randomIndex];

      crc2.clearRect(this.x - 35, this.y - 35, 70, 70);

      // Aktualisiere die Koordinaten des Besuchers und zeichne ihn an den neuen Platz
      this.x = chosenPlace.x;
      this.y = chosenPlace.y;
      this.drawvisitor();

      // Erstelle automatisch eine Bestellung
      this.ordericecream();

      // Zeige den Bestell-Button an der Position des Besuchers
      this.showOrderButton();
    }

    ordericecream(): void {

      // Wähle eine zufällige Eissorte
      if (eissorten.length > 0) {
        let generateOrder = Math.floor(Math.random() * eissorten.length);
        let chosenIceCream = eissorten[generateOrder];

        this.order = chosenIceCream;
      }
    }

    showOrderButton(): void {
      let vieworderbutton = document.createElement("button");
      vieworderbutton.innerText = "View Order";
      vieworderbutton.id = "vieworderbutton";
      vieworderbutton.style.left = `${this.x}`;
      vieworderbutton.style.top = `${this.y}`;

      vieworderbutton.addEventListener("click", () => {
        this.showandfulfillOrder();
        vieworderbutton.remove();
      });
      document.body.appendChild(vieworderbutton);
    }


    showandfulfillOrder(): void {
      let fulfillOrderContainer = document.getElementById("fulfillorder-container") as HTMLDivElement;
      fulfillOrderContainer.classList.add("visible");
    
      let selectHTML = '<select id="eissorten-input">';
      for (let i = 0; i < eissorten.length; i++) {
        selectHTML += '<option value="' + eissorten[i].name + '">' + eissorten[i].name + '</option>';
      }
      selectHTML += '</select>';
    
      let orderHTML = `
        <p class="order-text">Please create this ice cream</p>
        <br> 
        <p>${this.order.name}</p>
        <p>Price: ${this.order.preis.toFixed(2)} €</p>
        <br>
        ${selectHTML}
        <button id="chooseicecreambutton">Create the ice cream</button>
      `;
    
      fulfillOrderContainer.innerHTML = orderHTML;
    
      let iceCream = new IceCream(this.order.name, this.order.preis, this.order.color);
      iceCream.drawwaffle();
    
      // Button zum Erstellen der Eiscremes
      let chooseIceCreamButton = document.getElementById("chooseicecreambutton");
      chooseIceCreamButton.addEventListener("click", () => {
        this.drawiceball();
      });
      fulfillOrderContainer.appendChild(chooseIceCreamButton);
    
      // Button zum Schließen des Divs
      let completeOrderButton = document.createElement("button");
      completeOrderButton.innerText = "Complete Order";
      completeOrderButton.addEventListener("click", () => {
        fulfillOrderContainer.innerHTML = ""; // Div leeren, um es zu schließen
      });
      fulfillOrderContainer.appendChild(completeOrderButton);
    }
    
    drawiceball (): void {
      // Eiskugel in ausgewählter Farbe zeichnen
      let waffleCanvas = document.getElementById("waffle-canvas") as HTMLCanvasElement;
      let waffleContext = waffleCanvas.getContext("2d");
      let ballRadius = 30; 
    
      waffleContext.beginPath();
      waffleContext.arc(385, 295, ballRadius, 0, 2 * Math.PI);
      waffleContext.fillStyle = this.order.color; 
      waffleContext.fill();
    
      let fulfillOrderContainer = document.getElementById("fulfillorder-container") as HTMLDivElement;
      fulfillOrderContainer.appendChild(waffleCanvas);
    }

    getreciept (): void {
     
    }
     

       }

}
