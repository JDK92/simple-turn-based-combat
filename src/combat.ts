import { Character } from './types';

// Attack
export const attack = (x: Character): number => {
    const { bonus, atk, name } = x;

    let attackValue: number = 0;

    const luckyRoll: number = Math.round(Math.random() * 100) / 100;

    const hasBonus: boolean = (bonus > luckyRoll);

    if (hasBonus) {
        attackValue = atk * 1.50;
    } else {
        attackValue = atk;
    }

    console.log(`${name} deals ${attackValue} damage`);
    return attackValue;

}

// Defend
export const defend = (x: Character): number => x.def * 1.05;

// Heal
export const heal = (x: Character) => {
    const { currentHP, maxHP } = x;

    const healing = maxHP * 0.15;

    return (healing + currentHP >= maxHP) ? maxHP : healing + currentHP;
};

// Enemy Move
export const setEnemyMove = (): number => Math.floor(Math.random() * 3) + 1;