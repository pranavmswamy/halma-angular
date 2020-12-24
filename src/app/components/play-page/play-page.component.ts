import { Component, OnInit } from '@angular/core';
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
  firstClick = true;


  constructor(
    private minimaxService: MinimaxService
  ) {
    this.board = [];

    for(let i=0; i<16; i++) {
      this.board[i] = [];
      for(let j=0; j<16; j++) {
        this.board[i][j] = "N";
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
  

  buttonOnClick(i:  number, j: number) {
      if(this.firstClick == true) {
        // first click - validate and highlight options.
        if(this.board[i][j] == 'B' || this.board[i][j] == 'W') {
          this.minimaxService.generateValidMoves(i, j);
        }
        else {
          // do nothing since user clicked on empty square.
        }
        this.firstClick = false;
      }
      else {
        // second click - validate and move pawn, and then update gamestate in service.

        this.firstClick = true;
      }
    
  }

}
