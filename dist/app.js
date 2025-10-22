"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Imports third party packages
require("colors");
const engine_1 = require("./engine");
const player = {
    name: 'Hero',
    maxHP: 100,
    currentHP: 100,
    atk: 90,
    def: 75,
    bonus: 0.25
};
const enemy = {
    name: 'Demon',
    maxHP: 100,
    currentHP: 100,
    atk: 90,
    def: 80,
    bonus: 0.015
};
// Start game
console.clear();
(0, engine_1.startGame)(player, enemy);
