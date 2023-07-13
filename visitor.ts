namespace finaltask01 {

   export enum MoodVisitor {
        Happy,
        Neutral,
        Angry,
    }

   export abstract class Visitor {
        x: number;
        y: number;
        mood: MoodVisitor;
        pricetopay: number;
        
        constructor(x: number, y: number, pricetopay: number) {
          this.x = x;
          this.y = y;
        }
        
        drawvisitor(): void {
        
        }
        
        createButton(): void {
          let assignbutton = document.createElement("button");
          assignbutton.innerText = "assign a place";
          assignbutton.id = "assign-button";
          assignbutton.addEventListener("click", () => {
            this.getToTable();
          });
          document.body.appendChild(assignbutton);
        }
        
        getToTable(): void {
          let tableoptions = [
            { x: 200, y: 300 },
            { x: 400, y: 500 },
            { x: 600, y: 700 },
            { x: 800, y: 900 }
          ];
          
          // Wähle einen zufälligen Platz aus
          let randomIndex = Math.floor(Math.random() * tableoptions.length);
          let chosenPlace = tableoptions[randomIndex];
          
          // Aktualisiere die Koordinaten des Besuchers und zeichne ihn an den neuen Platz
          this.x = chosenPlace.x;
          this.y = chosenPlace.y;
          this.drawvisitor();
        }

        ordericecream():void  {};
        showreciept():void  {};
      }

export class happyvisitor extends Visitor {

  constructor(x: number, y: number, pricetopay: number) {
    super(x, y, pricetopay); }
    
    drawvisitor(): void {

        crc2.save();
        crc2.translate(this.x, this.y);

        crc2.beginPath();
        crc2.arc(this.x, this.y, 30, 0, 2 * Math.PI);
        crc2.fillStyle = "lightgreen";
        crc2.fill();
        crc2.strokeStyle = "black";
        crc2.lineWidth = 1;
        crc2.stroke();
        crc2.closePath();

        crc2.beginPath();
        crc2.arc(this.x - 30 / 3, this.y - 30 / 6, 30 / 8, 0, 2 * Math.PI);
        crc2.fillStyle = "black";
        crc2.fill();
        crc2.closePath();

        crc2.beginPath();
        crc2.arc(this.x  + 30 / 3, this.y - 30 / 6, 30 / 8, 0, 2 * Math.PI);
        crc2.fillStyle = "black";
        crc2.fill();
        crc2.closePath();

        crc2.beginPath();
        crc2.arc(this.x , this.y + 30 / 6, 30 / 3, 0.2 * Math.PI, 0.8 * Math.PI);
        crc2.strokeStyle = "black";
        crc2.lineWidth = 3;
        crc2.stroke();
        crc2.closePath();

        crc2.restore();
    };


    }

}