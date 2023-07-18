var finaltask01;
(function (finaltask01) {
    let MoodVisitor;
    (function (MoodVisitor) {
        MoodVisitor[MoodVisitor["Happy"] = 0] = "Happy";
        MoodVisitor[MoodVisitor["Neutral"] = 1] = "Neutral";
        MoodVisitor[MoodVisitor["Angry"] = 2] = "Angry";
    })(MoodVisitor = finaltask01.MoodVisitor || (finaltask01.MoodVisitor = {}));
    class Visitor {
        x;
        y;
        mood;
        pricetopay;
        order;
        extraorder;
        receiptButton;
        paymentConfirmed;
        constructor(_x, _y, _pricetopay) {
            this.x = _x;
            this.y = _y;
        }
        static waitingVisitors = 0;
        drawvisitor() {
            finaltask01.crc2.save();
            finaltask01.crc2.translate(this.x, this.y);
            // Kopf 
            finaltask01.crc2.beginPath();
            finaltask01.crc2.arc(this.x, this.y, 30, 0, 2 * Math.PI);
            // Farbe basierend auf dem Mood
            if (this.mood === MoodVisitor.Happy) {
                finaltask01.crc2.fillStyle = "lightgreen";
            }
            else if (this.mood === MoodVisitor.Neutral) {
                finaltask01.crc2.fillStyle = "yellow";
            }
            else if (this.mood === MoodVisitor.Angry) {
                finaltask01.crc2.fillStyle = "#fe0000";
            }
            finaltask01.crc2.fill();
            finaltask01.crc2.strokeStyle = "black";
            finaltask01.crc2.lineWidth = 1;
            finaltask01.crc2.stroke();
            finaltask01.crc2.closePath();
            // Augen
            finaltask01.crc2.beginPath();
            finaltask01.crc2.arc(this.x - 30 / 3, this.y - 30 / 6, 30 / 8, 0, 2 * Math.PI);
            finaltask01.crc2.fillStyle = "black";
            finaltask01.crc2.fill();
            finaltask01.crc2.closePath();
            finaltask01.crc2.beginPath();
            finaltask01.crc2.arc(this.x + 30 / 3, this.y - 30 / 6, 30 / 8, 0, 2 * Math.PI);
            finaltask01.crc2.fillStyle = "black";
            finaltask01.crc2.fill();
            finaltask01.crc2.closePath();
            // Mund basierend auf dem Mood
            finaltask01.crc2.beginPath();
            if (this.mood === MoodVisitor.Neutral) {
                // Neutral
                finaltask01.crc2.moveTo(this.x - 30 / 3, this.y + 30 / 6);
                finaltask01.crc2.lineTo(this.x + 30 / 3, this.y + 30 / 6);
            }
            else if (this.mood === MoodVisitor.Angry) {
                // Sauer
                finaltask01.crc2.moveTo(this.x - 30 / 3, this.y + 30 / 6);
                finaltask01.crc2.lineTo(this.x + 30 / 3, this.y + 30 / 6);
            }
            else {
                // Glücklich
                finaltask01.crc2.arc(this.x, this.y + 30 / 6, 30 / 3, 0.2 * Math.PI, 0.8 * Math.PI);
            }
            finaltask01.crc2.strokeStyle = "black";
            finaltask01.crc2.lineWidth = 3;
            finaltask01.crc2.stroke();
            finaltask01.crc2.closePath();
            finaltask01.crc2.restore();
        }
        createButton() {
            let assignbutton = document.createElement("button");
            assignbutton.innerText = "assign a place";
            assignbutton.id = "assign-button";
            Visitor.waitingVisitors++;
            this.updateWaitingVisitorsDisplay();
            assignbutton.addEventListener("click", () => {
                let canvas = document.querySelector('canvas#front');
                let crc2 = canvas.getContext('2d');
                this.getToTable();
                assignbutton.style.display = "none";
            });
            document.body.appendChild(assignbutton);
        }
        getToTable() {
            let tableoptions = [
                { x: 200, y: 300 },
                { x: 470, y: 253 },
                { x: 450, y: 95 },
                { x: 285, y: 300 }
            ];
            let randomIndex = Math.floor(Math.random() * tableoptions.length);
            let chosenPlace = tableoptions[randomIndex];
            finaltask01.crc2.clearRect(this.x + 530, this.y + 30, 70, 70);
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
        updateWaitingVisitorsDisplay() {
            let waitingVisitorsContainer = document.getElementById("waiting-visitors-container");
            waitingVisitorsContainer.innerText = `Waiting Visitors: ${Visitor.waitingVisitors}`;
        }
        ordericecream() {
            // Zufällige Eissorte wählen
            if (finaltask01.eissorten.length > 0) {
                let generateIceCream = Math.floor(Math.random() * finaltask01.eissorten.length);
                let chosenIceCream = finaltask01.eissorten[generateIceCream];
                this.order = chosenIceCream;
                this.pricetopay = chosenIceCream.preis;
                // Zufälliges Topping wählen
                if (finaltask01.toppings.length > 0) {
                    let generateTopping = Math.floor(Math.random() * finaltask01.toppings.length);
                    let chosenTopping = finaltask01.toppings[generateTopping];
                    this.extraorder = chosenTopping;
                    this.pricetopay += chosenTopping.preis;
                }
            }
        }
        showOrderButton() {
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
        showandfulfillOrder() {
            let fulfillOrderContainer = document.getElementById("fulfillorder-container");
            fulfillOrderContainer.classList.add("visible");
            let iceCreamSelectHTML = '<select id="eissorten-input">';
            for (let i = 0; i < finaltask01.eissorten.length; i++) {
                iceCreamSelectHTML += '<option value="' + finaltask01.eissorten[i].name + '">' + finaltask01.eissorten[i].name + '</option>';
            }
            iceCreamSelectHTML += '</select>';
            let toppingSelectHTML = '<select id="toppings-input">';
            for (let i = 0; i < finaltask01.toppings.length; i++) {
                toppingSelectHTML += '<option value="' + finaltask01.toppings[i].name + '">' + finaltask01.toppings[i].name + '</option>';
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
            let selectediceCream = new finaltask01.IceCream(this.order.name, this.order.preis, this.order.color);
            let selectedtopping = new finaltask01.Topping(this.extraorder.name, this.extraorder.preis, this.extraorder.color);
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
                let selectedIceCreamInput = document.getElementById("eissorten-input");
                let selectedToppingInput = document.getElementById("toppings-input");
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
        showReceiptButton() {
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
        confirmPayment() {
            const canvas = document.querySelector('canvas#front');
            const context = canvas.getContext('2d');
            context.clearRect(this.x, this.y, 100, 100);
            if (this.pricetopay) {
                let earnings = finaltask01.getCurrentEarnings();
                earnings += this.pricetopay;
                finaltask01.updateCurrentEarnings(earnings);
                if (this.receiptButton) {
                    this.receiptButton.remove();
                    this.receiptButton = null;
                    this.paymentConfirmed = true;
                    console.log("Costumer payed and left");
                }
            }
        }
    }
    finaltask01.Visitor = Visitor;
})(finaltask01 || (finaltask01 = {}));
//# sourceMappingURL=visitor.js.map