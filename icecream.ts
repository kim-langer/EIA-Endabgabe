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
    

      let xOffset = 135; 
      let yOffset = 80; 
      let waffleWidth =45; 
      let waffleHeight = 50; 
    
      context.beginPath();
      context.moveTo(xOffset + waffleWidth / 2, yOffset + waffleHeight);
      context.lineTo(xOffset, yOffset);
      context.lineTo(xOffset + waffleWidth, yOffset);
      context.closePath();
      context.fillStyle = "#d2a86c"; 
      context.fill();

      let fulfillOrderContainer = document.getElementById("fulfillorder-container") as HTMLDivElement;
      fulfillOrderContainer.appendChild(wafflecanvas);
    };

    drawflavour():void  {

        let iceballCanvas = document.getElementById("waffle-canvas") as HTMLCanvasElement;
        let context = iceballCanvas.getContext("2d");
        let ballRadius = 20;
        let xOffset = 157; 
        let yOffset = 70; 
      
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

  let xOffset = 146; 
  let yOffset = 40; 

  context.beginPath();
  context.moveTo(xOffset, yOffset + 20); 
  context.lineTo(xOffset + 5, yOffset); 
  context.lineTo(xOffset + 20, yOffset + 20);
  context.closePath();

  context.fillStyle = this.color;
  context.fill();
  
} }


}