var finaltask;
(function (finaltask) {
    let MoodVisitor;
    (function (MoodVisitor) {
        MoodVisitor[MoodVisitor["Happy"] = 0] = "Happy";
        MoodVisitor[MoodVisitor["Neutral"] = 1] = "Neutral";
        MoodVisitor[MoodVisitor["Angry"] = 2] = "Angry";
    })(MoodVisitor = finaltask.MoodVisitor || (finaltask.MoodVisitor = {}));
    class visitor {
        mood;
        pricetopay;
        drawvisitor(_position) {
        }
        ;
        gettotable() { }
        ;
        ordericecream() { }
        ;
        showreciept() { }
        ;
    }
    finaltask.visitor = visitor;
    class happyvisitor extends visitor {
        drawvisitor(_position) {
            finaltask.crc2.beginPath();
            finaltask.crc2.arc(_position.x, _position.y, 30, 0, 2 * Math.PI);
            finaltask.crc2.fillStyle = "lightgreen";
            finaltask.crc2.fill();
            finaltask.crc2.strokeStyle = "black";
            finaltask.crc2.lineWidth = 1;
            finaltask.crc2.stroke();
            finaltask.crc2.closePath();
            finaltask.crc2.beginPath();
            finaltask.crc2.arc(_position.x - 30 / 3, _position.y - 30 / 6, 30 / 8, 0, 2 * Math.PI);
            finaltask.crc2.fillStyle = "black";
            finaltask.crc2.fill();
            finaltask.crc2.closePath();
            finaltask.crc2.beginPath();
            finaltask.crc2.arc(_position.x + 30 / 3, _position.y - 30 / 6, 30 / 8, 0, 2 * Math.PI);
            finaltask.crc2.fillStyle = "black";
            finaltask.crc2.fill();
            finaltask.crc2.closePath();
            finaltask.crc2.beginPath();
            finaltask.crc2.arc(_position.x, _position.y + 30 / 6, 30 / 3, 0.2 * Math.PI, 0.8 * Math.PI);
            finaltask.crc2.strokeStyle = "black";
            finaltask.crc2.lineWidth = 3;
            finaltask.crc2.stroke();
            finaltask.crc2.closePath();
        }
        ;
    }
    finaltask.happyvisitor = happyvisitor;
    class neutralvisitor extends visitor {
        drawvisitor(_position) {
            finaltask.crc2.beginPath();
            finaltask.crc2.arc(_position.x, _position.y, 30, 0, 2 * Math.PI);
            finaltask.crc2.fillStyle = "yellow";
            finaltask.crc2.fill();
            finaltask.crc2.strokeStyle = "black";
            finaltask.crc2.lineWidth = 1;
            finaltask.crc2.stroke();
            finaltask.crc2.closePath();
            finaltask.crc2.beginPath();
            finaltask.crc2.arc(_position.x - 30 / 3, _position.y - 30 / 6, 30 / 8, 0, 2 * Math.PI);
            finaltask.crc2.fillStyle = "black";
            finaltask.crc2.fill();
            finaltask.crc2.closePath();
            finaltask.crc2.beginPath();
            finaltask.crc2.arc(_position.x + 30 / 3, _position.y - 30 / 6, 30 / 8, 0, 2 * Math.PI);
            finaltask.crc2.fillStyle = "black";
            finaltask.crc2.fill();
            finaltask.crc2.closePath();
            finaltask.crc2.beginPath();
            finaltask.crc2.arc(_position.x, _position.y + 30 / 6, 30 / 3, 0.2 * Math.PI, 0.8 * Math.PI);
            finaltask.crc2.strokeStyle = "black";
            finaltask.crc2.lineWidth = 3;
            finaltask.crc2.stroke();
            finaltask.crc2.closePath();
        }
        ;
    }
    class angryvisitor extends visitor {
        drawvisitor(_position) {
            finaltask.crc2.beginPath();
            finaltask.crc2.arc(_position.x, _position.y, 30, 0, 2 * Math.PI);
            finaltask.crc2.fillStyle = "red";
            finaltask.crc2.fill();
            finaltask.crc2.strokeStyle = "black";
            finaltask.crc2.lineWidth = 1;
            finaltask.crc2.stroke();
            finaltask.crc2.closePath();
            finaltask.crc2.beginPath();
            finaltask.crc2.arc(_position.x - 30 / 3, _position.y - 30 / 6, 30 / 8, 0, 2 * Math.PI);
            finaltask.crc2.fillStyle = "black";
            finaltask.crc2.fill();
            finaltask.crc2.closePath();
            finaltask.crc2.beginPath();
            finaltask.crc2.arc(_position.x + 30 / 3, _position.y - 30 / 6, 30 / 8, 0, 2 * Math.PI);
            finaltask.crc2.fillStyle = "black";
            finaltask.crc2.fill();
            finaltask.crc2.closePath();
            finaltask.crc2.beginPath();
            finaltask.crc2.arc(_position.x, _position.y + 30 / 6, 30 / 3, 0.2 * Math.PI, 0.8 * Math.PI);
            finaltask.crc2.strokeStyle = "black";
            finaltask.crc2.lineWidth = 3;
            finaltask.crc2.stroke();
            finaltask.crc2.closePath();
        }
        ;
    }
})(finaltask || (finaltask = {}));
//# sourceMappingURL=visitor.js.map