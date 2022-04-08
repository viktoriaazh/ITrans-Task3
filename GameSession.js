 class GameSession {
     moves;
     rules;
     ongoingCompMove;
     secretKey;

     showMenu() {
         console.log('Available moves: ');
         this.moves.forEach((el, i) => {
             console.log(`${i+1} - ${el}`);
         });
         console.log('0 - exit');
         console.log('? - help');
     }

     makeMoves() {
         const moves = process.argv.slice(2);
         this.checkMoves(moves);
         this.moves = moves;
     }

     checkMoves(moves) {
        let repeat = moves.some((move, index, arr) => { if (index != arr.length) return arr.includes(move, index + 1) });
         if (moves.length < 3) {
             console.log('Error: Number of moves must be >= 3');
             process.exit();
        }
         if (moves.length % 2 == 0) {
             console.log('Error: Number of moves must be odd');
             process.exit();
        }
         if (repeat) { 
             console.log('Error: Moves must be unique');
             process.exit();
        }
     }

     createRules(moves = this.moves) {
         this.rules = moves.reduce((cols, userMove, i, array) => {
             cols[userMove] = array.reduce((rows, compMove) => {
                 let centredMoves = this.moveCenter(array.slice(0), userMove);
                 let indexCompMove = centredMoves.indexOf(compMove);
                 rows[compMove] = (compMove == userMove) ? 'draw' :
                     indexCompMove < Math.floor(array.length / 2) ? 'lose' :
                     'win';
                 return rows;
             }, {});
             return cols;
         }, {});

     }

     moveCenter(a, moveToCenter) {
         while (a.indexOf(moveToCenter) != Math.floor(a.length / 2)) {
             a.unshift(a.pop())
         }
         return a;
     }

     createCompMove() {
         let i = Math.floor(Math.random() * this.moves.length);
         this.ongoingCompMove = this.moves[i];
     }

     determineResult(userMove, compMove) {
         return this.rules[userMove][compMove];
     }
 }

 module.exports = GameSession;