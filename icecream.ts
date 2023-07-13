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
    drawicecream():void  {
      let canvas = document.createElement("canvas");
      canvas.width = 200;
      canvas.height = 200;
      let context = canvas.getContext("2d");

    // Zeichne die Waffel
    crc2.beginPath();
    crc2.moveTo(100, 0);
    crc2.lineTo(0, 200);
    crc2.lineTo(200, 200);
    crc2.closePath();
    crc2.fillStyle = "#d2a86c"; // Farbe der Waffel
    crc2.fill();

    // Zeichne die Kugel
    crc2.beginPath();
    crc2.arc(100, 100, 80, 0, 2 * Math.PI);
    crc2.fillStyle = this.color; // Farbe der Kugel
    crc2.fill();

    // Füge das Canvas dem DOM hinzu
    // Beispiel: document.body.appendChild(canvas);
    };

  }

  export class Topping extends IceCream {
    constructor(name: string, preis: number, color: string) {
        super(name, preis, color);
  }

  drawtopping():void  {};
} 


}