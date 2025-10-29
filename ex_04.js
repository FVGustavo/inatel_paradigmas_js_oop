class Hunter {
    nome;
    idade;
    #localizacao;

    constructor(nome, local, idade) {
        this.nome = nome;
        this.idade = idade;
        this.#localizacao = local;
    }

    getLocalizacao() {
        return this.#localizacao;
    }

    _setLocalizacao(novaLocal) {
        this.#localizacao = novaLocal;
    }
}

class Especialista extends Hunter {
    #habilidadeNen;

    constructor(nome, local, idade, habilidade) {
        super(nome, local, idade);
        this.#habilidadeNen = habilidade;
    }

    rastrearLocal(latitude, longitude) {
        const novaLocalizacao = `[${latitude}, ${longitude}] (Usando ${this.#habilidadeNen})`;
        this._setLocalizacao(novaLocalizacao);
        
        return `${this.nome} [Especialista] rastreado. Localização: ${novaLocalizacao}`;
    }
}

class Manipulador extends Hunter {
    #alvoAtual;

    constructor(nome, local, idade, alvo = null) {
        super(nome, local, idade);
        this.#alvoAtual = alvo;
    }

    rastrearLocal(latitude, longitude) {
        const nomeAlvo = this.#alvoAtual ? this.#alvoAtual.nome : "nenhum alvo";
        const novaLocalizacao = `[${latitude}, ${longitude}] (Focado em ${nomeAlvo})`;

        this._setLocalizacao(novaLocalizacao);
        
        return `${this.nome} [Manipulador] rastreado. Localização: ${novaLocalizacao}`;
    }
}

class Batalhao {
    #hunters;

    constructor() {
        this.#hunters = new Set();
    }

    adicionarHunter(hunter) {
        let hunterJaExiste = false;
        for (const h of this.#hunters) {
            if (h.nome === hunter.nome) {
                hunterJaExiste = true;
                break;
            }
        }

        if (hunterJaExiste) {
            console.log(`Falha ao adicionar. Hunter "${hunter.nome}" já está no batalhão.`);
        } else {
            this.#hunters.add(hunter);
            console.log(`${hunter.nome} foi adicionado ao batalhão.`);
        }
    }

    getNumHunters() {
        return this.#hunters.size;
    }

    iniciarRastreamento(latitude, longitude) {
        console.log(`\n--- Iniciando Rastreamento em [${latitude}, ${longitude}] ---`);
        
        const resultadosRastreamento = [];

        for (const hunter of this.#hunters) {
            if (typeof hunter.rastrearLocal === 'function') {
                const resultado = hunter.rastrearLocal(latitude, longitude);
                resultadosRastreamento.push(resultado);
            } else {
                resultadosRastreamento.push(`${hunter.nome} não é rastreável.`);
            }
        }
        
        return resultadosRastreamento;
    }
}

console.log("\n=== Associação Hunter - Registro de Batalhão ===\n");

const gon = new Especialista("Gon Freecss", "Ilha da Baleia", 12, "Reforço (Jajanken)");
const killua = new Especialista("Killua Zoldyck", "Montanha Kukuroo", 12, "Transformação (Godspeed)");
const hisoka = new Manipulador("Hisoka Morrow", "Desconhecida", 28);
const illumi = new Manipulador("Illumi Zoldyck", "Montanha Kukuroo", 24, hisoka);

const batalhaoHunter = new Batalhao();

batalhaoHunter.adicionarHunter(gon);
batalhaoHunter.adicionarHunter(killua);
batalhaoHunter.adicionarHunter(hisoka);
batalhaoHunter.adicionarHunter(illumi);

const gonDuplicado = new Especialista("Gon Freecss", "Torre Celestial", 13, "Outra Habilidade");
batalhaoHunter.adicionarHunter(gonDuplicado);

const chrollo = new Especialista("Chrollo Lucilfer", "Cidade Meteoro", 28, "Skill Hunter");
batalhaoHunter.adicionarHunter(chrollo);

console.log(`\nNúmero total de Hunters no batalhão: ${batalhaoHunter.getNumHunters()}`);

const resultados = batalhaoHunter.iniciarRastreamento("22.9068° S", "43.1729° W");

resultados.forEach(r => console.log(r));
