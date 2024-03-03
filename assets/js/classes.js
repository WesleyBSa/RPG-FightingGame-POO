// Knight ou Sorcerer - Guerreiro ou mago
// LittleMonster ou BigMonster

class Character {

    _life = 1;
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
        this._life = newLife < 0 ? 0 : newLife;
    }
}

class Knight extends Character {
    constructor(name) {
        super(name);
        this.life = 100;
        this.maxLife = this.life;
        this.attack = 10;
        this.defense = 8;
    }
}

class Sorcerer extends Character {
    constructor(name) {
        super(name);
        this.life = 80;
        this.maxLife = this.life;
        this.attack = 15;
        this.defense = 3;
    }
}

class LittleMonster extends Character {
    constructor() {
        super('Little Monster');
        this.life = 40;
        this.maxLife = this.life;
        this.attack = 4;
        this.defense = 4;
    }
}

class BigMonster extends Character {
    constructor() {
        super('Big Monster');
        this.life = 120;
        this.maxLife = this.life;
        this.attack = 16;
        this.defense = 6;
    }
}

class Stage {
    constructor(fighter1, fighter2, fighter1El, fighter2El, logObject) {
        this.fighter1 = fighter1;
        this.fighter2 = fighter2;
        this.fighter1El = fighter1El;
        this.fighter2El = fighter2El;
        this.log = logObject;
    }

    start() {
        this.update();
        this.fighter1El.querySelector('.attackbutton').addEventListener('click', () => this.doAttack(this.fighter1, this.fighter2));
        this.fighter2El.querySelector('.attackbutton').addEventListener('click', () => this.doAttack(this.fighter2, this.fighter1));
    }

    update() {
        this.updateCharacterView(this.fighter1, this.fighter1El);
        this.updateCharacterView(this.fighter2, this.fighter2El);
    }

    updateCharacterView(character, element) {
        element.querySelector('.name').innerHTML = `${character.name} - ${character.life.toFixed(1)} HP`;
        let pct = (character.life / character.maxLife) * 100;
        element.querySelector('.lifebar .bar').style.width = `${pct}%`;
    }

    doAttack(attacking, attacked) {
        if (attacking.life <= 0 || attacked.life <= 0) {
            this.log.addMessage(`Está morto`);
            this.checkVictory();
            return;
        }

        let attackFactor = (Math.random() * 2).toFixed(2);
        let defenseFactor = (Math.random() * 2).toFixed(2);

        let actualAttack = attacking.attack * attackFactor;
        let actualDefense = attacked.defense * defenseFactor;

        if (actualAttack > actualDefense) {
            attacked.life -= actualAttack;
            this.log.addMessage(`${attacking.name} causou ${actualAttack.toFixed(2)} de dano em ${attacked.name}`);
            
            // Adicionando animação visual de ataque ao lutador que está sendo atacado
            this.showAttackAnimation(attacked);
        } else {
            this.log.addMessage(`${attacked.name} conseguiu defender.`);
        }

        this.update();
        this.checkVictory();
    }

    showAttackAnimation(attacked) {
        const attackedEl = attacked === this.fighter1 ? this.fighter1El : this.fighter2El;

        attackedEl.classList.add('attack-animation');

        // Remova a classe após um curto período para que a animação não permaneça indefinidamente
        setTimeout(() => {
            attackedEl.classList.remove('attack-animation');
        }, 1000); // Ajuste o tempo conforme necessário
    }

    checkVictory() {
        if (this.fighter1.life <= 0) {
            this.log.addMessage(`${LittleMonster} venceu!`);
            this.showWinnerMessage(this.fighter2.name);
            this.disableButtons();
        } else if (this.fighter2.life <= 0) {
            this.log.addMessage(`${'Guerreiro'} venceu`);
            this.showWinnerMessage(this.fighter1.name);
            this.disableButtons();
        }
    }

    disableButtons() {
        this.fighter1El.querySelector('.attackbutton').disabled = true;
        this.fighter2El.querySelector('.attackbutton').disabled = true;
    }
    
    showWinnerMessage(winnerName) {
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
        this.listEl.innerHTML = '';

        for (let i in this.list) {
            this.listEl.innerHTML += `<li><span>🗡</span>${this.list[i]}</li>`;
        }
    }

}
