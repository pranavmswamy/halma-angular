import { Component, OnInit } from '@angular/core';
import { AlphaBeta } from 'src/app/models/AlphaBeta';
import { GameState } from 'src/app/models/GameState';
import { Pawn } from 'src/app/models/Pawn';
import { MinimaxService } from 'src/app/services/minimax.service';

@Component({
  selector: 'app-play-page',
  templateUrl: './play-page.component.html',
  styleUrls: ['./play-page.component.css']
})
export class PlayPageComponent implements OnInit {

  // for iterating over rows and cols in table in html
  boardIterate: boolean[]  = Array(16).fill(false);
  
  board: string[][];
  highlighted: boolean[][]
  firstClick = true;
  candidatePawnPosition = null;


  constructor(
    private minimaxService: MinimaxService
  ) {
    this.board = [];
    for(let i=0; i<16; i++) {
      this.board[i] = [];
      for(let j=0; j<16; j++) {
        this.board[i][j] = ".";
      }
    }

    this.highlighted = []
    for(let i=0; i<16; i++) {
      this.highlighted[i] = [];
      for(let j=0; j<16; j++) {
        this.highlighted[i][j] = false;
      }
    }


   }

  ngOnInit(): void {
    // initialize board.
    this.initBlackHomeCamp();
    this.initWhiteHomeCamp();

    //initialze service
    // 1. initialize gamestate

    let initboard: string[][] = [];
    let whiteList: Pawn[] = [];
    let blackList: Pawn[] = [];

    for(let i=0; i<16; i++) {
      initboard[i] = [];
      for(let j=0; j<16; j++) {
        if(this.board[i][j] == 'W') {
          initboard[i][j] = 'W';
          whiteList.push(new Pawn(i, j));
        }
        else if(this.board[i][j] == 'B') {
          initboard[i][j] = 'B';
          blackList.push(new Pawn(i, j));
        }
        else
          initboard[i][j] = '.';
      }
    }

    let start: GameState = new GameState("BLACK", initboard, null, "BLACK", blackList, whiteList, "");
    this.minimaxService.updateGameState(start);
    

  }

  private initBlackHomeCamp() {
		for(let i = 0; i < 2 ; i++) {
			for(let j = 0; j < 5 ; j++) {
					this.board[i][j] = "B";
			}
		}
		
		for(let j=0; j<4;j++)
			this.board[2][j] = "B";	
			
		for(let j=0; j<3;j++)
			this.board[3][j] = "B";
		
		for(let j=0; j<2;j++)
			this.board[4][j] = "B";
  }
  
  public initWhiteHomeCamp()	{
		for(let i = 14; i < 16 ; i++) {
			for(let j = 11; j < 16 ; j++) {
				this.board[i][j] = "W";
			}
    }
        
		for(let j=12; j<16;j++)
			this.board[13][j] = "W";
				
		for(let j=13; j<16;j++)
			this.board[12][j] = "W";
		
		for(let j=14; j<16;j++)
			this.board[11][j] = "W";
  }

  /**
   * Method to clear highlighted cells on the board.
   * When the user clicks on a cell, it clears the previously highlighted cells if any to make way
   * to highlight the new moves.
   */
  clearHighlightedCells() {

    for(let i=0; i<16; i++) {
      for(let j=0; j< 16; j++) {
        this.highlighted[i][j] = false;
      }
    }
  }

  updateBoard(board) {
    for(let i=0; i<16; i++) {
      for(let j=0; j< 16; j++) {
        this.board[i][j] = board[i][j];
      }
    }
  }

  deepCopyBoard(): string[][] {

    let newBoard: string[][] = [];

    for(let i=0; i<16; i++) {
      newBoard[i] = []
      for(let j=0; j<16; j++) {
        newBoard[i][j] = this.board[i][j];
      }
    }
    return newBoard;
  }

  getNextGameState(): GameState {

    let nextGameState: GameState;

    let nextBoard = this.deepCopyBoard();
    let whiteList: Pawn[] = [];
    let blackList: Pawn[] = [];

    for(let i=0; i<16; i++) {
      for(let j=0; j<16; j++) {
        if(this.board[i][j] == 'W') {
          whiteList.push(new Pawn(i, j));
        }
        else if(this.board[i][j] == 'B') {
          blackList.push(new Pawn(i, j));
        }
      }
    }

    nextGameState = new GameState("BLACK", nextBoard, this.minimaxService.currentGamestate, "BLACK", blackList, whiteList, "");
    return nextGameState;
  }

  buttonOnClick(i:  number, j: number) {

    if(this.firstClick == true) {

      // clears highlighted cells first, if any.
      this.clearHighlightedCells();

      // cache to store pawn to move next if chosen.
      this.candidatePawnPosition = null;
      this.candidatePawnPosition = [i,j]
      
      // first click - validate and highlight options.
      if(this.board[i][j] == 'B' || this.board[i][j] == 'W') {
        let validMoves = this.minimaxService.generateValidMoves(i, j);
        validMoves.forEach(position => {
          this.highlighted[position[0]][position[1]] = true;
        });
      }
      else {
        // do nothing since user clicked on empty square.
      }
      this.firstClick = false;
    }
    else {
      // second click - validate and move pawn, and then update gamestate in service.
      if(this.highlighted[i][j] == true) {
        // move pawn to that place
        this.board[i][j] = this.board[this.candidatePawnPosition[0]][this.candidatePawnPosition[1]];
        this.board[this.candidatePawnPosition[0]][this.candidatePawnPosition[1]] = '.';
        this.clearHighlightedCells();

        // update game state and send to minimax service
        let nextGameState = this.getNextGameState();
        nextGameState.setPlayer("WHITE");
        this.minimaxService.updateGameState(nextGameState);
        //check if gamestate got updated.
        //console.log(this.board)
        //console.log(this.minimaxService.currentGamestate.getBoard())


        // make AI play
        console.log("Handing over to AI")
        let AIreturnedGamestate = new AlphaBeta().runAlphaBeta(this.minimaxService.currentGamestate, 3);
        console.log("AI returned: ", AIreturnedGamestate.getBoard())

        // update gamestate again and display.
        this.minimaxService.updateGameState(AIreturnedGamestate);
        this.minimaxService.currentGamestate.setPlayer("BLACK");
        this.updateBoard(this.minimaxService.currentGamestate.getBoard());

        this.firstClick = true;
        this.candidatePawnPosition = null;
      }
      else if(this.board[i][j] != '.') {
        this.firstClick = true;
        this.buttonOnClick(i, j);
      }
      else {
        // clicked on empty.
      }
    }
    
  }

}
