var finaltask01;
(function (finaltask01) {
    class IceCream {
        name;
        preis;
        color;
        constructor(name, preis, color) {
            this.name = name;
            this.preis = preis;
            this.color = color;
        }
        drawwaffle() {
            let wafflecanvas = document.createElement("canvas");
            let context = wafflecanvas.getContext("2d");
            wafflecanvas.id = "waffle-canvas";
            // Zeichne die Waffel auf dem Canvas
            let xOffset = 135; // Abstand zum linken Rand
            let yOffset = 80; // Abstand zum oberen Rand
            let waffleWidth = 45; // Breite der Waffel
            let waffleHeight = 50; // Höhe der Waffel
            context.beginPath();
            context.moveTo(xOffset + waffleWidth / 2, yOffset + waffleHeight);
            context.lineTo(xOffset, yOffset);
            context.lineTo(xOffset + waffleWidth, yOffset);
            context.closePath();
            context.fillStyle = "#d2a86c"; // Farbe der Waffel
            context.fill();
            let fulfillOrderContainer = document.getElementById("fulfillorder-container");
            fulfillOrderContainer.appendChild(wafflecanvas);
        }
        ;
        drawflavour() {
            // Eiskugel in ausgewählter Farbe zeichnen
            let iceballCanvas = document.getElementById("waffle-canvas");
            let context = iceballCanvas.getContext("2d");
            let ballRadius = 20;
            let xOffset = 157; // Abstand zum linken Rand
            let yOffset = 70; // Abstand zum oberen Rand
            context.beginPath();
            context.arc(xOffset, yOffset, ballRadius, 0, 2 * Math.PI);
            context.fillStyle = this.color;
            context.fill();
            let fulfillOrderContainer = document.getElementById("fulfillorder-container");
            fulfillOrderContainer.appendChild(iceballCanvas);
        }
        ;
    }
    finaltask01.IceCream = IceCream;
    class Topping extends IceCream {
        constructor(name, preis, color) {
            super(name, preis, color);
        }
        drawtopping() {
            let waffleCanvas = document.getElementById("waffle-canvas");
            let context = waffleCanvas.getContext("2d");
            let xOffset = 155; // Abstand zum linken Rand
            let yOffset = 65; // Abstand zum oberen Rand
            context.beginPath();
            context.moveTo(xOffset, yOffset + 40); // Startpunkt unten links
            context.lineTo(xOffset + 20, yOffset); // Linie nach oben mittig
            context.lineTo(xOffset + 40, yOffset + 40); // Linie nach unten rechts
            context.closePath();
            context.fillStyle = this.color;
            context.fill();
        }
    }
    finaltask01.Topping = Topping;
})(finaltask01 || (finaltask01 = {}));
//# sourceMappingURL=icecream.js.map