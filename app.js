const SecretKey = require('./SecretKey');
const hashMessage = require('./HMAC');
const Game = require('./GameSession');
const takeValue = require('./TakeValue');
const game = new Game();
const secretkey = new SecretKey();
const securemessage = new hashMessage();


app();

function app() {
    game.makeMoves();
    game.createRules();
    console.log('New game!');
    game.createCompMove();
    game.secretKey = secretkey.create();
    securemessage.createHMAC(game.secretKey, game.ongoingCompMove);
    console.log('HMAC: ', securemessage.hash);
    game.showMenu();
    playgame();
}

async function playgame() {
    const answer = await takeValue('Choose move: ');
    if ((answer >= 0 && answer <= game.moves.length) || answer == '?') {
        switch (answer) {
            case '?':
                console.table(game.rules);
                playgame();
                break;
            case '0':
                break;
            default:
                {
                    console.log('Your move: ', game.moves[answer - 1]);
                    console.log('Computer move: ', game.ongoingCompMove);
                    console.log('Result: ', game.determineResult(game.moves[answer - 1], game.ongoingCompMove));
                    console.log('HMAC key: ', game.secretKey);

                    const exit = await takeValue('Do you want to play again? (yes/no): ');
                    exit == 'yes' ? app() : process.exit();
                }
        }
    } else {
        console.log('The wrong command! Please, try again.');
        playgame();
    }
}