namespace finaltask01 {
    
    export class IceCream {
    name: string;
    preis: number;
    color: string;
  
    constructor(name: string, preis: number, color:string) {
      this.name = name;
      this.preis = preis;
      this.color = color;
    }
    drawwaffle():void  {
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

      let fulfillOrderContainer = document.getElementById("fulfillorder-container") as HTMLDivElement;
      fulfillOrderContainer.appendChild(wafflecanvas);
    };

    drawflavour():void  {};

  }

  export class Topping extends IceCream {
    constructor(name: string, preis: number, color: string) {
        super(name, preis, color);
  }

  drawtopping():void  {};
} 


}