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
            let xOffset = 135;
            let yOffset = 80;
            let waffleWidth = 45;
            let waffleHeight = 50;
            context.beginPath();
            context.moveTo(xOffset + waffleWidth / 2, yOffset + waffleHeight);
            context.lineTo(xOffset, yOffset);
            context.lineTo(xOffset + waffleWidth, yOffset);
            context.closePath();
            context.fillStyle = "#d2a86c";
            context.fill();
            let fulfillOrderContainer = document.getElementById("fulfillorder-container");
            fulfillOrderContainer.appendChild(wafflecanvas);
        }
        ;
        drawflavour() {
            let iceballCanvas = document.getElementById("waffle-canvas");
            let context = iceballCanvas.getContext("2d");
            let ballRadius = 20;
            let xOffset = 157;
            let yOffset = 70;
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
            let xOffset = 146;
            let yOffset = 40;
            context.beginPath();
            context.moveTo(xOffset, yOffset + 20);
            context.lineTo(xOffset + 5, yOffset);
            context.lineTo(xOffset + 20, yOffset + 20);
            context.closePath();
            context.fillStyle = this.color;
            context.fill();
        }
    }
    finaltask01.Topping = Topping;
})(finaltask01 || (finaltask01 = {}));
//# sourceMappingURL=icecream.js.map