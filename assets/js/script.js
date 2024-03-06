let log = new Log(document.querySelector('.log'));

// Escolha dos personagens
let char = new Knight('Guerreiro');
let monster = new LittleMonster();

const stage = new Stage (
    char,
    monster,
    document.querySelector('#char'),
    document.querySelector('#monster'),
    log
);

let playerTurn = true;  // Variável para controlar o turno do jogador

function restartGame() {
    // Habilita os botões de ataque
    stage.fighter1El.querySelector('.attackbutton').disabled = false;
    stage.fighter2El.querySelector('.attackbutton').disabled = false;

    // Restaura os personagens para os valores iniciais
    char.life = char.maxLife;
    monster.life = monster.maxLife;

    // Reinicia o objeto de log
    log = new Log(document.querySelector('.log'));

    // Reinicia o objeto de cenário
    stage.log = log;
    stage.update();

    // Oculta a mensagem do vencedor
    document.querySelector('.winner-message').style.display = 'none';

    // Desabilita o botão de reiniciar
    document.querySelector('.restart-button').disabled = true;

    // Remove a classe 'dead' da imagem do personagem e do monstro
    document.querySelector('#char .character-image').classList.remove('dead');
    document.querySelector('#monster .character-image').classList.remove('dead');

    // Limpa o log após o reinício
    log.list = [];
    log.render();

    // Reinicia o turno do jogador
    playerTurn = true;
    stage.fighter2El.querySelector('.attackbutton').disabled = true;  // Desabilita o ataque do oponente no início
}

function playerAttack() {
    if (playerTurn && char.life > 0 && monster.life > 0) {
        // Desabilita o botão de ataque do jogador após atacar
        stage.fighter1El.querySelector('.attackbutton').disabled = true;
        
        // Realiza o ataque do jogador
        stage.doAttack(char, monster);
        
        // Habilita o botão de ataque do oponente
        stage.fighter2El.querySelector('.attackbutton').disabled = false;
        playerTurn = false;  // Passa o turno para o oponente
    }
}

function opponentAttack() {
    if (!playerTurn && char.life > 0 && monster.life > 0) {
        // Desabilita o botão de ataque do oponente após atacar
        stage.fighter2El.querySelector('.attackbutton').disabled = true;

        // Realiza o ataque do oponente
        stage.doAttack(monster, char);

        // Habilita o botão de ataque do jogador
        stage.fighter1El.querySelector('.attackbutton').disabled = false;
        playerTurn = true;  // Passa o turno para o jogador
    }
}

// Adiciona eventos aos botões de ataque
stage.fighter1El.querySelector('.attackbutton').addEventListener('click', playerAttack);
stage.fighter2El.querySelector('.attackbutton').addEventListener('click', opponentAttack);

stage.start();
