import { Injectable } from '@angular/core';
import { GameState } from '../models/GameState';

@Injectable({
  providedIn: 'root'
})
export class MinimaxService {

  currentGamestate: GameState

  constructor() { 

  }

  updateGameState(newGameState: GameState) {
    this.currentGamestate = newGameState;
  }

  generateValidMoves(row: number, col: number) {
    let validMoves = new Array();

    let adj8Moves = this.currentGamestate.get8AdjMoveIndices(row, col)
    let jumpMoves = this.currentGamestate.getJumpsIndices(row, col)
    validMoves.concat(adj8Moves);
    validMoves.concat(jumpMoves);

    console.log("adj8moves - ", adj8Moves);
    console.log("jumpMoves - ", jumpMoves);
    console.log("concatted moves - ", validMoves);

    // will not work as it is returning gamestate. How will you find out the moves? Have to code a separate function for this.
  }

}
