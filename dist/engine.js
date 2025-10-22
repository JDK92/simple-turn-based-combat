"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startGame = void 0;
// Imports
require("colors");
const readline_1 = require("readline");
const combat_1 = require("./combat");
const utils_1 = require("./utils");
// Input interaction interface
const rl = (0, readline_1.createInterface)({
    input: process.stdin,
    output: process.stdout
});
const askQuestion = (question) => {
    return new Promise(res => {
        rl.question(question, res);
    });
};
const menu = {
    1: "Attack",
    2: "Defend",
    3: "Heal",
};
// Game
const startGame = async (player, enemy) => {
    let isRunning = true;
    while (isRunning) {
        const { battleDone, message } = (0, utils_1.checkWinner)(player, enemy);
        console.log(`${player.name} [${(0, utils_1.showHPBar)(player)}](${(player.currentHP <= 0) ? 0 : player.currentHP}/${player.maxHP})`);
        console.log(`${enemy.name} [${(0, utils_1.showHPBar)(enemy)}](${(enemy.currentHP <= 0) ? 0 : enemy.currentHP}/${enemy.maxHP})`);
        if (battleDone) {
            console.log(message);
            isRunning = !isRunning;
            break;
        }
        (0, utils_1.displayMenu)(menu);
        const answer = await askQuestion(`\nWhat do you want to do?\n`);
        const enemyMove = (0, combat_1.setEnemyMove)();
        switch (answer) {
            case "1":
                console.log(`\n${player.name} decides to attack`.cyan);
                const playerDamageAtk = (0, combat_1.attack)(player);
                if (enemyMove === 1) {
                    const enemyDamageAtk = (0, combat_1.attack)(enemy);
                    console.log(`${enemy.name} decides to attack\n`.magenta);
                    enemy.currentHP = enemy.currentHP - (playerDamageAtk - enemy.def);
                    player.currentHP = player.currentHP - (enemyDamageAtk - player.def);
                }
                if (enemyMove === 2) {
                    console.log(`${enemy.name} decides to defend\n`.magenta);
                    enemy.currentHP = enemy.currentHP - (playerDamageAtk - (0, combat_1.defend)(enemy));
                }
                if (enemyMove === 3) {
                    console.log(`${enemy.name} decides to heal\n`.magenta);
                    enemy.currentHP = enemy.currentHP - (playerDamageAtk - enemy.def);
                    enemy.currentHP = (0, combat_1.heal)(enemy);
                }
                await askQuestion(`\nPress enter to continue...\n`.dim);
                break;
            case "2":
                console.log(`\n${player.name} decides to defend`.cyan);
                if (enemyMove === 1) {
                    const enemyDamageAtk = (0, combat_1.attack)(enemy);
                    console.log(`${enemy.name} decides to attack\n`.magenta);
                    player.currentHP = player.currentHP - (enemyDamageAtk - (0, combat_1.defend)(player));
                }
                if (enemyMove === 2) {
                    console.log(`${enemy.name} decides to defend\n`.magenta);
                    console.log("No damage done...".bgWhite.black);
                }
                if (enemyMove === 3) {
                    console.log(`${enemy.name} decides to heal\n`.magenta);
                    enemy.currentHP = (0, combat_1.heal)(enemy);
                    console.log("No damage done...".bgWhite.black);
                }
                await askQuestion(`\nPress enter to continue...\n`.dim);
                break;
            case "3":
                console.log(`\n${player.name} decides to heal`.cyan);
                if (enemyMove === 1) {
                    const enemyDamageAtk = (0, combat_1.attack)(enemy);
                    console.log(`${enemy.name} decides to attack\n`.magenta);
                    player.currentHP = player.currentHP - (enemyDamageAtk - (0, combat_1.defend)(player));
                    player.currentHP = (0, combat_1.heal)(player);
                }
                if (enemyMove === 2) {
                    player.currentHP = (0, combat_1.heal)(player);
                    console.log(`${enemy.name} decides to defend\n`.magenta);
                    console.log("No damage done...".bgWhite.black);
                }
                if (enemyMove === 3) {
                    player.currentHP = (0, combat_1.heal)(player);
                    enemy.currentHP = (0, combat_1.heal)(enemy);
                    console.log(`${enemy.name} decides to heal\n`.magenta);
                    console.log("No damage done...".bgWhite.black);
                }
                await askQuestion(`\nPress enter to continue...\n`.dim);
                break;
            default:
                console.log("\nInvalid option. Try again.\n");
                await askQuestion(`\nPress enter to continue...\n`.dim);
                break;
        }
    }
};
exports.startGame = startGame;
