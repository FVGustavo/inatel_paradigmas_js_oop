class ODM_Gear {
    #gasRestante;
    modelo;

    constructor(modelo) {
        this.modelo = modelo;
        this.#gasRestante = 100.0;
    }

    usarGas(quantidade) {
        if (this.#gasRestante >= quantidade) {
            this.#gasRestante -= quantidade;
            return true;
        } else {
            console.log(`${this.modelo} está sem gás!`);
            return false;
        }
    }

    getGas() {
        return this.#gasRestante.toFixed(2);
    }

    verificarStatusEquipamento() {
        return `Equipamento: ${this.modelo}; Gás: ${this.getGas()}%`;
    }
}

class Soldado {
    nome;
    #gear;

    constructor(nome, modeloGear) {
        this.nome = nome;
        this.#gear = new ODM_Gear(modeloGear);
    }

    explorarTerritorio() {
        console.log(`${this.nome} está explorando...`);
        const gasUsado = 20;
        
        if (this.#gear.usarGas(gasUsado)) {
            return `${this.nome} explorou os arredores.`;
        } else {
            return `${this.nome} falhou em explorar (sem gás)!`;
        }
    }

    verificarEquipamento() {
        return `${this.nome}: ${this.#gear.verificarStatusEquipamento()}`;
    }
}

class Esquadrao {
    lider;
    membros;

    constructor(lider, membrosIniciais = []) {
        this.lider = lider;

        this.membros = [lider, ...membrosIniciais];
    }

    adicionarMembro(soldado) {
        this.membros.push(soldado);
        console.log(`${soldado.nome} juntou-se ao Esquadrão de ${this.lider.nome}.`);
    }

    explorarTerritorio() {
        console.log(`\n--- Esquadrão de ${this.lider.nome} iniciando exploração ---\n`);

        const relatorios = this.membros.map(soldado => {
            return soldado.explorarTerritorio();
        });

        console.log("\n--- Relatório da Missão ---\n");
        relatorios.forEach(r => console.log(r));
        return "Exploração do esquadrão concluída.\n";
    }

    relatarStatus() {
        console.log(`\n--- Status do Esquadrão (Líder: ${this.lider.nome}) ---\n`);
        const statusArray = this.membros.map(soldado => {
            return soldado.verificarEquipamento();
        });
        return statusArray;
    }
}

const levi = new Soldado("Capitão Levi", "Modelo 'Asas da Liberdade'");
const mikasa = new Soldado("Mikasa Ackerman", "Modelo Padrão-A");
const armin = new Soldado("Armin Arlert", "Modelo Leve");

const esquadraoLevi = new Esquadrao(levi, [mikasa]);

esquadraoLevi.adicionarMembro(armin);

const statusInicial = esquadraoLevi.relatarStatus();
console.log(statusInicial.join('\n'));

esquadraoLevi.explorarTerritorio();

const statusFinal = esquadraoLevi.relatarStatus();
console.log(statusFinal.join('\n'));