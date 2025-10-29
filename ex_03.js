class Criatura {
    nome;
    perigosa;

    constructor(nome, perigosa) {
        this.nome = nome;
        this.perigosa = perigosa;
    }
}

class Personagem {
    nome;
    idade;

    constructor(nome, idade) {
        this.nome = nome;
        this.idade = idade;
    }
}

class Diario {
    #autorSecreto;
    enigmas;
    criaturasAvistadas;

    constructor(autor) {
        this.#autorSecreto = autor;
        this.enigmas = new Map();
        this.criaturasAvistadas = [];
    }

    getAutor() {
        return "O Autor do Diário";
    }

    adicionarEnigma(num, enigma) {
        this.enigmas.set(num, enigma);
        console.log(`Enigma ${num} adicionado.`);
    }

    adicionarCriatura(criatura) {
        this.criaturasAvistadas.push(criatura);
    }

    decodificar(chave, num) {
        if (chave !== this.#autorSecreto) {
            return `Chave "${chave}" incorreta!`;
        }

        const enigmaDecodificado = this.enigmas.get(num);

        if (enigmaDecodificado) {
            return `[ENIGMA ${num}] ${enigmaDecodificado}`;
        } else {
            return `Enigma de índice ${num} não encontrado.`;
        }
    }
}

class Protagonista extends Personagem {
    diario;

    constructor(nome, idade, diario) {
        super(nome, idade);
        this.diario = diario;
    }
}

class CabanaMisterio {
    visitantes;
    #funcionarios;

    constructor(funcionariosIniciais = []) {
        this.visitantes = [];
        this.#funcionarios = funcionariosIniciais;
    }

    listarFuncionarios() {
        console.log(`--- Funcionários da Cabana do Mistério ---`);
        return this.#funcionarios;
    }
}

const chaveSecreta = "STANFORD";
const diario3 = new Diario(chaveSecreta);

diario3.adicionarEnigma(1, "OS GNOMOS SÃO FRACOS CONTRA SOPRADORES DE FOLHAS!");
diario3.adicionarEnigma(618, "BILL ESTÁ OBSERVARNDO...");
diario3.adicionarCriatura(new Criatura("Gnomo da Floresta", false));
diario3.adicionarCriatura(new Criatura("Multi-Urso", true));

const stan = new Personagem("Tivô Stan", 60);
const soos = new Personagem("Soos", 22);

const dipper = new Protagonista("Dipper Pines", 12, diario3);

const cabana = new CabanaMisterio([stan, soos]);

let segredo = dipper.diario.decodificar("BILL", 618);
console.log(segredo);

segredo = dipper.diario.decodificar("STANFORD", 618);
console.log(segredo);

segredo = dipper.diario.decodificar(chaveSecreta, 1);
console.log(segredo);

segredo = dipper.diario.decodificar(chaveSecreta, 99);
console.log(segredo);

const funcionarios = cabana.listarFuncionarios();

funcionarios.forEach(func => {
    console.log(`- ${func.nome} (Idade: ${func.idade})`);
});
