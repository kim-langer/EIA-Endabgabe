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
        constructor(x, y, pricetopay, mood) {
            this.x = x;
            this.y = y;
        }
        drawvisitor() {
            finaltask01.crc2.save();
            finaltask01.crc2.translate(this.x, this.y);
            finaltask01.crc2.beginPath();
            finaltask01.crc2.arc(this.x, this.y, 30, 0, 2 * Math.PI);
            finaltask01.crc2.fillStyle = "lightgreen";
            finaltask01.crc2.fill();
            finaltask01.crc2.strokeStyle = "black";
            finaltask01.crc2.lineWidth = 1;
            finaltask01.crc2.stroke();
            finaltask01.crc2.closePath();
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
            finaltask01.crc2.beginPath();
            finaltask01.crc2.arc(this.x, this.y + 30 / 6, 30 / 3, 0.2 * Math.PI, 0.8 * Math.PI);
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
                finaltask01.crc2.clearRect(this.x - 70, this.y - 70, 70, 70);
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
            // Wähle eine zufällige Eissorte
            if (finaltask01.eissorten.length > 0) {
                let generateOrder = Math.floor(Math.random() * finaltask01.eissorten.length);
                let chosenIceCream = finaltask01.eissorten[generateOrder];
                this.order = chosenIceCream;
            }
        }
        showOrderButton() {
            // Erstelle den Button
            let vieworderbutton = document.createElement("button");
            vieworderbutton.innerText = "View Order";
            vieworderbutton.id = "vieworderbutton";
            vieworderbutton.style.left = `${this.x}px`;
            vieworderbutton.style.top = `${this.y}px`;
            vieworderbutton.addEventListener("click", () => {
                this.showandfulfillOrder();
                vieworderbutton.remove();
            });
            document.body.appendChild(vieworderbutton);
        }
        showandfulfillOrder() {
            let fulfillOrderContainer = document.getElementById("fulfillorder-container");
            fulfillOrderContainer.classList.add("visible");
            // Bestellung anzeigen
            let orderText = document.createElement("p");
            orderText.innerText = "Order: " + this.order.name + " Price: " + this.order.preis.toFixed(2) + " €";
            fulfillOrderContainer.appendChild(orderText);
            let orderHTML = `
          <select id="type-input">
            <option value=" ">Flavour</option>
            <option value=" ">Topping</option>
          </select>
          <button id="addbutton" type="submit">Fulfill Order</button>
        </div>
      `;
            fulfillOrderContainer.innerHTML = orderHTML;
        }
    }
    finaltask01.Visitor = Visitor;
})(finaltask01 || (finaltask01 = {}));
//# sourceMappingURL=visitor.js.map