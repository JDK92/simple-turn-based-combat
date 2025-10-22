"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setEnemyMove = exports.heal = exports.defend = exports.attack = void 0;
// Attack
const attack = (x) => {
    const { bonus, atk, name } = x;
    let attackValue = 0;
    const luckyRoll = Math.round(Math.random() * 100) / 100;
    const hasBonus = (bonus > luckyRoll);
    if (hasBonus) {
        attackValue = atk * 1.50;
    }
    else {
        attackValue = atk;
    }
    console.log(`${name} deals ${attackValue} damage`);
    return attackValue;
};
exports.attack = attack;
// Defend
const defend = (x) => x.def * 1.05;
exports.defend = defend;
// Heal
const heal = (x) => {
    const { currentHP, maxHP } = x;
    const healing = maxHP * 0.15;
    return (healing + currentHP >= maxHP) ? maxHP : healing + currentHP;
};
exports.heal = heal;
// Enemy Move
const setEnemyMove = () => Math.floor(Math.random() * 3) + 1;
exports.setEnemyMove = setEnemyMove;
