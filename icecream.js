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
            let xOffset = 230; // Abstand zum linken Rand
            let yOffset = 70; // Abstand zum oberen Rand
            let waffleWidth = 50; // Breite der Waffel
            let waffleHeight = 40; // Höhe der Waffel
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
        drawflavour() { }
        ;
    }
    finaltask01.IceCream = IceCream;
    class Topping extends IceCream {
        constructor(name, preis, color) {
            super(name, preis, color);
        }
        drawtopping() { }
        ;
    }
    finaltask01.Topping = Topping;
})(finaltask01 || (finaltask01 = {}));
//# sourceMappingURL=icecream.js.map