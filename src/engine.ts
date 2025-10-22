
// Imports
import 'colors';
import { createInterface } from 'readline';

import { attack, defend, heal, setEnemyMove } from './combat';
import { checkWinner, displayMenu, showHPBar } from './utils';
import { Character } from './types';


// Input interaction interface
const rl = createInterface({
    input: process.stdin,
    output: process.stdout
});


const askQuestion = (question: string) => {
    return new Promise(res => {
        rl.question(question, res);
    });
}

const menu = {
    1: "Attack",
    2: "Defend",
    3: "Heal",
}


// Game
export const startGame = async (player: Character, enemy: Character) => {
    let isRunning: boolean = true;

    while (isRunning) {

        const { battleDone, message } = checkWinner(player, enemy);

        console.log(`${player.name} [${showHPBar(player)}](${(player.currentHP <= 0) ? 0 : player.currentHP}/${player.maxHP})`);
        console.log(`${enemy.name} [${showHPBar(enemy)}](${(enemy.currentHP <= 0) ? 0 : enemy.currentHP}/${enemy.maxHP})`);

        if (battleDone) {
            console.log(message);
            isRunning = !isRunning;
            break;
        }

        displayMenu(menu);

        const answer = await askQuestion(`\nWhat do you want to do?\n`);

        const enemyMove: number = setEnemyMove();

        switch (answer) {
            case "1":
                console.log(`\n${player.name} decides to attack`.cyan);
                const playerDamageAtk: number = attack(player);

                if (enemyMove === 1) {
                    const enemyDamageAtk: number = attack(enemy);

                    console.log(`${enemy.name} decides to attack\n`.magenta);
                    enemy.currentHP = enemy.currentHP - (playerDamageAtk - enemy.def);
                    player.currentHP = player.currentHP - (enemyDamageAtk - player.def);
                }

                if (enemyMove === 2) {
                    console.log(`${enemy.name} decides to defend\n`.magenta);
                    enemy.currentHP = enemy.currentHP - (playerDamageAtk - defend(enemy));
                }

                if (enemyMove === 3) {
                    console.log(`${enemy.name} decides to heal\n`.magenta);
                    enemy.currentHP = enemy.currentHP - (playerDamageAtk - enemy.def);
                    enemy.currentHP = heal(enemy);
                }

                await askQuestion(`\nPress enter to continue...\n`.dim);
                break;

            case "2":
                console.log(`\n${player.name} decides to defend`.cyan);

                if (enemyMove === 1) {
                    const enemyDamageAtk: number = attack(enemy);
                    console.log(`${enemy.name} decides to attack\n`.magenta);
                    player.currentHP = player.currentHP - (enemyDamageAtk - defend(player));
                }

                if (enemyMove === 2) {
                    console.log(`${enemy.name} decides to defend\n`.magenta);
                    console.log("No damage done...".bgWhite.black);
                }

                if (enemyMove === 3) {
                    console.log(`${enemy.name} decides to heal\n`.magenta);
                    enemy.currentHP = heal(enemy);
                    console.log("No damage done...".bgWhite.black);
                }

                await askQuestion(`\nPress enter to continue...\n`.dim);

                break;

            case "3":
                console.log(`\n${player.name} decides to heal`.cyan);

                if (enemyMove === 1) {
                    const enemyDamageAtk: number = attack(enemy);
                    console.log(`${enemy.name} decides to attack\n`.magenta);
                    player.currentHP = player.currentHP - (enemyDamageAtk - defend(player));
                    player.currentHP = heal(player);
                }

                if (enemyMove === 2) {
                    player.currentHP = heal(player);
                    console.log(`${enemy.name} decides to defend\n`.magenta);
                    console.log("No damage done...".bgWhite.black);
                }

                if (enemyMove === 3) {
                    player.currentHP = heal(player);
                    enemy.currentHP = heal(enemy);
                    console.log(`${enemy.name} decides to heal\n`.magenta);
                    console.log("No damage done...".bgWhite.black);
                }

                await askQuestion(`\nPress enter to continue...\n`.dim);
                break;

            default:
                console.log("\nInvalid option. Try again.\n")
                await askQuestion(`\nPress enter to continue...\n`.dim);

                break;
        }

    }
}