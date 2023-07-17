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
      let xOffset = 135; // Abstand zum linken Rand
      let yOffset = 80; // Abstand zum oberen Rand
      let waffleWidth =45; // Breite der Waffel
      let waffleHeight = 50; // Höhe der Waffel
    
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

    drawflavour():void  {
        // Eiskugel in ausgewählter Farbe zeichnen
        let iceballCanvas = document.getElementById("waffle-canvas") as HTMLCanvasElement;
        let context = iceballCanvas.getContext("2d");
        let ballRadius = 20;
        let xOffset = 157; // Abstand zum linken Rand
        let yOffset = 70; // Abstand zum oberen Rand
      
        context.beginPath();
        context.arc(xOffset, yOffset, ballRadius, 0, 2 * Math.PI);
        context.fillStyle = this.color;
        context.fill();
      
        let fulfillOrderContainer = document.getElementById("fulfillorder-container") as HTMLDivElement;
        fulfillOrderContainer.appendChild(iceballCanvas);
    };

  }

  export class Topping extends IceCream {
    constructor(name: string, preis: number, color: string) {
        super(name, preis, color);
  }

  drawtopping():void  {  
    let waffleCanvas = document.getElementById("waffle-canvas") as HTMLCanvasElement;
  let context = waffleCanvas.getContext("2d");

  let xOffset = 146; // Abstand zum linken Rand
  let yOffset = 40; // Abstand zum oberen Rand

  context.beginPath();
  context.moveTo(xOffset, yOffset + 20); // Startpunkt unten links
  context.lineTo(xOffset + 5, yOffset); 
  context.lineTo(xOffset + 20, yOffset + 20);
  context.closePath();

  context.fillStyle = this.color;
  context.fill();
  
} }


}