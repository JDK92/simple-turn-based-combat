# Simple Turn-Based RPG (02-rpg-simple-turn-based-fight)

A tiny terminal-based turn-by-turn RPG where you control a Hero vs a Demon. Choose Attack, Defend or Heal each turn. The game uses colored terminal output.

## Quick start

1. Install dependencies

```sh
npm install
```

2. Run in development (auto-reload with nodemon + ts-node)

```sh
npm run dev
```

3. Build and run (production)

```sh
npm run start
```

Controls

-   1 = Attack
-   2 = Defend
-   3 = Heal  
    Press Enter when prompted to continue between turns.

## Files in this workspace

-   [/.gitignore](.gitignore) — ignores node_modules
-   [/nodemon.json](nodemon.json) — dev runner configuration (runs `ts-node ./src/app.ts`)
-   [/package.json](package.json) — scripts and dependencies
-   [/tsconfig.json](tsconfig.json) — TypeScript configuration

Source files:

-   [/src/app.ts](src/app.ts) — entry point; creates characters and calls [`startGame`](src/engine.ts)
-   [/src/engine.ts](src/engine.ts) — main game loop and user interaction; exports [`startGame`](src/engine.ts)
-   [/src/combat.ts](src/combat.ts) — combat logic and enemy AI; exports [`attack`](src/combat.ts), [`defend`](src/combat.ts), [`heal`](src/combat.ts), [`setEnemyMove`](src/combat.ts)
-   [/src/utils.ts](src/utils.ts) — UI and helpers; exports [`checkWinner`](src/utils.ts), [`displayMenu`](src/utils.ts), [`showHPBar`](src/utils.ts)
-   [/src/types.ts](src/types.ts) — types; exports [`Character`](src/types.ts)

## How to play / How it works

-   Start the app with `npm run dev` (development) or `npm run start` (build + run).
-   The game loop in [`startGame`](src/engine.ts) prints both characters' HP bars using [`showHPBar`](src/utils.ts) and shows the action menu with [`displayMenu`](src/utils.ts).
-   Player selects an action (1/2/3). The enemy move is chosen randomly using [`setEnemyMove`](src/combat.ts).
-   Damage and healing calculations use [`attack`](src/combat.ts), [`defend`](src/combat.ts), and [`heal`](src/combat.ts).
-   Win/tie conditions are checked with [`checkWinner`](src/utils.ts). The main loop ends when a winner or tie is detected.

## Character model

The shape of a character is defined by the [`Character`](src/types.ts) interface:

-   name: string
-   maxHP: number
-   currentHP: number
-   atk: number
-   def: number
-   bonus: number

## Notes

-   Colored output uses the `colors` package (dependency in [package.json](package.json)).
-   Development uses `nodemon` + `ts-node` as configured in [nodemon.json](nodemon.json).
-   Build output goes to `dist/` per [tsconfig.json](tsconfig.json).

Enjoy the game!
