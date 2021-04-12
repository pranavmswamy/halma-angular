# Halma AI

Project under development. URL - https://pranavmswamy.github.io/halma/

(From [Wikipedia](https://en.wikipedia.org/wiki/Halma)) Halma is a strategy board game invented in 1883 or 1884 by George Howard Monks, a US thoracic surgeon at Harvard Medical School. His inspiration was the English game Hoppity which was devised in 1854. The gameboard is checkered and divided into 16×16 squares. Pieces may be small checkers or counters, or wooden or plastic cones or men resembling small chess pawns. Piece colors are typically black and white for two-player games, and various colors or other distinction in games for four players. The game is played by two or four players seated at opposing corners of the board. The game is won by being first to transfer all of one's pieces from one's own camp into the camp in the opposing corner. For four-player games played in teams, the winner is the first team to race both sets of pieces into opposing camps. On each turn, a player either moves a single piece to an adjacent open square, or jumps over one or more pieces in sequence.

![Image from Wiki](https://github.com/pranavmswamy/halma/blob/master/images/200px-Halma_2_jugadores.svg.png)

## Adversarial Search

Adversarial search is a search where we examine the problem which arises when we try to plan ahead of the world and other agents are planning against us. So, searches in which two or more players with conflicting goals are trying to explore the same search space for the solution, are called adversarial searches, often known as Games. Games are modeled as a *Search problem and heuristic evaluation function*, and these are the two main factors which help to model and solve games in AI.

Although by using the above approach, it is theoretically possible to win any adversarial search based game like Chess, Tic-Tac-Toe, Backgammon, Chinese Checkers, Halma, etc; in most cases not feasible to generate the entire search tree. Chess has an average branching factor of about 35,
and games often go to 50 moves by each player, so the search tree has about 35^100 or 10^154 nodes (although the search graph has “only” about 10^40 distinct nodes.). Due to this limitation of adversarial search, we can only computationally search a few levels deep, and take the next best move.

The most common way to search adversarially is using the Minimax Algorithm, which can be enhanced with Alpha-Beta Pruning.

![Image of Halma](https://github.com/pranavmswamy/halma/blob/master/images/1200px-Halma_game_2.svg.png)

## Mimimax Algorithm

In this algorithm two players play the game, one is called MAX and other is called MIN. Both the players fight it as the opponent player gets the minimum benefit while they get the maximum benefit. Both Players of the game are opponents of each other, where MAX will select the maximized value and MIN will select the minimized value. The minimax algorithm performs a depth-first search algorithm for the exploration of the complete game tree. The minimax algorithm proceeds all the way down to the terminal node of the tree (or practically a few levels down), then backtrack the tree as the recurses.

## Alpha Beta Pruning

Alpha-beta pruning is an optimization technique for the minimax algorithm. As we have seen in the minimax algorithm, the number of game states it has to examine are exponential in depth of the tree. We cannot eliminate the exponent, but we can cut in half. There is a technique by which without checking each node of the game tree we can compute the correct minimax decision, and this technique is called pruning. This involves two threshold parameters Alpha and Beta.
Alpha-beta pruning can be applied at any depth of a tree, and sometimes it not only prunes the tree leaves but also entire sub-trees.
The two-parameter can be defined as:
  Alpha: The best (highest-value) choice we have found so far at any point along the path of Maximizer. The initial value of alpha is -∞.
  Beta: The best (lowest-value) choice we have found so far at any point along the path of Minimizer. The initial value of beta is +∞.
The Alpha-beta pruning to a standard minimax algorithm returns the same move as the standard algorithm does, but it removes all the nodes which are not really affecting the final decision but making algorithm slow. Hence by pruning these nodes, it makes the algorithm fast.

![Image of Alpha Beta Pruning](https://github.com/pranavmswamy/halma/blob/master/images/Screenshot%20from%202020-10-12%2021-43-09.png)


## Screenshots
![Image of Halma](https://github.com/pranavmswamy/halma-angular/blob/main/screenshots/pic1.png)
![Image of Halma](https://github.com/pranavmswamy/halma-angular/blob/main/screenshots/pic2.png)

## Test Results
- Beat 82% of other 700+ Halma AI agents during a competition held at USC in Fall 2019 in the Foundations of Artificial Intelligence class. (CSCI-561)

## Improvements
- Working on developing an end-to-end web app using Angular and Flask (Python) for the AI to play against itself (this project).
- Develop a Reinforcement Learning Based Algorithm for the same.

## Halma Angular

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.1.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
