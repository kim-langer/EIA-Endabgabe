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
    extraorder: IceCream | null;
    receiptButton: HTMLButtonElement | null;
    paymentConfirmed: boolean;


    constructor(_x: number, _y: number, _pricetopay: number) {
      this.x = _x;
      this.y = _y;
    }

    static waitingVisitors: number = 0;

    drawvisitor(): void {
      crc2.save();
      crc2.translate(this.x, this.y);
    
      // Kopf 
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
    
      // Augen
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
    
      // Mund basierend auf dem Mood
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
      Visitor.waitingVisitors++;
      this.updateWaitingVisitorsDisplay();
      assignbutton.addEventListener("click", () => {

        let canvas = document.querySelector('canvas#front') as HTMLCanvasElement;
        let crc2 = canvas.getContext('2d');
        this.getToTable();
        assignbutton.style.display = "none";

      });
      document.body.appendChild(assignbutton);
    }

   private getToTable(): void {
      let tableoptions = [
        { x: 200, y: 300 },
        { x: 470, y: 253 },
        { x: 450, y: 95 },
        { x: 285, y: 300 }
      ];
      let randomIndex = Math.floor(Math.random() * tableoptions.length);
      let chosenPlace = tableoptions[randomIndex];

      crc2.clearRect(this.x + 530, this.y + 30, 70, 70);
    
      this.mood = MoodVisitor.Happy;
      Visitor.waitingVisitors--;
      // Neue Koordinaten vom Visitor
      this.x = chosenPlace.x;
      this.y = chosenPlace.y;

      this.drawvisitor();
      this.updateWaitingVisitorsDisplay();

      // Bestellung genereiern
      this.ordericecream();
      this.showOrderButton();
    }

   private updateWaitingVisitorsDisplay(): void {
      let waitingVisitorsContainer = document.getElementById("waiting-visitors-container");
        waitingVisitorsContainer.innerText = `Waiting Visitors: ${Visitor.waitingVisitors}`;
      
    }

   private ordericecream(): void {
      // Zufällige Eissorte wählen
      if (eissorten.length > 0) {
        let generateIceCream = Math.floor(Math.random() * eissorten.length);
        let chosenIceCream = eissorten[generateIceCream];
        this.order = chosenIceCream;
       
        this.pricetopay = chosenIceCream.preis;
    
        // Zufälliges Topping wählen
        if (toppings.length > 0) {
          let generateTopping = Math.floor(Math.random() * toppings.length);
          let chosenTopping = toppings[generateTopping];
          this.extraorder = chosenTopping;
         
          this.pricetopay += chosenTopping.preis;
        }
      }
    }    
    

   private showOrderButton(): void {
      let vieworderbutton = document.createElement("button");
      vieworderbutton.innerText = "View Order";
      vieworderbutton.id = "vieworderbutton";
      vieworderbutton.style.left = `${this.x + 300}px`;
      vieworderbutton.style.top = `${this.y + 250}px`;

      vieworderbutton.addEventListener("click", () => {
        this.showandfulfillOrder();
        vieworderbutton.remove();
      });
      document.body.appendChild(vieworderbutton);
    }


   private showandfulfillOrder(): void {
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
          <p>The customer wants <i>${this.order.name}</i> Ice Cream</p>
          <p>with <i>${this.extraorder.name}</i> as Topping</p>
          <p>Price: ${this.order.preis.toFixed(2)} €</p>
          <label for="eissorten-input">Select Ice Cream:</label>
          ${iceCreamSelectHTML}
          <br>
          <label for="toppings-input">Select Topping:</label>
          ${toppingSelectHTML}
        </div>
        <button id="chooseicecreambutton">Create the ice cream</button>
      `;
    
      fulfillOrderContainer.innerHTML = orderHTML;
    
      let  selectediceCream = new IceCream(this.order.name, this.order.preis, this.order.color);
      let selectedtopping = new Topping(this.extraorder.name, this.extraorder.preis, this.extraorder.color);
      selectediceCream.drawwaffle();
    
      // Button zum Erstellen der Eiscremes
      let chooseIceCreamButton = document.getElementById("chooseicecreambutton");
      chooseIceCreamButton.addEventListener("click", () => {
        selectediceCream.drawflavour();
        selectedtopping.drawtopping();
      });
      fulfillOrderContainer.appendChild(chooseIceCreamButton);
    
      // Button zum Schließen des Divs
      let completeOrderButton = document.createElement("button");
      completeOrderButton.id = "completeorderbutton";
      completeOrderButton.innerText = "Complete Order";
      completeOrderButton.addEventListener("click", () => {
        fulfillOrderContainer.classList.remove("visible");

        // Überprüfung, ob die richtige Bestellung kreiert wurde
        let selectedIceCreamInput = document.getElementById("eissorten-input") as HTMLSelectElement;
        let selectedToppingInput = document.getElementById("toppings-input") as HTMLSelectElement;
      
        let selectedIceCreamName = selectedIceCreamInput.value;
        let selectedToppingName = selectedToppingInput.value;
      
        if (selectedIceCreamName === this.order.name && selectedToppingName === this.extraorder.name) {
          //  Mood um +1 erhöhen
            this.mood;
            this.drawvisitor();
          }
        else {
          //  Mood um -1 verringern
            this.mood++;
            this.drawvisitor();
        }
      
        // Timer für 8 Sekunden, bevor der "Receipt" Button angezeigt wird (quasi die Zeit, in der das Eis gegessen wird)
        setTimeout(() => {
          this.showReceiptButton();
        }, 8000);
      });
      fulfillOrderContainer.appendChild(completeOrderButton);
    }


   private showReceiptButton(): void {
      let receiptButton = document.createElement("button");
      receiptButton.innerText = "Accept payment";
      receiptButton.id = "receipt-button";
      receiptButton.style.left = `${this.x + 280}px`;
      receiptButton.style.top = `${this.y + 250}px`;

      receiptButton.addEventListener("click", () => {
        this.confirmPayment();
      });
  
      document.body.appendChild(receiptButton);
      this.receiptButton = receiptButton;
    }
  
    confirmPayment(): void {

      const canvas = document.querySelector('canvas#front') as HTMLCanvasElement;
      const context = canvas.getContext('2d');
      context.clearRect(this.x, this.y, 100, 100);
      if (this.pricetopay) {
       
        let earnings = getCurrentEarnings(); 
        earnings += this.pricetopay;
        updateCurrentEarnings(earnings); 
      
      if (this.receiptButton) {
        this.receiptButton.remove();
        this.receiptButton = null;
        this.paymentConfirmed = true;

        console.log("Costumer payed and left")
      }
       }

} } }
