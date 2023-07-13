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
        constructor(x, y, pricetopay) {
            this.x = x;
            this.y = y;
        }
        drawvisitor() {
        }
        createButton() {
            let assignbutton = document.createElement("button");
            assignbutton.innerText = "assign a place";
            assignbutton.id = "assign-button";
            assignbutton.addEventListener("click", () => {
                this.getToTable();
            });
            document.body.appendChild(assignbutton);
        }
        getToTable() {
            let tableoptions = [
                { x: 200, y: 300 },
                { x: 400, y: 500 },
                { x: 600, y: 700 },
                { x: 800, y: 900 }
            ];
            // Wähle einen zufälligen Platz aus
            let randomIndex = Math.floor(Math.random() * tableoptions.length);
            let chosenPlace = tableoptions[randomIndex];
            // Aktualisiere die Koordinaten des Besuchers und zeichne ihn an den neuen Platz
            this.x = chosenPlace.x;
            this.y = chosenPlace.y;
            this.drawvisitor();
        }
        ordericecream() { }
        ;
        showreciept() { }
        ;
    }
    finaltask01.Visitor = Visitor;
    class happyvisitor extends Visitor {
        constructor(x, y, pricetopay) {
            super(x, y, pricetopay);
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
        ;
    }
    finaltask01.happyvisitor = happyvisitor;
})(finaltask01 || (finaltask01 = {}));
//# sourceMappingURL=visitor.js.map