var finaltask;
(function (finaltask) {
    class IceCream {
        name;
        preis;
        color;
        constructor(name, preis, color) {
            this.name = name;
            this.preis = preis;
            this.color = color;
        }
        drawicecream() { }
        ;
    }
    finaltask.IceCream = IceCream;
    class Topping extends IceCream {
        constructor(name, preis, color) {
            super(name, preis, color);
        }
        drawtopping() { }
        ;
    }
    finaltask.Topping = Topping;
})(finaltask || (finaltask = {}));
//# sourceMappingURL=icecream.js.map