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
        receiptButton;
        paymentConfirmed;
        constructor(x, y, pricetopay) {
            this.x = x;
            this.y = y;
        }
        drawvisitor() {
            finaltask01.crc2.save();
            finaltask01.crc2.translate(this.x, this.y);
            // Kopf zeichnen
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
            // Zeichne die Augen
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
            // Zeichne den Mund basierend auf dem Mood
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
            // Wähle einen zufälligen Platz aus
            let randomIndex = Math.floor(Math.random() * tableoptions.length);
            let chosenPlace = tableoptions[randomIndex];
            finaltask01.crc2.clearRect(this.x - 35, this.y - 35, 70, 70);
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
        ordericecream() {
            // Zufällige Eissorte wählen
            if (finaltask01.eissorten.length > 0) {
                let generateOrder = Math.floor(Math.random() * finaltask01.eissorten.length);
                let chosenIceCream = finaltask01.eissorten[generateOrder];
                this.order = chosenIceCream;
                // Preis der Eissorte als zu zahlenden Preis speichern
                this.pricetopay = chosenIceCream.preis;
            }
        }
        showOrderButton() {
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
        showandfulfillOrder() {
            let fulfillOrderContainer = document.getElementById("fulfillorder-container");
            fulfillOrderContainer.classList.add("visible");
            let selectHTML = '<select id="eissorten-input">';
            for (let i = 0; i < finaltask01.eissorten.length; i++) {
                selectHTML += '<option value="' + finaltask01.eissorten[i].name + '">' + finaltask01.eissorten[i].name + '</option>';
            }
            selectHTML += '</select>';
            let orderHTML = `
        <p class="order-text">Please create this ice cream</p>
        <br> 
        <p>${this.order.name}</p>
        <p>Price: ${this.order.preis.toFixed(2)} €</p>
        <br>
        ${selectHTML}
        <br>
        <button id="chooseicecreambutton">Create the ice cream</button>
      `;
            fulfillOrderContainer.innerHTML = orderHTML;
            let iceCream = new finaltask01.IceCream(this.order.name, this.order.preis, this.order.color);
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
                fulfillOrderContainer.remove();
                // Timer für 8 Sekunden, bevor der "Receipt" Button angezeigt wird (quasi die Zeit, in der das Eis gegessen wird)
                setTimeout(() => {
                    this.showReceiptButton();
                }, 8000);
            });
            fulfillOrderContainer.appendChild(completeOrderButton);
        }
        drawiceball() {
            // Eiskugel in ausgewählter Farbe zeichnen
            let iceballCanvas = document.getElementById("waffle-canvas");
            let context = iceballCanvas.getContext("2d");
            let ballRadius = 30;
            context.beginPath();
            context.arc(385, 295, ballRadius, 0, 2 * Math.PI);
            context.fillStyle = this.order.color;
            context.fill();
            let fulfillOrderContainer = document.getElementById("fulfillorder-container");
            fulfillOrderContainer.appendChild(iceballCanvas);
        }
        showReceiptButton() {
            let receiptButton = document.createElement("button");
            receiptButton.innerText = "Accept payment";
            receiptButton.id = "receipt-button";
            receiptButton.addEventListener("click", () => {
                this.confirmPayment();
            });
            document.body.appendChild(receiptButton);
            this.receiptButton = receiptButton;
        }
        confirmPayment() {
            if (this.pricetopay) {
                // Annahme: this.pricetopay enthält den Preis der Bestellung
                let earnings = finaltask01.getCurrentEarnings(); // Funktion, um den aktuellen Einnahmebetrag abzurufen
                earnings += this.pricetopay;
                finaltask01.updateCurrentEarnings(earnings); // Funktion, um den aktualisierten Einnahmebetrag zu speichern
            }
            if (this.receiptButton) {
                this.receiptButton.remove();
                this.receiptButton = null;
                this.paymentConfirmed = true;
            }
        }
    }
    finaltask01.Visitor = Visitor;
})(finaltask01 || (finaltask01 = {}));
//# sourceMappingURL=visitor.js.map