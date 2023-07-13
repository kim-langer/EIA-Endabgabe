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
        drawicecream() {
            let canvas = document.createElement("canvas");
            canvas.width = 200;
            canvas.height = 200;
            let context = canvas.getContext("2d");
            // Zeichne die Waffel
            finaltask01.crc2.beginPath();
            finaltask01.crc2.moveTo(100, 0);
            finaltask01.crc2.lineTo(0, 200);
            finaltask01.crc2.lineTo(200, 200);
            finaltask01.crc2.closePath();
            finaltask01.crc2.fillStyle = "#d2a86c"; // Farbe der Waffel
            finaltask01.crc2.fill();
            // Zeichne die Kugel
            finaltask01.crc2.beginPath();
            finaltask01.crc2.arc(100, 100, 80, 0, 2 * Math.PI);
            finaltask01.crc2.fillStyle = this.color; // Farbe der Kugel
            finaltask01.crc2.fill();
            // Füge das Canvas dem DOM hinzu
            // Beispiel: document.body.appendChild(canvas);
        }
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