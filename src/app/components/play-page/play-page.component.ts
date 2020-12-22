import { Component, OnInit } from '@angular/core';
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
          this.minimaxService.generateValidMoves();
        }
        else {
          // do nothing since user clicked on empty square.
        }
      }
      else {
        // second click - validate and move pawn.
      }
    
  }

}
