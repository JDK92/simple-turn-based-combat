// Imports third party packages
import 'colors';

// Import node modules
import { createInterface } from 'readline';

// Interface for question / answer interaction
const rl = createInterface({
    input: process.stdin,
    output: process.stdout
});

const askQuestion = (question: string) => {
    return new Promise(res => {
        rl.question(question, res);
    });
}

// Simple menu needed for the turn based game
const menu = {
    1: "Attack",
    2: "Defend",
    3: "Heal",
    0: "Exit",
}

const displayMenu = () => {
    console.log("\n===== SIMPLE TURNED BASE GAME =====\n".red);
    for (const [key, value] of Object.entries(menu)) {
        console.log(`${key}. ${value}`)
    }
}

// Characters
interface Character {
    maxHP: number;
    HP: number;
    atk: number;
    def: number;
    bonus: number;
}

const player: Character = {
    maxHP: 100,
    HP: 100,
    atk: 90,
    def: 75,
    bonus: 0.25
}

const enemy: Character = {
    maxHP: 120,
    HP: 120,
    atk: 95,
    def: 80,
    bonus: 0.015
}

// Calc
//// Atk
const calcAtk = (character: Character) => {
    const luckyRoll = Math.round(Math.random() * 100) / 100;

    let hasBonus: boolean = (character.bonus > luckyRoll);

    if (hasBonus) {
        return character.atk * 1.50;
    } else {
        return character.atk;
    }
}

//// Def
const calcDef = (character: Character) => character.def * 1.10;

//// Healing
const calcHealing = (character: Character) => {
    if (character.HP === character.maxHP) {
        return character.maxHP;
    }

    let healing = character.maxHP * 0.50;
    return character.HP = (character.HP + healing >= character.maxHP) ? character.maxHP : character.HP + healing;
}

// Enemy Move
const setEnemyMove = (): number => Math.floor(Math.random() * 3) + 1;

// Interaction
const startGame = async (player: Character, enemy: Character) => {
    let isRunning: boolean = true;

    while (isRunning) {
        displayMenu();

        console.log(`
            Player HP: ${player.HP} ||| Enemy HP: ${enemy.HP}
            `);


        const answer = await askQuestion("\nWhat do you want to do?\n");



        const enemyMove = setEnemyMove();

        switch (answer) {
            case "1":
                console.log(`Player decides to attack`);

                if (enemyMove === 1) {
                    console.log("Enemy decides to attack!");

                    const playerDamage = calcAtk(player);
                    const enemyDamage = calcAtk(enemy);

                    console.log(`Player does ${playerDamage} damage.`)
                    console.log(`Enemy does ${enemyDamage} damage.`)

                    enemy.HP = enemy.HP - (calcAtk(player) - enemy.def);
                    player.HP = player.HP - (calcAtk(enemy) - player.def);
                }

                if (enemyMove === 2) {
                    console.log("Enemy raise its shield!!");
                    enemy.HP = enemy.HP - (calcAtk(player) - calcDef(enemy));
                }

                if (enemyMove === 3) {
                    console.log("Enemy is planning to heal");
                    enemy.HP = enemy.HP - (calcAtk(player) - enemy.def);
                    enemy.HP = calcHealing(enemy);
                }

                break;

            case "2":
                console.log(`Player decides to defend`);

                if (enemyMove === 1) {
                    console.log("Enemy decides to attack!");
                    player.HP = player.HP - (calcAtk(enemy) - calcDef(player));
                }

                if (enemyMove === 2) {
                    console.log("Enemy raise its shield!!");
                    console.log("No damage done...");
                }

                if (enemyMove === 3) {
                    console.log("Enemy is planning to heal");
                    enemy.HP = calcHealing(enemy);
                }
                break;

            case "3":
                console.log(`Player decides to heal`);

                if (enemyMove === 1) {
                    console.log("Enemy decides to attack!");
                    player.HP = player.HP - (calcAtk(enemy) - calcDef(player));
                    player.HP = calcHealing(player);
                }

                if (enemyMove === 2) {
                    console.log("Enemy raise its shield!!");
                    player.HP = calcHealing(player);
                    console.log("No damage done...");
                }

                if (enemyMove === 3) {
                    console.log("Enemy is planning to heal");
                    enemy.HP = calcHealing(enemy);
                    player.HP = calcHealing(player);
                }

                break;
            case "0":
                console.log(`Player runs away from the fight`);
                break;
            default:
                console.log("\nInvalid option. Try again.\n")
                break;
        }

        if (answer == 0) {
            isRunning = false;
        }

        if (isRunning) {
            await askQuestion(`\nPress enter to continue...\n`);
        }
    }
}


// Start game
startGame(player, enemy).finally(() => {
    rl.close();
});