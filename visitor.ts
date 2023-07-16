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
    receiptButton: HTMLButtonElement | null;
    paymentConfirmed: boolean;


    constructor(x: number, y: number, pricetopay: number) {
      this.x = x;
      this.y = y;
    }

    drawvisitor(): void {
      crc2.save();
      crc2.translate(this.x, this.y);
    
      // Kopf zeichnen
      crc2.beginPath();
      crc2.arc(this.x, this.y, 30, 0, 2 * Math.PI);
      
      // Farbe basierend auf dem Mood
      if (this.mood === MoodVisitor.Happy) {
        crc2.fillStyle = "lightgreen";
      } else if (this.mood  === MoodVisitor.Neutral) {
        crc2.fillStyle = "yellow";
      } else if (this.mood  === MoodVisitor.Angry) {
        crc2.fillStyle = "#fe0000";
      }
      
      crc2.fill();
      crc2.strokeStyle = "black";
      crc2.lineWidth = 1;
      crc2.stroke();
      crc2.closePath();
    
      // Zeichne die Augen
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
    
      // Zeichne den Mund basierend auf dem Mood
      crc2.beginPath();
      if (this.mood  === MoodVisitor.Neutral) {
        // Neutral
        crc2.moveTo(this.x - 30 / 3, this.y + 30 / 6);
        crc2.lineTo(this.x + 30 / 3, this.y + 30 / 6);
      } else if (this.mood  === MoodVisitor.Angry) {
        // Sauer
        crc2.moveTo(this.x - 30 / 3, this.y + 30 / 6);
        crc2.lineTo(this.x + 30 / 3, this.y + 30 / 6);
      } else {
        // Glücklich
        crc2.arc(this.x, this.y + 30 / 6, 30 / 3, 0.2 * Math.PI, 0.8 * Math.PI);
      }
      
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

        let canvas = document.querySelector('canvas#front') as HTMLCanvasElement;
        let crc2 = canvas.getContext('2d');
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
    
      this.mood = MoodVisitor.Happy;
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

      // Zufällige Eissorte wählen
      if (eissorten.length > 0) {
        let generateOrder = Math.floor(Math.random() * eissorten.length);
        let chosenIceCream = eissorten[generateOrder];
        this.order = chosenIceCream;
         // Preis der Eissorte als zu zahlenden Preis speichern
        this.pricetopay = chosenIceCream.preis
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
    
      let iceCreamSelectHTML = '<select id="eissorten-input">';
      for (let i = 0; i < eissorten.length; i++) {
        iceCreamSelectHTML += '<option value="' + eissorten[i].name + '">' + eissorten[i].name + '</option>';
      }
      iceCreamSelectHTML += '</select>';
    
      let toppingSelectHTML = '<select id="toppings-input">';
      for (let i = 0; i < toppings.length; i++) {
        toppingSelectHTML += '<option value="' + toppings[i].name + '">' + toppings[i].name + '</option>';
      }
      toppingSelectHTML += '</select>';
    
      let orderHTML = `
        <div id="creationinput">
          <p class="order-text">Please create this ice cream</p>
          <br> 
          <p>${this.order.name}</p>
          <p>Price: ${this.order.preis.toFixed(2)} €</p>
          <br>
          <label for="eissorten-input">Select Ice Cream:</label>
          ${iceCreamSelectHTML}
          <br>
          <label for="toppings-input">Select Topping:</label>
          ${toppingSelectHTML}
        </div>
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
      completeOrderButton.id = "completeorderbutton";
      completeOrderButton.innerText = "Complete Order";
      completeOrderButton.addEventListener("click", () => {
        fulfillOrderContainer.classList.remove("visible");
        // Timer für 8 Sekunden, bevor der "Receipt" Button angezeigt wird (quasi die Zeit, in der das Eis gegessen wird)
        setTimeout(() => {
          this.showReceiptButton();
        }, 8000);
      });
      fulfillOrderContainer.appendChild(completeOrderButton);
    }
    
    
    drawiceball(): void {
      // Eiskugel in ausgewählter Farbe zeichnen
      let iceballCanvas = document.getElementById("waffle-canvas") as HTMLCanvasElement;
      let context = iceballCanvas.getContext("2d");
      let ballRadius = 30;
      let xOffset = 230; // Abstand zum linken Rand
      let yOffset = 50; // Abstand zum oberen Rand
    
      context.beginPath();
      context.arc(this.x + xOffset, this.y + yOffset, ballRadius, 0, 2 * Math.PI);
      context.fillStyle = this.order.color;
      context.fill();
    
      let fulfillOrderContainer = document.getElementById("fulfillorder-container") as HTMLDivElement;
      fulfillOrderContainer.appendChild(iceballCanvas);
    }    

    showReceiptButton(): void {
      let receiptButton = document.createElement("button");
      receiptButton.innerText = "Accept payment";
      receiptButton.id = "receipt-button";
      receiptButton.addEventListener("click", () => {
        this.confirmPayment();
      });
  
      document.body.appendChild(receiptButton);
      this.receiptButton = receiptButton;
    }
  
    confirmPayment(): void {
      if (this.pricetopay) {
        // Annahme: this.pricetopay enthält den Preis der Bestellung
        let earnings = getCurrentEarnings(); // Funktion, um den aktuellen Einnahmebetrag abzurufen
        earnings += this.pricetopay;
        updateCurrentEarnings(earnings); // Funktion, um den aktualisierten Einnahmebetrag zu speichern
      }
      
      if (this.receiptButton) {
        this.receiptButton.remove();
        this.receiptButton = null;
        this.paymentConfirmed = true;

        console.log("Costumer payed and left")
      }
    

       }

} }
