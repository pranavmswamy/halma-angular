import { Injectable } from '@angular/core';
import { GameState } from '../models/GameState';
import { Tile } from '../models/Tile';

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

  _getJumpIndices(row: number, col: number) {
    this.currentGamestate.markAllVisitedFalse();//mark all i,j as false;visited.
		let x = row
		let y = col
		this.currentGamestate.getJumpQ().push(new Tile(x,y,"")); // check
    this.currentGamestate.getVisitedArray()[x][y] = true;
    this.currentGamestate.visitBehindPlaces(x, y, true);
    //collect all jump nodes and add it to bfsq and actions
    let newJumpMoves = new Array();
    newJumpMoves = this.currentGamestate.getJumpsIndices(x, y);
    return newJumpMoves;
  }

  generateValidMoves(row: number, col: number) {
    let validMoves = new Array();

    this.currentGamestate.markAllVisitedFalse()
    let adj8Moves = this.currentGamestate.get8AdjMoveIndices(row, col)
    let jumpMoves = this._getJumpIndices(row, col)
    validMoves = validMoves.concat(adj8Moves);
    validMoves = validMoves.concat(jumpMoves);

    console.log("adj8moves - ", adj8Moves);
    console.log("jumpMoves - ", jumpMoves);
    console.log("concatted moves - ", validMoves);

    return validMoves;
  }

}
