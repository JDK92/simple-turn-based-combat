interface Player {
    name: string;
    stats: {
        hp: number;
        atk: number;
        def: number;
        bonusRate: number;
    }
}


const hero: Player = {
    name: "Gojo",
    stats: {
        hp: 100,
        atk: 80,
        def: 75,
        bonusRate: 0.4
    }
}

const demon: Player = {
    name: "Dragonhorse",
    stats: {
        hp: 100,
        atk: 95,
        def: 50,
        bonusRate: 0.8
    }
}


