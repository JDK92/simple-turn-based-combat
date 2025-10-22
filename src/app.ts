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


// Start game
console.clear();
startGame(player, enemy);