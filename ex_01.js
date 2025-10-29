class Pokemon {
    #vida;
    #vidaMaxima;

    nome;
    tipo;

    constructor(nome, tipo, vidaInicial) {
        this.nome = nome;
        this.tipo = tipo;
        this.#vida = vidaInicial;
        this.#vidaMaxima = vidaInicial;
    }

    getVida() {
        return this.#vida;
    }

    _modificarVida(valor) {
        this.#vida += valor;

        if (this.#vida <= 0){
            this.#vida = 0;
        }

        if (this.#vida > this.#vidaMaxima){
            this.#vida = this.#vidaMaxima;
        }
    }

    receberDano(dano) {
        this._modificarVida(-dano);
        console.log(`${this.nome} recebeu ${dano} de dano. Vida atual: ${this.getVida()}`);
    }

    curar(valor) {
        this._modificarVida(valor);
        console.log(`${this.nome} se curou em ${valor} pontos. Vida atual: ${this.getVida()}`);
    }

    atacar(alvo) {
        const danoBase = 10;
        console.log(`${this.nome} ataca ${alvo.nome}.`);
        alvo.receberDano(danoBase);
    }
}

class PokemonFogo extends Pokemon {
    bonusAtaque;

    constructor(nome, vidaInicial, bonus) {
        super(nome, "Fogo", vidaInicial);
        this.bonusAtaque = bonus;
    }

    atacar(alvo) {
        const danoTotal = 15 + this.bonusAtaque;
        console.log(`${this.nome} usa Lança-chamas em ${alvo.nome}!`);
        alvo.receberDano(danoTotal);
    }
}

class PokemonAgua extends Pokemon {
    #curaBase;

    constructor(nome, vidaInicial, curaBase) {
        super(nome, "Água", vidaInicial);
        this.#curaBase = curaBase;
    }

    atacar(alvo) {
        const danoAtaque = 12;
        console.log(`${this.nome} usa Jato d'Água em ${alvo.nome}!`);
        alvo.receberDano(danoAtaque);

        console.log(`${this.nome} se recupera!`);
        this.curar(this.#curaBase);
    }
}

const charizard = new PokemonFogo("Charizard", 100, 8);
const blastoise = new PokemonAgua("Blastoise", 120, 5);

console.log(`\n--- Status Iniciais ---`);
console.log(`${charizard.nome} (Tipo: ${charizard.tipo}) - Vida: ${charizard.getVida()}`);
console.log(`${blastoise.nome} (Tipo: ${blastoise.tipo}) - Vida: ${blastoise.getVida()}`);

console.log(`\n--- Turno 1 ---`);
charizard.atacar(blastoise);

console.log(`\n--- Turno 2 ---`);
blastoise.atacar(charizard);

console.log(`\n--- Turno 3 ---`);
charizard.atacar(blastoise);

console.log(`\n--- Status Finais ---`);
console.log(`${charizard.nome} - Vida: ${charizard.getVida()}`);
console.log(`${blastoise.nome} - Vida: ${blastoise.getVida()}`);
