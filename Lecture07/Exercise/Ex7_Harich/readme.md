# Memory Card Game

## Overview
A simple memory card game built using HTML, CSS, and TypeScript. The goal is to match pairs of cards. Players take turns to flip cards and try to find matching pairs.

## Features
- Selectable number of card pairs (2 to 8).
- Two-player mode with alternating turns.
- Tracks and displays player scores.
- Game ends when all pairs are matched, and the winner is announced.

## Setup
1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Compile TypeScript with `tsc`.
4. Open `index.html` in a browser to play.

## Gameplay
1. Choose the number of pairs (2 to 8).
2. Players take turns flipping two cards.
3. If the cards match, they stay flipped.
4. The first player to match all pairs wins.

## Game Logic
- Cards are shuffled randomly at the start.
- Players flip two cards per turn, checking for matches.
- The game alternates between players and keeps track of scores.
