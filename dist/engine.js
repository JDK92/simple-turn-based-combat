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
        if (battleDone) {
            console.log(message);
            isRunning = !isRunning;
            break;
        }
        console.log(`${player.name} [${(0, utils_1.showHPBar)(player)}](${player.currentHP}/${player.maxHP})`);
        console.log(`${enemy.name} [${(0, utils_1.showHPBar)(enemy)}](${enemy.currentHP}/${enemy.maxHP})`);
        (0, utils_1.displayMenu)(menu);
        const answer = await askQuestion(`\nWhat do you want to do?\n`);
        const enemyMove = (0, combat_1.setEnemyMove)();
        switch (answer) {
            case "1":
                console.log(`${player.name} decides to attack`.cyan);
                if (enemyMove === 1) {
                    console.log(`${enemy.name} decides to attack\n`.magenta);
                    enemy.currentHP = enemy.currentHP - ((0, combat_1.attack)(player) - enemy.def);
                    player.currentHP = player.currentHP - ((0, combat_1.attack)(enemy) - player.def);
                }
                if (enemyMove === 2) {
                    console.log(`${enemy.name} decides to defend\n`.magenta);
                    enemy.currentHP = enemy.currentHP - ((0, combat_1.attack)(player) - (0, combat_1.defend)(enemy));
                }
                if (enemyMove === 3) {
                    console.log(`${enemy.name} decides to heal\n`.magenta);
                    enemy.currentHP = (0, combat_1.heal)(enemy);
                    enemy.currentHP = enemy.currentHP - ((0, combat_1.attack)(player) - enemy.def);
                }
                await askQuestion(`\nPress enter to continue...\n`.dim);
                break;
            case "2":
                console.log(`${player.name} decides to defend`.cyan);
                if (enemyMove === 1) {
                    console.log(`${enemy.name} decides to attack\n`.magenta);
                    player.currentHP = player.currentHP - ((0, combat_1.attack)(enemy) - (0, combat_1.defend)(player));
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
                console.log(`Player decides to heal`);
                player.currentHP = (0, combat_1.heal)(player);
                if (enemyMove === 1) {
                    console.log(`${enemy.name} decides to attack\n`.magenta);
                    player.currentHP = player.currentHP - ((0, combat_1.attack)(enemy) - (0, combat_1.defend)(player));
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
            default:
                console.log("\nInvalid option. Try again.\n");
                await askQuestion(`\nPress enter to continue...\n`.dim);
                break;
        }
    }
};
exports.startGame = startGame;
