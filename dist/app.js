"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("colors");
const readline_1 = require("readline");
const rl = (0, readline_1.createInterface)({
    input: process.stdin,
    output: process.stdout
});
const menu = {
    1: "Attack",
    2: "Defend",
    3: "Cure",
    4: "Status",
    0: "Exit",
};
const displayMenu = () => {
    console.log("\n===== SIMPLE TURNED BASE GAME =====\n".red);
    for (const [key, value] of Object.entries(menu)) {
        console.log(`${key}. ${value}`);
    }
};
const askQuestion = (question) => {
    return new Promise(res => {
        rl.question(question, res);
    });
};
const handleMenu = async () => {
    let isRunning = true;
    while (isRunning) {
        displayMenu();
        const answer = await askQuestion("\nWhat do you want to do?\n");
        console.log({ answer });
        if (answer == 0) {
            isRunning = false;
        }
        if (isRunning) {
            await askQuestion(`\nPress enter to continue...\n`);
        }
    }
};
handleMenu().finally(() => {
    rl.close();
});
