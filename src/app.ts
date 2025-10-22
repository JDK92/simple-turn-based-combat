// Imports third party packages
import 'colors';
import { Character } from './types';
import { startGame } from './engine';

const player: Character = {
    name: 'Hero',
    maxHP: 100,
    currentHP: 100,
    atk: 90,
    def: 75,
    bonus: 0.25
}

const enemy: Character = {
    name: 'Demon',
    maxHP: 100,
    currentHP: 100,
    atk: 90,
    def: 80,
    bonus: 0.015
}

// Interaction
// const startGame = async (player: Character, enemy: Character) => {
//     let isRunning: boolean = true;

//     while (isRunning) {


//         console.log(`Player [${showHPBar(player)}](${player.currentHP} / ${player.maxHP})`);
//         console.log(`Enemy [${showHPBar(enemy)}](${enemy.currentHP} / ${enemy.maxHP})`);

//         displayMenu();


//         const answer = await askQuestion("\nWhat do you want to do?\n");

//         const enemyMove = setEnemyMove();

//         switch (answer) {
//             case "1":
//                 console.log(`Player decides to attack`);

//                 if (enemyMove === 1) {
//                     console.log("Enemy decides to attack!");


//                 }

//                 if (enemyMove === 2) {
//                     console.log("Enemy raise its shield!!");

//                 }

//                 if (enemyMove === 3) {
//                     console.log("Enemy is planning to heal");
//                     enemy.currentHP = enemy.currentHP - (calcAtk(player) - enemy.def);
//                     enemy.currentHP = calcHealing(enemy);
//                 }

//                 break;

//             case "2":
//                 console.log(`Player decides to defend`);

//                 if (enemyMove === 1) {
//                     console.log("Enemy decides to attack!");
//                     player.currentHP = player.currentHP - (calcAtk(enemy) - calcDef(player));
//                 }

//                 if (enemyMove === 2) {
//                     console.log("Enemy raise its shield!!");
//                     console.log("No damage done...");
//                 }

//                 if (enemyMove === 3) {
//                     console.log("Enemy is planning to heal");
//                     enemy.currentHP = calcHealing(enemy);
//                 }

//                 break;

//             case "3":
//                 console.log(`Player decides to heal`);

//                 if (enemyMove === 1) {
//                     console.log("Enemy decides to attack!");
//                     player.currentHP = player.currentHP - (calcAtk(enemy) - calcDef(player));
//                     player.currentHP = calcHealing(player);
//                 }

//                 if (enemyMove === 2) {
//                     console.log("Enemy raise its shield!!");
//                     player.currentHP = calcHealing(player);
//                     console.log("No damage done...");
//                 }

//                 if (enemyMove === 3) {
//                     console.log("Enemy is planning to heal");
//                     enemy.currentHP = calcHealing(enemy);
//                     player.currentHP = calcHealing(player);
//                 }



//                 break;

//             case "0":
//                 console.log(`Player runs away from the fight`);

//                 break;
//             default:
//                 console.log("\nInvalid option. Try again.\n")

//                 break;
//         }

//         if (answer === "0") {
//             isRunning = false;
//         }

//         if (isRunning) {
//             await askQuestion(`\nPress enter to continue...\n`);
//         }
//     }
// }


// Start game
console.clear();
startGame(player, enemy);