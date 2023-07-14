namespace finaltask01 {

   export enum MoodVisitor {
        Happy,
        Neutral,
        Angry,
    }

   export class Visitor {
        x: number;
        y: number;
        mood: MoodVisitor;
        pricetopay: number;
        
        
        constructor(x: number, y: number, pricetopay: number,  mood: MoodVisitor) {
          this.x = x;
          this.y = y;
        }
        
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
        }
        
        createButton(): void {
          let assignbutton = document.createElement("button");
          assignbutton.innerText = "assign a place";
          assignbutton.id = "assign-button";
          assignbutton.addEventListener("click", () => {
            crc2.clearRect(this.x - 70, this.y - 70, 70, 70);
            this.getToTable();
            assignbutton.style.display = "none";
          });
          document.body.appendChild(assignbutton);
        }
        
        getToTable(): void {
          let tableoptions = [
            { x: 200, y: 300 },
            { x: 470, y: 253},
            { x: 450, y: 95 },
            { x: 285, y: 300 }
          ];
          // Wähle einen zufälligen Platz aus
          let randomIndex = Math.floor(Math.random() * tableoptions.length);
          let chosenPlace = tableoptions[randomIndex];

          crc2.clearRect(this.x - 35, this.y - 35, 70, 70);
          
          // Aktualisiere die Koordinaten des Besuchers und zeichne ihn an den neuen Platz
          this.x = chosenPlace.x;
          this.y = chosenPlace.y;
          this.drawvisitor();

            // Erstelle automatisch eine Bestellung
         this.ordericecream();

      // Zeige den Bestell-Button an der Position des Besuchers
        this.showOrderButton();
        }

        ordericecream():void  {

          // Wähle eine zufällige Eissorte
      let randomIndex = Math.floor(Math.random() * eissorten.length);
      let chosenIceCream = eissorten[randomIndex];

      // Erstelle eine Bestellung mit der gewählten Eissorte
      this.order = new IceCreamOrder(chosenIceCream);
        };

        showOrderButton(): void {
          // Erstelle den Button
          let button = document.createElement("button");
          button.innerText = "View Order";
          button.addEventListener("click", () => {
            this.showOrder();
          });
    
          // Positioniere den Button
          button.style.position = "absolute";
          button.style.left = `${this.x - 50}px`;
          button.style.top = `${this.y + 50}px`;
    
          // Füge den Button dem Dokument hinzu
          document.body.appendChild(button);
    
          // Speichere eine Referenz auf den Button
          this.receiptButton = button;
        }
    
        showOrder(): void {
          // Überprüfe, ob eine Bestellung vorhanden ist
          if (this.order) {
            // Zeige die Bestellung an
            console.log("Order: ", this.order);
    
            // Entferne den Button
            if (this.receiptButton) {
              this.receiptButton.remove();
              this.receiptButton = null;
            }
          }


  
      }

} }