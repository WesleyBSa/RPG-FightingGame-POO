let log = new Log(document.querySelector('.log'));

let char = new Knight('Guerreiro');
let monster = new LittleMonster();

const stage = new Stage (
    char,
    monster,
    document.querySelector('#char'),
    document.querySelector('#monster'),
    log
);

function restartGame() {
    //Habilita os botões de ataque
    stage.fighter1El.querySelector('.attackbutton').disabled = false;
    stage.fighter2El.querySelector('.attackbutton').disabled = false;

    //Restaura os personagens para os valores iniciais
    char.life = char.maxLife;
    monster.life = monster.maxLife;

    //Reinicia o objeto de log
    log = new Log(document.querySelector('.log'));

    //Reinicia o objeto de cenário
    stage.log = log;
    stage.update();

    //Oculta a mensagem do vencedor
    document.querySelector('.winner-message').style.display = 'none';

    //Desabilita o botão de reiniciar
    document.querySelector('.restart-button').disabled = true;

    // Remove a classe 'dead' da imagem do personagem e do monstro
    document.querySelector('#char .character-image').classList.remove('dead');
    document.querySelector('#monster .character-image').classList.remove('dead');

    //Limpa o log após o reinicio
    log.list = [];
    log.render();
}

stage.start();




