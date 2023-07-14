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
            let randomIndex = Math.floor(Math.random() * finaltask01.eissorten.length);
            let chosenIceCream = finaltask01.eissorten[randomIndex];
            // Erstelle eine Bestellung mit der gewählten Eissorte
            this.order = new IceCreamOrder(chosenIceCream);
        }
        ;
        showOrderButton() {
            // Erstelle den Button
            let button = document.createElement("button");
            button.innerText = "View Order";
            button.addEventListener("click", () => {
                this.showOrder();
            });
            // Positioniere den Button
            button.style.position = "absolute";
            button.style.left = `${this.x - 50}px`;
            button.style.top = `${this.y + 50}px`;
            // Füge den Button dem Dokument hinzu
            document.body.appendChild(button);
            // Speichere eine Referenz auf den Button
            this.receiptButton = button;
        }
        showOrder() {
            // Überprüfe, ob eine Bestellung vorhanden ist
            if (this.order) {
                // Zeige die Bestellung an
                console.log("Order: ", this.order);
                // Entferne den Button
                if (this.receiptButton) {
                    this.receiptButton.remove();
                    this.receiptButton = null;
                }
            }
        }
    }
    finaltask01.Visitor = Visitor;
})(finaltask01 || (finaltask01 = {}));
//# sourceMappingURL=visitor.js.map