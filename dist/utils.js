"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.displayMenu = exports.showHPBar = exports.checkWinner = void 0;
// Check winner
const checkWinner = (player, enemy) => {
    if (player.currentHP <= 0) {
        return ({ battleDone: true, message: `${enemy.name} won!` });
    }
    if (enemy.currentHP <= 0) {
        return ({ battleDone: true, message: `${player.name} won!` });
    }
    if (player.currentHP <= 0 && enemy.currentHP <= 0) {
        return ({ battleDone: true, message: `It's a tie` });
    }
    return ({ battleDone: false, message: "" });
};
exports.checkWinner = checkWinner;
// Health bar - Alpha version
const showHPBar = (character) => {
    const { currentHP, maxHP } = character;
    let HPBaseChar = "0";
    let HPBar = "";
    if (currentHP <= 30) {
        HPBar = HPBaseChar.repeat(Math.ceil(currentHP * 20 / 100)).red;
    }
    else if (currentHP <= 70) {
        HPBar = HPBaseChar.repeat(Math.ceil(currentHP * 20 / 100)).yellow;
    }
    else if (currentHP <= maxHP) {
        HPBar = HPBaseChar.repeat(20).green;
    }
    return HPBar;
};
exports.showHPBar = showHPBar;
// Display menu
const displayMenu = (menu) => {
    console.log("\n===== SIMPLE TURNED BASE GAME =====\n".red);
    for (const [key, value] of Object.entries(menu)) {
        console.log(`${key}. ${value}`);
    }
};
exports.displayMenu = displayMenu;
