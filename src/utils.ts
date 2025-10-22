import { Character } from './types';

// Check winner
export const checkWinner = (player: Character, enemy: Character) => {
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
}


// Health bar - Alpha version
export const showHPBar = (character: Character) => {
    const { currentHP, maxHP } = character;

    let HPBaseChar: string = "0";

    let HPBar: string = "";

    if (currentHP <= 30) {
        HPBar = HPBaseChar.repeat(Math.ceil(currentHP * 20 / 100)).red;
    } else if (currentHP <= 70) {
        HPBar = HPBaseChar.repeat(Math.ceil(currentHP * 20 / 100)).yellow;
    } else if (currentHP <= maxHP) {
        HPBar = HPBaseChar.repeat(20).green;
    }

    return HPBar;
}


// Display menu
export const displayMenu = (menu: Record<number, string>) => {
    console.log("\n===== SIMPLE TURNED BASE GAME =====\n".red);
    for (const [key, value] of Object.entries(menu)) {
        console.log(`${key}. ${value}`)
    }
}
