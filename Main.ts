/*Aufgabe: Abschlussarbeit Eisdealer
Name: Kim Langer
Matrikelnummer: 272232
Quellen: -

Anmerkungen: 
keine Zusammenarbeit(en)
*/
namespace finaltask {


    window.addEventListener("load", handleLoad);

    interface Vector {
        x: number;
        y: number;
      }

    export let crc2: CanvasRenderingContext2D;
    let canvas: HTMLCanvasElement;
    let backgroundCanvas: HTMLCanvasElement;
    let backgroundContext: CanvasRenderingContext2D;

    function handleLoad(_event: Event): void {

        canvas = document.querySelector('canvas#front');
        crc2 = canvas.getContext('2d');
        // Hintergrund mit statischen Zeichnungen auf ein anderes Canvas speichern
        backgroundCanvas = document.querySelector('canvas#back');
        backgroundCanvas.width = canvas.width;
        backgroundCanvas.height = canvas.height;
        backgroundContext = backgroundCanvas.getContext("2d");

        drawBackground(backgroundContext);
        drawicecreamcounter(backgroundContext);
        drawstandingDesk(backgroundContext,  { x: 900, y: 280 }, 50)
        drawstandingDesk(backgroundContext,  { x: 940, y: 600 }, 50)
        drawstandingDesk(backgroundContext,  { x: 670, y: 600 }, 50)
        drawstandingDesk(backgroundContext,  { x: 300, y: 640 }, 50)


    };

    // Hintergrundfarbe zeichnen
    function drawBackground(crc2: CanvasRenderingContext2D): void {
        crc2.fillStyle = "#E8DCCA";
        crc2.fillRect(0, 0, crc2.canvas.width, crc2.canvas.height);
    }

    // Eistheke zeichnen
    function drawicecreamcounter(crc2: CanvasRenderingContext2D) {

        crc2.fillStyle = "#D9D9D9";
        crc2.strokeStyle = "#000";
        crc2.lineWidth = 0.5;

        let x = 170;
        let y = 230; 
        let width = 500; 
        let height = 200; 
        let cornerRadius = 10; 

        crc2.beginPath();
        crc2.moveTo(x + cornerRadius, y);
        crc2.arcTo(x + width, y, x + width, y + cornerRadius, cornerRadius);
        crc2.arcTo(x + width, y + height, x + width - cornerRadius, y + height, cornerRadius);
        crc2.arcTo(x, y + height, x, y + height - cornerRadius, cornerRadius);
        crc2.arcTo(x, y, x + cornerRadius, y, cornerRadius);
        crc2.closePath();

        crc2.fill();
        crc2.stroke(); 

    };


    function drawicecreamdealer() {
        crc2.save();
        crc2.translate(this.position.x, this.position.y);

        // Körper
        crc2.beginPath();
        crc2.arc(0, 0, this.size.x / 4, 0, 2 * Math.PI);
        crc2.fillStyle = "brown";
        crc2.fill();
        crc2.closePath();

        // Kopf
        crc2.beginPath();
        crc2.arc(0, -this.size.x / 4, this.size.x / 8, 0, 2 * Math.PI);
        crc2.fillStyle = "bisque";
        crc2.fill();
        crc2.closePath();

        crc2.restore();
    }

    function drawstandingDesk(crc2: CanvasRenderingContext2D, position: Vector, radius: number): void {
        crc2.save();
      
        crc2.beginPath();
        crc2.arc(position.x, position.y, radius, 0, 2 * Math.PI);
        crc2.fillStyle = "brown"; // Braune Füllung
        crc2.fill();
        crc2.closePath();
      
        crc2.restore();
      }

}