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

  }

  generateValidMoves(row: number, col: number) {
    let validMoves: GameState[];

    validMoves.concat(this.currentGamestate.checkAdjEightPlaces(row, col));
    validMoves.concat(this.currentGamestate.performJumps(row, col));

    // will not work as it is returning gamestate. How will you find out the moves? Have to code a separate function for this.



    
  }

}
