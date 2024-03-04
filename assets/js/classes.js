// Knight ou Sorcerer - Guerreiro ou mago
// LittleMonster ou BigMonster

class Character {

    _life = 1; //Tanto o life quando o maxLife começam com valores "1" pois zerado os personagens estariam mortos xD.
    maxLife = 1;
    attack = 0;
    defense = 0;

    constructor(name) {
        this.name = name;
    }

    get life() {
        return this._life;
    }
    set life(newLife) {
        this._life = newLife < 0 ? 0 : newLife; //Por padrão, após levar um ataque que faça o personagem ir a 0 ou  abaixo de 0, o life fica setado para o minimo que é o próprio 0.
    }
}

//Classe com caracteristicas do guerreiro
class Knight extends Character {
    constructor(name) {
        super(name);
        this.life = 100;
        this.maxLife = this.life;
        this.attack = 10;
        this.defense = 8;
    }
}

//Classe com caracteristicas do mago
class Sorcerer extends Character {
    constructor(name) {
        super(name);
        this.life = 80;
        this.maxLife = this.life;
        this.attack = 15;
        this.defense = 3;
    }
}

//Classe com caracteristicas do little monster
class LittleMonster extends Character {
    constructor() {
        super('Little Monster');
        this.life = 40;
        this.maxLife = this.life;
        this.attack = 4;
        this.defense = 4;
    }
}

//Classe com caracteristicas do big monster
class BigMonster extends Character {
    constructor() {
        super('Big Monster');
        this.life = 120;
        this.maxLife = this.life;
        this.attack = 16;
        this.defense = 6;
    }
}

// --------------------------------------------------------------------------------------

//Classe cenário
class Stage {
    constructor(fighter1, fighter2, fighter1El, fighter2El, logObject) { //Nesse constructor precisamos passar os 4 valores: Os 2 lutadores e os seus respectivos elementos.
        this.fighter1 = fighter1;
        this.fighter2 = fighter2;
        this.fighter1El = fighter1El;
        this.fighter2El = fighter2El;
        this.log = logObject;
    }

    start() {
        this.update();
        //TODO: Evento do botão de atacar.

        this.fighter1El.querySelector('.attackbutton').addEventListener('click', () => this.doAttack(this.fighter1, this.fighter2));

        this.fighter2El.querySelector('.attackbutton').addEventListener('click', () => this.doAttack(this.fighter2, this.fighter1));
    }

    update() {
        //fighter 1
        this.updateCharacterView(this.fighter1, this.fighter1El);
        //fighter 2
        this.updateCharacterView(this.fighter2, this.fighter2El);
    }

    updateCharacterView(character, element) {
        element.querySelector('.name').innerHTML = `${character.name} - ${character.life.toFixed(1)} HP`;
        let pct = (character.life / character.maxLife) * 100; //Calculo para a barra de vida do personagem.
        element.querySelector('.lifebar .bar').style.width = `${pct}%`; //Pega o elemento, adiciona no seu estilo o 100% na largura, preenchendo assim toda a barra de vida.
    }

    doAttack(attacking, attacked) {
        if (attacking.life <= 0 || attacked.life <= 0) { //Condicional para identificar se um dos atacados chegou a 0 de hp, chegando no indice 0 o personagem está morto.
            this.log.addMessage(`Está morto`);
            this.checkVictory();
            return;
        }

        let attackFactor = (Math.random() * 2).toFixed(2); //Fator aleatório para a força de ataque, utilizando o Math.random() * 2 permitimos que os valores aletórios seja no máximo o dobro do parametro padrão.
        let defenseFactor = (Math.random() * 2).toFixed(2);

        let actualAttack = attacking.attack * attackFactor;
        let actualDefense = attacked.defense * defenseFactor;

        if (actualAttack > actualDefense) { //Condicional para caso o  índice de ataque atual seja maior que o índice de defesa o atacado receba dano.
            attacked.life -= actualAttack; //Reduz a vida do atacado.
            this.log.addMessage(`${attacking.name} causou ${actualAttack.toFixed(2)} de dano em ${attacked.name}`);
            
            // Adicionando animação visual de ataque ao lutador que está sendo atacado.
            this.showAttackAnimation(attacked);
        } else {
            this.log.addMessage(`${attacked.name} conseguiu defender.`);
        }

        this.update(); //Atualiza o placar.
        this.checkVictory(); //Checa o vencedor.
    }

    showAttackAnimation(attacked) {
        const attackedEl = attacked === this.fighter1 ? this.fighter1El : this.fighter2El;

        attackedEl.classList.add('attack-animation');

        //Remove a classe após um curto período para que a animação não permaneça indefinidamente
        setTimeout(() => {
            attackedEl.classList.remove('attack-animation');
        }, 1000); //Tempo de animação
    }

    checkVictory() {
        if (this.fighter1.life <= 0) {
            this.log.addMessage(`Você perdeu!`);
            this.showWinnerMessage(this.fighter2.name);
            this.disableButtons();
            this.enableRestartButton();
    
            // Adiciona a classe 'dead' à imagem do personagem
            this.fighter1El.querySelector('.character-image').classList.add('dead');
        } else if (this.fighter2.life <= 0) {
            this.log.addMessage(`Você venceu!`);
            this.showWinnerMessage(this.fighter1.name);
            this.disableButtons();
            this.enableRestartButton();
    
            // Adiciona a classe 'dead' à imagem do monstro
            this.fighter2El.querySelector('.character-image').classList.add('dead');
        }
    }
    

    disableButtons() { //Desabilita a opção de atacar quando um dos personagens morre.
        this.fighter1El.querySelector('.attackbutton').disabled = true;
        this.fighter2El.querySelector('.attackbutton').disabled = true;
    }

    enableRestartButton() { //Habilita o botão de reiniciar
        document.querySelector('.restart-button').disabled = false;
    }
    
    showWinnerMessage(winnerName) { //Apresenta o vencedor no final.
        const winnerMessage = document.querySelector('.winner-message');
        winnerMessage.textContent = `${winnerName} Wins!!!`;
        winnerMessage.style.display = 'block';
    }
    
}

class Log {
    list = [];

    constructor(listEl) {
        this.listEl = listEl;
    }

    addMessage(msg) {
        this.list.push(msg);
        this.render();
    }

    render() {
        this.listEl.innerHTML = ''; //Limpa a lista HTML.

        for (let i in this.list) {
            this.listEl.innerHTML += `<li><span>🗡</span>${this.list[i]}</li>`; //Incrementa na lista as mensagens do log. de eventos.
        }
        this.listEl.scrollTop = this.listEl.scrollHeight; //Auto Scroll no log de eventos.
    }

}
