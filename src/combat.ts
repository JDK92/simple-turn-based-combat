import { Character } from './types';

// Attack
export const attack = (x: Character): number => {
    const { bonus, atk } = x;

    const luckyRoll: number = Math.round(Math.random() * 100) / 100;

    const hasBonus: boolean = (bonus > luckyRoll);

    return (hasBonus) ? atk * 1.50 : atk;

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