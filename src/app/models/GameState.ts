import { Pawn } from './Pawn';
import { Tile } from './Tile';

export class GameState {

	private board : string[][];
	private static depthLimit: number;
	private utilityValue : number;
	private alphaBetaValue: number;
	private player: string;
	private parent: GameState;
    private black: Pawn[]; 
    private white: Pawn[];
	private visited: boolean[][];
	private jumpQueue: Tile[] = new Array(); // check.
	private previousMoves: string;
	public static totalGameNodes: number;
	private rootPlayer: string;
	

	constructor(rootPlayer: string, board: string[][], parent: GameState, player: string, black: Pawn[], white: Pawn[], nextMove: string)
	{
		this.board = board;
		this.player = player;
		this.rootPlayer = rootPlayer;
		this.parent = parent;
		this.black = black;
		this.previousMoves =   "" + nextMove; // check if it is getting assigned.
		this.white = white;
		
		this.visited = [];
		for(let i=0; i<16; i++) {
			this.visited[i] = [];
			for(let j=0; j<16; j++) {
				this.visited[i][j] = false;
			}
		}

		//terminalTest();
	}
	
	public getRootPlayer() : string {
		return this.rootPlayer;
	}
	
	public getParent(): GameState {
		return this.parent;
	}
	
	public getPreviousMoves(): string {
		return this.previousMoves;
	}
	
	public setDepthLimit(maxDepth : number) {
		GameState.depthLimit = maxDepth;
	}
	
	public getAlphaBetaValue(): number {
		return this.alphaBetaValue;
	}
	
	public getDepthLimit(): number {
		return GameState.depthLimit;
	}
	
	public getUtilityValue(): number {
		return this.utilityValue;
	}
	
	public setAlphaBetaValue(ab : number) {
		this.alphaBetaValue = ab;
	}
	
	public getPlayer(): string {
		return this.player;
	}

	public whitePawnsPresentInWarZone(): boolean {
		for(let i = 0; i < 2; i++) {
			for(let j = 0; j < 5 ; j++) {
					if(this.board[i][j] != "W")
						return true;
			}
		}
		
		for(let j=0; j<4;j++)
			if(this.board[2][j] != "W")
				return true;
			
		for(let j=0; j<3;j++)
			if(this.board[3][j] != "W")
				return true;
		
		for(let j=0; j<2;j++)
			if(this.board[4][j] != "W")
				return true;
		
		return false;
	}
	
	public blackPawnsPresentInWarZone(): boolean {
		for(let i = 14; i < 16 ; i++) {
			for(let j = 11; j < 16 ; j++) {
					if(this.board[i][j] != "B")
						return true;
			}
		}
		for(let j=12; j<16; j++)
			if(this.board[13][j] != "B")
				return true;
				
		for(let j=13; j<16; j++)
			if(this.board[12][j] != "B")
				return true;			
		
		for(let j=14; j<16; j++)
			if(this.board[11][j] != "B")
				return true;
		
		return false;
	}
	
	public pawnsPresentInWhiteHomeCamp(): boolean
	{
		for(let i = 14; i < 16 ; i++) {
			for(let j = 11; j < 16 ; j++) {
					if(this.board[i][j] == "W")
						return true;
			}
        }
        
		for(let j=12; j<16;j++)
			if(this.board[13][j] == "W")
				return true;
				
		for(let j=13; j<16;j++)
			if(this.board[12][j] == "W")
				return true;			
		
		for(let j=14; j<16;j++)
			if(this.board[11][j] == "W")
				return true;
		
		return false;
	}
	
	public countWhiteHomeCampPieces() : number
	{
		let whiteCount: number = 0;
		for(let i = 14; i < 16 ; i++) {
			for(let j = 11; j < 16 ; j++) {
				if(this.board[i][j] == "W")
					whiteCount++;
			}
        }
        
		for(let j=12; j<16;j++)
			if(this.board[13][j] == "W")
				whiteCount++;
				
		for(let j=13; j<16;j++)
			if(this.board[12][j] == "W")
				whiteCount++;			
		
		for(let j=14; j<16;j++)
			if(this.board[11][j] == "W")
				whiteCount++;
		
		return whiteCount;
	}
	
	public pawnsPresentInBlackHomeCamp(): boolean {
		for(let i = 0; i < 2 ; i++) {
			for(let j = 0; j < 5 ; j++) {
					if(this.board[i][j] == "B")
						return true;
			}
		}
		
		for(let j=0; j<4;j++)
			if(this.board[2][j] == "B")
				return true;
			
		for(let j=0; j<3;j++)
			if(this.board[3][j] == "B")
				return true;
		
		for(let j=0; j<2;j++)
			if(this.board[4][j] == "B")
				return true;
		
		return false;
	}
	
	public countBlackHomeCampPieces(): number {
		let blackCount = 0;
		for(let i = 0; i < 2 ; i++) {
			for(let j = 0; j < 5 ; j++) {
					if(this.board[i][j] == "B")
						blackCount++;
			}
		}
		
		for(let j=0; j<4;j++)
			if(this.board[2][j] == "B")
				blackCount++;
			
		for(let j=0; j<3;j++)
			if(this.board[3][j] == "B")
				blackCount++;
		
		for(let j=0; j<2;j++)
			if(this.board[4][j] == "B")
				blackCount++;
		
		return blackCount;
	}
	
	public blackPawnsPresentInOpponentCamp() : boolean {
		for(let i = 14; i < 16 ; i++) {
			for(let j = 11; j < 16 ; j++) {
					if(this.board[i][j] == "B")
						return true;
			}
		}
		for(let j=12; j<16;j++)
			if(this.board[13][j] == "B")
				return true;
				
		for(let j=13; j<16;j++)
			if(this.board[12][j] == "B")
				return true;			
		
		for(let j=14; j<16;j++)
			if(this.board[11][j] == "B")
				return true;
		
		return false;
	}
	
	public whitePawnsPresentInOpponentCamp() : boolean {
		for(let i = 0; i < 2 ; i++) {
			for(let j = 0; j < 5 ; j++) {
					if(this.board[i][j] == "W")
						return true;
			}
		}
		
		for(let j=0; j<4;j++)
			if(this.board[2][j] == "W")
				return true;
			
		for(let j=0; j<3;j++)
			if(this.board[3][j] == "W")
				return true;
		
		for(let j=0; j<2;j++)
			if(this.board[4][j] == "W")
				return true;
		
		return false;
	}
	
	public terminalTest(): boolean {
		let terminalTest: boolean = false;
		let topLeftBlacks = 0, topLeftWhites = 0, bottomRightBlacks = 0, bottomRightWhites = 0;
		
		//calculatetopleft
		for(let i = 0; i < 2 ; i++)
		{
			for(let j = 0; j < 5 ; j++)
			{
					if(this.board[i][j] == ".")
						terminalTest = false;
					else if(this.board[i][j] == "W")
						topLeftWhites++;
					else
						topLeftBlacks++;
			}
		}
		for(let j=0; j<4;j++)
			if(this.board[2][j] == ".")
				terminalTest = false;
			else if(this.board[2][j] == "W")
				topLeftWhites++;
			else
				topLeftBlacks++;
		
		for(let j=0; j<3;j++)
			if(this.board[3][j] == ".")
				terminalTest = false;
			else if(this.board[3][j] == "W")
				topLeftWhites++;
			else
				topLeftBlacks++;
		
		for(let j=0; j<2;j++)
			if(this.board[4][j] == ".")
				terminalTest = false;
			else if(this.board[4][j] == "W")
				topLeftWhites++;
			else
				topLeftBlacks++;
		//endcalctopleft
		
		//calculatebottomright
		for(let i = 14; i < 16 ; i++) {
			for(let j = 11; j < 16 ; j++) {
					if(this.board[i][j] == ".")
						terminalTest = false;
					else if(this.board[i][j] == "W")
						bottomRightWhites++;
					else
						bottomRightBlacks++;
			}
		}
		for(let j=12; j<16;j++)
			if(this.board[13][j] == ".")
				terminalTest = false;
			else if(this.board[13][j] == "W")
				bottomRightWhites++;
			else
				bottomRightBlacks++;
		
		for(let j=13; j<16;j++)
			if(this.board[12][j] == ".")
				terminalTest = false;
			else if(this.board[12][j] == "W")
				bottomRightWhites++;
			else
				bottomRightBlacks++;
		
		for(let j=14; j<16;j++)
			if(this.board[11][j] == ".")
				terminalTest = false;
			else if(this.board[11][j] == "W")
				bottomRightWhites++;
			else
				bottomRightBlacks++;
		//endcalctopright
		
		if(topLeftWhites + topLeftBlacks == 19 && topLeftWhites > 0)
		{
			if(this.rootPlayer == "BLACK")
			{
				this.utilityValue = -1000000;
				this.alphaBetaValue = -1000000;
			}
			else
			{
				this.utilityValue = 1000000;
				this.alphaBetaValue = 1000000;
			}
			return true;
		}
		else if(bottomRightWhites + bottomRightBlacks == 19 && bottomRightBlacks > 0)
		{
			if(this.rootPlayer == "WHITE")
			{
				this.utilityValue = -1000000;
				this.alphaBetaValue = -1000000;
			}
			else
			{
				this.utilityValue = 1000000;
				this.alphaBetaValue = 1000000;
			}
			return true;
		}		
		return terminalTest;
		//end bottomright
	}

	public setPlayer(player) {
		this.player = player;
	}

	/**
	 * Calculates all next game states for the player and returns it in a list of next gamestate objects.
	 */
	public calculateActions() : GameState[]
	{
		let actions: GameState[] = new Array();
		let pawnsList = [];

		if(this.getPlayer() == "BLACK") {
			pawnsList = this.getBlacksList();
		}
		else {
			pawnsList = this.getWhitesList();
		}

		for(let p of pawnsList) {
			
			this.markAllVisitedFalse(); //mark all i,j as false;visited.
			let x = p.getX();
			let y = p.getY();
			this.getJumpQ().push(new Tile(x,y,""));
			this.getVisitedArray()[x][y] = true;

			if(this.getPlayer() == "BLACK") {
				this.visitBehindPlaces(x, y, true);
			}
			else {
				this.visitBehindPlaces(x, y, false);
			}

			// collect all adj nodes and add it to actions
			let newAdj8Moves: GameState[] = new Array();
			newAdj8Moves = this.checkAdjEightPlaces(x, y);
			actions = actions.concat(newAdj8Moves);

			//collect all jump nodes and add it to actions
			let newJumpMoves : GameState[] = new Array();
			newJumpMoves = this.performJumps(x, y);
			actions = actions.concat(newJumpMoves);

		}
		console.log("Returning actions")
		return actions;
	}
	
	public setUtilityValue(d: number) {
		this.utilityValue = d;
	}
	
	public getBoard(): string[][] {
		return this.board;
	}
	
	public getBlacksList(): Pawn[]
	{
		return this.black;
	}
	
	public getWhitesList(): Pawn[]
	{
		return this.white;
	}
	
	public getVisitedArray(): boolean[][]
	{
		return this.visited;
	}
	
	public getJumpQ(): Tile[]
	{
		return this.jumpQueue;
	}
	

	/**
	 * Initializes the top left part / bottom right part of visited array to true. (depending on the top flag.)
	 * if top = true, initializes all top left of x, y to true.
	 * if top = false, initialzes all bottom right of x, y to true. 
	 */
	public visitBehindPlaces(x: number, y: number, top: boolean) {
		if(top == true) {
			// initialize all top left visited[i][j] of x,y to true.
			for(let i = 0; i < 2 ; i++)
				for(let j = 0; j < 5 ; j++)
					if(i+j <= x+y)
						this.visited[i][j] = true;
			
			for( let j=0; j<4;j++)
				if(2+j <= x+y)
					this.visited[2][j] = true;
			
			for( let j=0; j<3;j++)
				if(3+j <= x+y)
					this.visited[3][j] = true;
			
			for( let j=0; j<2;j++)
				if(4+j <= x+y)
					this.visited[4][j] = true;
			
		}
		else {
			
			// initialize all bottom right visited[i][j] of x,y to true.
			for(let i = 14; i < 16 ; i++)
				for(let j = 11; j < 16 ; j++)
					if(x+y <= i+j)
						this.visited[i][j] = true;

			for(let j=12; j<16;j++)
				if(x+y <= 13+j)
					this.visited[13][j] = true;
			
			for(let j=13; j<16;j++)
				if(x+y <= 12+j)
					this.visited[12][j] = true;
			
			for(let j=14; j<16;j++)
				if(x+y <= 11+j)
					this.visited[11][j] = true;

		}
	}

	/**
	 * Sets visited[i][j] = false for all tiles in top left home camp. 
	 */
	public initAllTopLeftPlacesFalse()
	{
		for(let i = 0; i < 2 ; i++)
			for(let j = 0; j < 5 ; j++)
				this.visited[i][j] = false;

		for(let j=0; j<4;j++)
				this.visited[2][j] = false;
		
		for( let j=0; j<3;j++)
				this.visited[3][j] = false;
		
		for( let j=0; j<2;j++)
				this.visited[4][j] = false;
	}

	/**
	 * Sets visited[i][j] = false for all tiles in bottom right home camp. 
	 */
	public initAllBottomRightPlacesFalse()
	{
		for(let i = 14; i < 16 ; i++)
			for(let j = 11; j < 16 ; j++)
						this.visited[i][j] = false;
		
		for(let j=12; j<16;j++)
				this.visited[13][j] = false;
		
		for(let j=13; j<16;j++)
			this.visited[12][j] = false;
		
		for(let j=14; j<16;j++)
				this.visited[11][j] = false;
	}


	// public printBoard()
	// {
	// 	for(let i=0;i<16;i++)
	// 	{
	// 		for(let j=0;j<16;j++)
	// 		{
	// 			//process.stdout.write(this.board[i][j] + ",  ");
	// 		}
	// 		//process.stdout.write("\n");
	// 	}
	// }

	public markAllVisitedFalse()
	{
		for(let i=0;i<16;i++)
			for(let j=0;j<16;j++)
				this.visited[i][j] = false;
	}

	public isValidPosition(x: number, y: number): boolean
	{
		if(x<0 || y<0 || x>15 || y>15 || this.board[x][y] != ".")
			return false;
		else {
			return true;
		}
	}
	
	public containsPawn(x: number, y: number): boolean
	{
		if(this.board[x][y] == ".")
		{
			return false;
		}
		else return true;
	}
	
	public inCampBlack(x: number, y: number): boolean
	{
		for(let i = 0; i < 2 ; i++)
			for(let j = 0; j < 5 ; j++)
					if(x == i && y == j)
						return true;
		
		for(let j=0; j<4;j++)
			if(x==2 && y==j)
				return true;
		
		for( let j=0; j<3;j++)
			if(x==3 && y==j)
				return true;
		
		for( let j=0; j<2;j++)
			if(x==4 && y==j)
				return true;
		
		return false;
	}
	
	public inCampWhite(x: number, y: number): boolean
	{
		for(let i = 14; i < 16 ; i++)
			for(let j = 11; j < 16 ; j++)
					if(x==i && y==j)
						return true;
		
		for( let j=12; j<16;j++)
			if(x==13 && y==j)
				return true;
		
		for( let j=13; j<16;j++)
			if(x==12 && y==j)
				return true;
		
		for( let j=14; j<16;j++)
			if(x==11 && y==j)
				return true;
		
		return false;
		
	}
	
	public checkAdjEightPlaces(i, j): GameState[]
	{
		let newAdj8Moves: GameState[] = new Array();
		
			for(let di = -1; di <= 1; di++ ) {
				for(let dj = -1; dj <= 1; dj++ ) {
					let nextI = i + di;
					let nextJ = j + dj;

					// continue when di and dj = 0 because we dont need that position.
					if(nextI == i && nextJ == j) {
						continue;
					}

					if(this.isValidPosition(nextI, nextJ) && !this.containsPawn(nextI, nextJ) && !this.visited[nextI][nextJ]) {
						
						if(this.player == "BLACK") {
							// add only if it is not in opponent home camp, OR if it is, and the next position is also in oppnt home camp.
							if(!this.inCampWhite(i, j) || (this.inCampWhite(i, j) && this.inCampWhite(nextI, nextJ))) {
								let previousMoves = "E" + i + "," + j + " " + nextI + "," + nextJ + "\n";
								newAdj8Moves.push(this.addLegalMove(i, j, nextI, nextJ, previousMoves))
							}
						}
						else {
							// add only if it is not in opponent home camp, OR if it is, and the next position is also in oppnt home camp.
							if(!this.inCampBlack(i, j) || (this.inCampBlack(i, j) && this.inCampBlack(nextI, nextJ))) {
								let previousMoves = "E" + i + "," + j + " " + nextI + "," + nextJ + "\n";
								newAdj8Moves.push(this.addLegalMove(i, j, nextI, nextJ, previousMoves))
							}
						}
						
					}
				}
			}
		return newAdj8Moves;
	}
	
	public getBoardCopy(board : string[][]): string[][]
	{
		let newBoard: string[][] = [];

		for(let i=0; i<16; i++) {
			newBoard[i] = []
			for(let j=0; j<16; j++) {
				newBoard[i][j] = this.board[i][j];
			}
		}
		return newBoard;
	}
	
	public addLegalMove(startX: number, startY: number, endX: number, endY: number, previousMoves: string): GameState
	{
			let childPlayer: string;
			
			if(this.player == "BLACK")
				childPlayer = "WHITE";
			else
				childPlayer = "BLACK";
			
			let blackChild: Pawn[] = new Array();
			let whiteChild: Pawn[] = new Array();
			let childBoard: string[][] = this.getBoardCopy(this.board);
			let temp: string = "" + childBoard[startX][startY]; // check
			childBoard[startX][startY] = "" + childBoard[endX][endY]; // check
			childBoard[endX][endY] = "" + temp; //check
			
			let newMove: GameState;
			//System.out.println("Start X,Y = " + startX + "," + startY);
			if(this.player == "BLACK")
			{
				for(let p of this.black)
				{
					if(p.getX() == startX && p.getY() == startY)
					{
						blackChild.push(new Pawn(endX, endY));
					}
					else
					{
						blackChild.push(p);
					}
				}
				newMove = new GameState(this.rootPlayer,childBoard, this, childPlayer, blackChild, this.white, previousMoves);
			}
			else
			{
				for(let p of this.white)
				{
					if(p.getX() == startX && p.getY() == startY)
					{
						whiteChild.push(new Pawn(endX, endY));
					}
					else
					{
						whiteChild.push(p);
					}
				}
				
				
				newMove = new GameState(this.rootPlayer, childBoard, this, childPlayer, this.black, whiteChild, previousMoves);
			}
			this.visited[endX][endY] = true;
			return newMove;
	}
	
	public performJumps(x, y): GameState[]
	{
		let newJumpMoves: GameState[] = new Array();
		//--------------------------------------
		
		while(this.jumpQueue.length != 0) {
			//console.log("il")
			let t = this.jumpQueue.shift();
			let i = t.getX(), j = t.getY();

			for(let di= -2 ; di <= 2; di = di+2) {
				for(let dj= -2; dj <=2; dj = dj+2) {

					//console.log(di, dj)
					let nextI = x + di;
					let nextJ = y + dj;

					if(nextI == x && nextJ == y) {
						continue;
					}

					let obstaclei = x, obstaclej = y;
					if(di > 0) {
						obstaclei = x + 1;
					}
					else if(di < 0) {
						obstaclei = x - 1;
					}
					if(dj > 0) {
						obstaclej = y + 1;
					}
					else if(dj < 0) {
						obstaclej = y - 1;
					}

					if(this.isValidPosition(nextI, nextJ) && this.containsPawn(obstaclei, obstaclej) && !this.visited[nextI][nextJ]) {
						if(this.player == "BLACK") {
							let previousMoves = t.getPreviousMoves() + "J " + i + "," + j + " " + nextI + "," + nextJ + "\n";
							if(!this.inCampWhite(x, y) || (this.inCampWhite(x, y) && this.inCampWhite(nextI, nextJ))) {
								newJumpMoves.push(this.addLegalMove(x, y, nextI, nextJ, previousMoves))
							}
							this.jumpQueue.push(new Tile(nextI, nextJ, previousMoves))
							this.visited[nextI][nextJ] = true;
						}
						else {
							let previousMoves = t.getPreviousMoves() + "J " + i + "," + j + " " + nextI + "," + nextJ + "\n";
							if(!this.inCampBlack(x, y) || (this.inCampBlack(x, y) && this.inCampBlack(nextI, nextJ))) {
								newJumpMoves.push(this.addLegalMove(x, y, nextI, nextJ, previousMoves))
							}
							this.jumpQueue.push(new Tile(nextI, nextJ, previousMoves))
							this.visited[nextI][nextJ] = true;
						}
					}

				}
			}
		}
		//console.log("returning jump moves")
		return newJumpMoves;

	}
	
	public getEuclideanDistance(startX, startY, endX, endY): number
	{
		return Math.pow(startX-endX,2)+Math.pow(startY-endY, 2);
	}
	
	public calculateUtilityValue(): number
	{
		let utilityValue = 0;
		if(this.parent != null) //if it isn't root node
		{
			if(this.rootPlayer == "BLACK")
			{
					
				//----------
				if(this.parent.pawnsPresentInBlackHomeCamp())
				{
					let parentBlackHomeCampCount = this.parent.countBlackHomeCampPieces();
					let currBlackHomeCampCount = this.countBlackHomeCampPieces();
					if(parentBlackHomeCampCount > currBlackHomeCampCount)
					{
						return 2000;
					}
					
				}
				
				//----------
				for(let p of this.black)
					{
						
						for(let i = 14; i < 16 ; i++)
							for(let j = 11; j < 16 ; j++)
								if(this.board[i][j] == "." || this.board[i][j] == "W")
									utilityValue += this.getEuclideanDistance(p.getX(),p.getY(),i,j);
							
						for( let j=12; j<16;j++)
							if(this.board[13][j] == "." || this.board[13][j] == "W")
								utilityValue += this.getEuclideanDistance(p.getX(),p.getY(),13,j);
								
						for( let j=13; j<16;j++)
							if(this.board[12][j] == "."  || this.board[12][j] == "W") 
								utilityValue += this.getEuclideanDistance(p.getX(),p.getY(),12,j);			
						
						for( let j=14; j<16;j++)
							if(this.board[11][j] == "." || this.board[11][j] == "W")
								utilityValue += this.getEuclideanDistance(p.getX(),p.getY(),11,j);
					}
				return -utilityValue;
			}
			else //if player is white
			{
				//----------
				if(this.parent.pawnsPresentInWhiteHomeCamp())
				{
					let parentWhiteHomeCampCount = this.parent.countWhiteHomeCampPieces();
					let currWhiteHomeCampCount = this.countWhiteHomeCampPieces();
					if(parentWhiteHomeCampCount > currWhiteHomeCampCount)
					{
						return 2000;
					}
				}
				//----------	
				
				
				for(let p of this.white)
					{
						
						for(let i = 0; i < 2 ; i++)
							for(let j = 0; j < 5 ; j++)
								if(this.board[i][j] == "." || this.board[i][j] == "B")
									utilityValue += this.getEuclideanDistance(p.getX(),p.getY(),i,j);

						for( let j=0; j<4;j++)
							if(this.board[2][j] == "." || this.board[2][j] == "B")
								utilityValue += this.getEuclideanDistance(p.getX(),p.getY(),2,j);
						
						for( let j=0; j<3;j++)
							if(this.board[3][j] == "." || this.board[3][j] == "B")
								utilityValue += this.getEuclideanDistance(p.getX(),p.getY(),3,j);
						
						for( let j=0; j<2;j++)
							if(this.board[4][j] == "." || this.board[4][j] == "B")
								utilityValue += this.getEuclideanDistance(p.getX(),p.getY(),4,j);
						
					}
				return -utilityValue;
			}
		}
		else //if it is root node
		{
			return -1000000;
		}
	}

	// public get8AdjMoveIndices(i: number, j: number) {

		
	// 	let newAdj8Moves = new Array();
	// 	if(this.player == "BLACK")
	// 	{
	// 		if(this.inCampWhite(i,j))
	// 		{
	// 			if(this.isValidPosition(i-1,j-1) && this.containsPawn(i-1,j-1) == false && !this.visited[i-1][j-1] && this.inCampWhite(i-1,j-1))
	// 			{
	// 				newAdj8Moves.push([i-1, j-1]);
	// 			}
	// 			if(this.isValidPosition(i-1,j) && this.containsPawn(i-1,j) == false && !this.visited[i-1][j] && this.inCampWhite(i-1,j))
	// 			{
	// 				newAdj8Moves.push([i-1,j]);
	// 			}
	// 			if(this.isValidPosition(i-1,j+1) && this.containsPawn(i-1,j+1) == false && !this.visited[i-1][j+1] && this.inCampWhite(i-1,j+1))
	// 			{
	// 				newAdj8Moves.push([i-1,j+1]);
	// 			}
	// 			if(this.isValidPosition(i,j+1) && this.containsPawn(i,j+1) == false && !this.visited[i][j+1] && this.inCampWhite(i,j+1))
	// 			{
	// 				newAdj8Moves.push([i, j+1]);
	// 			}
	// 			if(this.isValidPosition(i+1,j+1) && this.containsPawn(i+1,j+1) == false && !this.visited[i+1][j+1] && this.inCampWhite(i+1,j+1))
	// 			{
	// 				newAdj8Moves.push([i+1, j+1]);
	// 			}
	// 			if(this.isValidPosition(i+1,j) && this.containsPawn(i+1,j) == false && !this.visited[i+1][j] && this.inCampWhite(i+1,j))
	// 			{
	// 				newAdj8Moves.push([i+1, j]);
	// 			}
	// 			if(this.isValidPosition(i+1,j-1) && this.containsPawn(i+1,j-1) == false && !this.visited[i+1][j-1] && this.inCampWhite(i+1,j-1))
	// 			{
	// 				newAdj8Moves.push([i+1, j-1]);
	// 			}
	// 			if(this.isValidPosition(i,j-1) && this.containsPawn(i,j-1) == false && !this.visited[i][j-1] && this.inCampWhite(i,j-1))
	// 			{
	// 				newAdj8Moves.push([i, j-1]);
	// 			}
			
	// 		}
	// 		else
	// 		{
	// 			if(this.isValidPosition(i-1,j-1) && this.containsPawn(i-1,j-1) == false && !this.visited[i-1][j-1])
	// 			{
	// 				newAdj8Moves.push([i-1,j-1]);
	// 			}
	// 			if(this.isValidPosition(i-1,j) && this.containsPawn(i-1,j) == false && !this.visited[i-1][j])
	// 			{
	// 				newAdj8Moves.push([i-1, j]);
	// 			}
	// 			if(this.isValidPosition(i-1,j+1) && this.containsPawn(i-1,j+1) == false && !this.visited[i-1][j+1])
	// 			{
	// 				newAdj8Moves.push([i-1, j+1]);
	// 			}
	// 			if(this.isValidPosition(i,j+1) && this.containsPawn(i,j+1) == false && !this.visited[i][j+1])
	// 			{
	// 				newAdj8Moves.push([i, j+1]);
	// 			}
	// 			if(this.isValidPosition(i+1,j+1) && this.containsPawn(i+1,j+1) == false && !this.visited[i+1][j+1])
	// 			{
	// 				newAdj8Moves.push([i+1, j+1]);
	// 			}
	// 			if(this.isValidPosition(i+1,j) && this.containsPawn(i+1,j) == false && !this.visited[i+1][j])
	// 			{
	// 				newAdj8Moves.push([i+1, j]);
	// 			}
	// 			if(this.isValidPosition(i+1,j-1) && this.containsPawn(i+1,j-1) == false && !this.visited[i+1][j-1])
	// 			{
	// 				newAdj8Moves.push([i+1, j-1]);
	// 			}
	// 			if(this.isValidPosition(i,j-1) && this.containsPawn(i,j-1) == false && !this.visited[i][j-1])
	// 			{
	// 				newAdj8Moves.push([i, j-1]);
	// 			}
	// 		}
	// 	}
	// 	else
	// 	{
	// 		if(this.inCampBlack(i,j))
	// 		{
	// 			if(this.isValidPosition(i-1,j-1) && this.containsPawn(i-1,j-1) == false && !this.visited[i-1][j-1] && this.inCampBlack(i-1,j-1))
	// 			{
	// 				newAdj8Moves.push([i-1, j-1]);
	// 			}
	// 			if(this.isValidPosition(i-1,j) && this.containsPawn(i-1,j) == false && !this.visited[i-1][j] && this.inCampBlack(i-1,j))
	// 			{
	// 				newAdj8Moves.push([i-1,j]);
	// 			}
	// 			if(this.isValidPosition(i-1,j+1) && this.containsPawn(i-1,j+1) == false && !this.visited[i-1][j+1] && this.inCampBlack(i-1,j+1))
	// 			{
	// 				newAdj8Moves.push([i-1, j+1]);
	// 			}
	// 			if(this.isValidPosition(i,j+1) && this.containsPawn(i,j+1) == false && !this.visited[i][j+1] && this.inCampBlack(i,j+1))
	// 			{
	// 				newAdj8Moves.push([i, j+1]);
	// 			}
	// 			if(this.isValidPosition(i+1,j+1) && this.containsPawn(i+1,j+1) == false && !this.visited[i+1][j+1] && this.inCampBlack(i+1,j+1))
	// 			{
	// 				newAdj8Moves.push([i+1, j+1]);
	// 			}
	// 			if(this.isValidPosition(i+1,j) && this.containsPawn(i+1,j) == false && !this.visited[i+1][j] && this.inCampBlack(i+1,j))
	// 			{
	// 				newAdj8Moves.push([i+1, j]);
	// 			}
	// 			if(this.isValidPosition(i+1,j-1) && this.containsPawn(i+1,j-1) == false && !this.visited[i+1][j-1] && this.inCampBlack(i+1,j-1))
	// 			{
	// 				newAdj8Moves.push([i+1, j-1]);
	// 			}
	// 			if(this.isValidPosition(i,j-1) && this.containsPawn(i,j-1) == false && !this.visited[i][j-1] && this.inCampBlack(i,j-1))
	// 			{
	// 				newAdj8Moves.push([i,j-1]);
	// 			}
			
	// 		}
	// 		else
	// 		{
	// 			if(this.isValidPosition(i-1,j-1) && this.containsPawn(i-1,j-1) == false && !this.visited[i-1][j-1])
	// 			{
	// 				newAdj8Moves.push([i-1, j-1]);
	// 			}
	// 			if(this.isValidPosition(i-1,j) && this.containsPawn(i-1,j) == false && !this.visited[i-1][j])
	// 			{
	// 				newAdj8Moves.push([i-1, j]);
	// 			}
	// 			if(this.isValidPosition(i-1,j+1) && this.containsPawn(i-1,j+1) == false && !this.visited[i-1][j+1])
	// 			{
	// 				newAdj8Moves.push([i-1, j+1]);
	// 			}
	// 			if(this.isValidPosition(i,j+1) && this.containsPawn(i,j+1) == false && !this.visited[i][j+1])
	// 			{
	// 				newAdj8Moves.push([i, j+1]);
	// 			}
	// 			if(this.isValidPosition(i+1,j+1) && this.containsPawn(i+1,j+1) == false && !this.visited[i+1][j+1])
	// 			{
	// 				newAdj8Moves.push([i+1, j+1]);
	// 			}
	// 			if(this.isValidPosition(i+1,j) && this.containsPawn(i+1,j) == false && !this.visited[i+1][j])
	// 			{
	// 				newAdj8Moves.push([i+1, j]);
	// 			}
	// 			if(this.isValidPosition(i+1,j-1) && this.containsPawn(i+1,j-1) == false && !this.visited[i+1][j-1])
	// 			{
	// 				newAdj8Moves.push([i+1, j-1]);
	// 			}
	// 			if(this.isValidPosition(i,j-1) && this.containsPawn(i,j-1) == false && !this.visited[i][j-1])
	// 			{
	// 				newAdj8Moves.push([i, j-1]);
	// 			}
	// 		}
	// 	}
	// 	return newAdj8Moves;

	// }

	public get8AdjMoveIndices(i, j) {
		let newAdj8Moves = new Array();
		
			for(let di = -1; di <= 1; di++ ) {
				for(let dj = -1; dj <= 1; dj++ ) {
					let nextI = i + di;
					let nextJ = j + dj;

					// continue when di and dj = 0 because we dont need that position.
					if(nextI == i && nextJ == j) {
						continue;
					}

					if(this.isValidPosition(nextI, nextJ) && !this.containsPawn(nextI, nextJ) && !this.visited[nextI][nextJ]) {
						
						if(this.player == "BLACK") {
							// add only if it is not in opponent home camp, OR if it is, and the next position is also in oppnt home camp.
							if(!this.inCampWhite(i, j) || (this.inCampWhite(i, j) && this.inCampWhite(nextI, nextJ))) {
								//let previousMoves = "E" + i + "," + j + " " + nextI + "," + nextJ + "\n";
								newAdj8Moves.push([nextI, nextJ])
							}
						}
						else {
							// add only if it is not in opponent home camp, OR if it is, and the next position is also in oppnt home camp.
							if(!this.inCampBlack(i, j) || (this.inCampBlack(i, j) && this.inCampBlack(nextI, nextJ))) {
								//let previousMoves = "E" + i + "," + j + " " + nextI + "," + nextJ + "\n";
								newAdj8Moves.push([nextI, nextJ])
							}
						}
						
					}
				}
			}
		return newAdj8Moves;
	}

	// public getJumpsIndices(x: number, y: number) {
	// 	let newJumpMoves = new Array();
		
	// 	this.jumpQueue.push(new Tile(x, y, ""));
	// 	this.visited[x][y] = true;
	// 	console.log("Before while loop")
	// 	while(this.jumpQueue.length != 0)
	// 	{
	// 		console.log("Entered beginning of while loop")
	// 		let t = this.jumpQueue.shift();
	// 		let i = t.getX(), j = t.getY();
	// 		console.log("i, j, visited:", i, j,  this.visited[i][j])
	// 		//----------------------trying camp oppnt----
	// 		if(this.player == "BLACK")
	// 		{
	// 			if(this.inCampWhite(x,y))
	// 			{
	// 				if(this.isValidPosition(i-2,j-2) && this.containsPawn(i-1,j-1) && !this.visited[i-2][j-2])
	// 				{
	// 					if(this.inCampWhite(i-2,j-2))
	// 						newJumpMoves.push([i-2, j-2]); 
	// 					this.jumpQueue.push(new Tile(i-2,j-2,t.getPreviousMoves()+ "J " + i + "," + j + " " + (i-2) + "," + (j-2) + "\n"));
	// 					this.visited[i-2][j-2] = true;
	// 				}
	// 				if(this.isValidPosition(i-2,j) && this.containsPawn(i-1,j) && !this.visited[i-2][j])
	// 				{
	// 					if(this.inCampWhite(i-2,j))
	// 						newJumpMoves.push([i-2, j]);
	// 					this.jumpQueue.push(new Tile(i-2,j,t.getPreviousMoves()+"J " + i + "," + j + " " + (i-2) + "," + (j) + "\n"));
	// 					this.visited[i-2][j] = true;
	// 				}
	// 				if(this.isValidPosition(i-2,j+2) && this.containsPawn(i-1,j+1) && !this.visited[i-2][j+2])
	// 				{
	// 					if(this.inCampWhite(i-2,j+2))
	// 						newJumpMoves.push([i-2, j+2]);
	// 					this.jumpQueue.push(new Tile(i-2,j+2,t.getPreviousMoves()+"J " + i + "," + j + " " + (i-2) + "," + (j+2) + "\n"));
	// 					this.visited[i-2][j+2] = true;
	// 				}
	// 				if(this.isValidPosition(i,j+2) && this.containsPawn(i,j+1) && !this.visited[i][j+2])
	// 				{
	// 					if(this.inCampWhite(i,j+2))
	// 						newJumpMoves.push([i, j+2]);
	// 					this.jumpQueue.push(new Tile(i,j+2,t.getPreviousMoves()+"J " + i + "," + j + " " + (i) + "," + (j+2) + "\n"));
	// 					this.visited[i][j+2] = true;
	// 				}
	// 				if(this.isValidPosition(i+2,j+2) && this.containsPawn(i+1,j+1) && !this.visited[i+2][j+2])
	// 				{
	// 					if(this.inCampWhite(i+2,j+2))
	// 						newJumpMoves.push([i+2, j+2]);
	// 					this.jumpQueue.push(new Tile(i+2,j+2,t.getPreviousMoves()+"J " + i + "," + j + " " + (i+2) + "," + (j+2) + "\n"));
	// 					this.visited[i+2][j+2] = true;
	// 				}
	// 				if(this.isValidPosition(i+2,j) && this.containsPawn(i+1,j) && !this.visited[i+2][j])
	// 				{
	// 					if(this.inCampWhite(i+2,j))
	// 						newJumpMoves.push([i+2, j]);
	// 					this.jumpQueue.push(new Tile(i+2,j,t.getPreviousMoves()+"J " + i + "," + j + " " + (i+2) + "," + (j) + "\n"));
	// 					this.visited[i+2][j] = true;
	// 				}
	// 				if(this.isValidPosition(i+2,j-2) && this.containsPawn(i+1,j-1) && !this.visited[i+2][j-2])
	// 				{
	// 					if(this.inCampWhite(i+2,j-2))
	// 						newJumpMoves.push([i+2, j-2]);
	// 					this.jumpQueue.push(new Tile(i+2,j-2,t.getPreviousMoves()+"J " + i + "," + j + " " + (i+2) + "," + (j-2) + "\n"));
	// 					this.visited[i+2][j-2] = true;
	// 				}
	// 				if(this.isValidPosition(i,j-2) && this.containsPawn(i, j-1) && !this.visited[i][j-2])
	// 				{
	// 					if(this.inCampWhite(i,j-2))
	// 						newJumpMoves.push([i, j-2]);
	// 					this.jumpQueue.push(new Tile(i,j-2,t.getPreviousMoves()+"J " + i + "," + j + " " + (i) + "," + (j-2) + "\n"));
	// 					this.visited[i][j-2] = true;
	// 				}
	// 			}
	// 			else
	// 			{
	// 				if(this.isValidPosition(i-2,j-2) && this.containsPawn(i-1,j-1) && !this.visited[i-2][j-2])
	// 				{
	// 					newJumpMoves.push([i-2, j-2]); 
	// 					this.jumpQueue.push(new Tile(i-2,j-2,t.getPreviousMoves()+"J " + i + "," + j + " " + (i-2) + "," + (j-2) + "\n"));
	// 					this.visited[i-2][j-2] = true;
	// 				}
	// 				if(this.isValidPosition(i-2,j) && this.containsPawn(i-1,j) && !this.visited[i-2][j])
	// 				{
	// 					newJumpMoves.push([i-2, j]);
	// 					this.jumpQueue.push(new Tile(i-2,j,t.getPreviousMoves()+"J " + i + "," + j + " " + (i-2) + "," + (j) + "\n"));
	// 					this.visited[i-2][j] = true;
	// 				}
	// 				if(this.isValidPosition(i-2,j+2) && this.containsPawn(i-1,j+1) && !this.visited[i-2][j+2])
	// 				{
	// 					newJumpMoves.push([i-2, j+2]);
	// 					this.jumpQueue.push(new Tile(i-2,j+2,t.getPreviousMoves()+"J " + i + "," + j + " " + (i-2) + "," + (j+2) + "\n"));
	// 					this.visited[i-2][j+2] = true;
	// 				}
	// 				if(this.isValidPosition(i,j+2) && this.containsPawn(i,j+1) && !this.visited[i][j+2])
	// 				{
	// 					newJumpMoves.push([i, j+2]);
	// 					this.jumpQueue.push(new Tile(i,j+2,t.getPreviousMoves()+"J " + i + "," + j + " " + (i) + "," + (j+2) + "\n"));
	// 					this.visited[i][j+2] = true;
	// 				}
	// 				if(this.isValidPosition(i+2,j+2) && this.containsPawn(i+1,j+1) && !this.visited[i+2][j+2])
	// 				{
	// 					newJumpMoves.push([i+2, j+2]);
	// 					this.jumpQueue.push(new Tile(i+2,j+2,t.getPreviousMoves()+"J " + i + "," + j + " " + (i+2) + "," + (j+2) + "\n"));
	// 					this.visited[i+2][j+2] = true;
	// 				}
	// 				if(this.isValidPosition(i+2,j) && this.containsPawn(i+1,j) && !this.visited[i+2][j])
	// 				{
	// 					newJumpMoves.push([i+2, j]);
	// 					this.jumpQueue.push(new Tile(i+2,j,t.getPreviousMoves()+"J " + i + "," + j + " " + (i+2) + "," + (j) + "\n"));
	// 					this.visited[i+2][j] = true;
	// 				}
	// 				if(this.isValidPosition(i+2,j-2) && this.containsPawn(i+1,j-1) && !this.visited[i+2][j-2])
	// 				{
	// 					newJumpMoves.push([i+2, j-2]);
	// 					this.jumpQueue.push(new Tile(i+2,j-2,t.getPreviousMoves()+"J " + i + "," + j + " " + (i+2) + "," + (j-2) + "\n"));
	// 					this.visited[i+2][j-2] = true;
	// 				}
	// 				if(this.isValidPosition(i,j-2) && this.containsPawn(i, j-1) && !this.visited[i][j-2])
	// 				{
	// 					newJumpMoves.push([i, j-2]);
	// 					this.jumpQueue.push(new Tile(i,j-2,t.getPreviousMoves()+"J " + i + "," + j + " " + (i) + "," + (j-2) + "\n"));
	// 					this.visited[i][j-2] = true;
	// 				}
	// 			} 
	// 		}
	// 		else
	// 		{
	// 			if(this.inCampBlack(x,y))
	// 			{
	// 				if(this.isValidPosition(i-2,j-2) && this.containsPawn(i-1,j-1) && !this.visited[i-2][j-2])
	// 				{
	// 					if(this.inCampBlack(i-2,j-2))
	// 						newJumpMoves.push([i-2, j-2]); 
	// 					this.jumpQueue.push(new Tile(i-2,j-2,t.getPreviousMoves()+"J " + i + "," + j + " " + (i-2) + "," + (j-2) + "\n"));
	// 					this.visited[i-2][j-2] = true;
						
	// 				}
	// 				if(this.isValidPosition(i-2,j) && this.containsPawn(i-1,j) && !this.visited[i-2][j])
	// 				{
	// 					if(this.inCampBlack(i-2,j))
	// 						newJumpMoves.push([i-2, j]);
	// 					this.jumpQueue.push(new Tile(i-2,j,t.getPreviousMoves()+"J " + i + "," + j + " " + (i-2) + "," + (j) + "\n"));
	// 					this.visited[i-2][j] = true;
	// 				}
	// 				if(this.isValidPosition(i-2,j+2) && this.containsPawn(i-1,j+1) && !this.visited[i-2][j+2])
	// 				{
	// 					if(this.inCampBlack(i-2,j+2))
	// 						newJumpMoves.push([i-2, j+2]);
	// 					this.jumpQueue.push(new Tile(i-2,j+2,t.getPreviousMoves()+"J " + i + "," + j + " " + (i-2) + "," + (j+2) + "\n"));
	// 					this.visited[i-2][j+2] = true;
	// 				}
	// 				if(this.isValidPosition(i,j+2) && this.containsPawn(i,j+1) && !this.visited[i][j+2])
	// 				{
	// 					if(this.inCampBlack(i,j+2))
	// 						newJumpMoves.push([i, j+2]);
	// 					this.jumpQueue.push(new Tile(i,j+2,t.getPreviousMoves()+"J " + i + "," + j + " " + (i) + "," + (j+2) + "\n"));
	// 					this.visited[i][j+2] = true;
	// 				}
	// 				if(this.isValidPosition(i+2,j+2) && this.containsPawn(i+1,j+1) && !this.visited[i+2][j+2])
	// 				{
	// 					if(this.inCampBlack(i+2,j+2))
	// 						newJumpMoves.push([i+2, j+2]);
	// 					this.jumpQueue.push(new Tile(i+2,j+2,t.getPreviousMoves()+"J " + i + "," + j + " " + (i+2) + "," + (j+2) + "\n"));
	// 					this.visited[i+2][j+2] = true;
	// 				}
	// 				if(this.isValidPosition(i+2,j) && this.containsPawn(i+1,j) && !this.visited[i+2][j])
	// 				{
	// 					if(this.inCampBlack(i+2,j))
	// 						newJumpMoves.push([i+2, j]);
	// 					this.jumpQueue.push(new Tile(i+2,j,t.getPreviousMoves()+"J " + i + "," + j + " " + (i+2) + "," + (j) + "\n"));
	// 					this.visited[i+2][j] = true;
	// 				}
	// 				if(this.isValidPosition(i+2,j-2) && this.containsPawn(i+1,j-1) && !this.visited[i+2][j-2])
	// 				{
	// 					if(this.inCampBlack(i+2,j-2))
	// 						newJumpMoves.push([i+2, j-2]);
	// 					this.jumpQueue.push(new Tile(i+2,j-2,t.getPreviousMoves()+"J " + i + "," + j + " " + (i+2) + "," + (j-2) + "\n"));
	// 					this.visited[i+2][j-2] = true;
	// 				}
	// 				if(this.isValidPosition(i,j-2) && this.containsPawn(i, j-1) && !this.visited[i][j-2])
	// 				{
	// 					if(this.inCampBlack(i,j-2))
	// 						newJumpMoves.push([i, j-2]);
	// 					this.jumpQueue.push(new Tile(i,j-2,t.getPreviousMoves()+"J " + i + "," + j + " " + (i) + "," + (j-2) + "\n"));
	// 					this.visited[i][j-2] = true;
	// 				}
	// 			}
	// 			else
	// 			{
	// 				if(this.isValidPosition(i-2,j-2) && this.containsPawn(i-1,j-1) && !this.visited[i-2][j-2])
	// 				{
	// 					newJumpMoves.push([i-2, j-2]); 
	// 					this.jumpQueue.push(new Tile(i-2,j-2,t.getPreviousMoves()+"J " + i + "," + j + " " + (i-2) + "," + (j-2) + "\n"));
	// 					this.visited[i-2][j-2] = true;
	// 				}
	// 				if(this.isValidPosition(i-2,j) && this.containsPawn(i-1,j) && !this.visited[i-2][j])
	// 				{
	// 					newJumpMoves.push([i-2, j]);
	// 					this.jumpQueue.push(new Tile(i-2,j,t.getPreviousMoves()+"J " + i + "," + j + " " + (i-2) + "," + (j) + "\n"));
	// 					this.visited[i-2][j] = true;
	// 				}
	// 				if(this.isValidPosition(i-2,j+2) && this.containsPawn(i-1,j+1) && !this.visited[i-2][j+2])
	// 				{
	// 					newJumpMoves.push([i-2, j+2]);
	// 					this.jumpQueue.push(new Tile(i-2,j+2,t.getPreviousMoves()+"J " + i + "," + j + " " + (i-2) + "," + (j+2) + "\n"));
	// 					this.visited[i-2][j+2] = true;
	// 				}
	// 				if(this.isValidPosition(i,j+2) && this.containsPawn(i,j+1) && !this.visited[i][j+2])
	// 				{
	// 					newJumpMoves.push([i, j+2]);
	// 					this.jumpQueue.push(new Tile(i,j+2,t.getPreviousMoves()+"J " + i + "," + j + " " + (i) + "," + (j+2) + "\n"));
	// 					this.visited[i][j+2] = true;
	// 				}
	// 				if(this.isValidPosition(i+2,j+2) && this.containsPawn(i+1,j+1) && !this.visited[i+2][j+2])
	// 				{
	// 					newJumpMoves.push([i+2, j+2]);
	// 					this.jumpQueue.push(new Tile(i+2,j+2,t.getPreviousMoves()+"J " + i + "," + j + " " + (i+2) + "," + (j+2) + "\n"));
	// 					this.visited[i+2][j+2] = true;
	// 				}
	// 				if(this.isValidPosition(i+2,j) && this.containsPawn(i+1,j) && !this.visited[i+2][j])
	// 				{
	// 					newJumpMoves.push([i+2, j]);
	// 					this.jumpQueue.push(new Tile(i+2,j,t.getPreviousMoves()+"J " + i + "," + j + " " + (i+2) + "," + (j) + "\n"));
	// 					this.visited[i+2][j] = true;
	// 				}
	// 				if(this.isValidPosition(i+2,j-2) && this.containsPawn(i+1,j-1) && !this.visited[i+2][j-2])
	// 				{
	// 					newJumpMoves.push([i+2, j-2]);
	// 					this.jumpQueue.push(new Tile(i+2,j-2,t.getPreviousMoves()+"J " + i + "," + j + " " + (i+2) + "," + (j-2) + "\n"));
	// 					this.visited[i+2][j-2] = true;
	// 				}
	// 				if(this.isValidPosition(i,j-2) && this.containsPawn(i, j-1) && !this.visited[i][j-2])
	// 				{
	// 					newJumpMoves.push([i, j-2]);
	// 					this.jumpQueue.push(new Tile(i,j-2,t.getPreviousMoves()+"J " + i + "," + j + " " + (i) + "," + (j-2) + "\n"));
	// 					this.visited[i][j-2] = true;
	// 				}
	// 			}
	// 		}
	// 		//----------------------
	// 	}
	// 	console.log("Exited while loop")
	// 	return newJumpMoves;
	// }


	public getJumpsIndices(x, y): GameState[]
	{
		let newJumpMoves = new Array();
		//--------------------------------------
		
		while(this.jumpQueue.length != 0) {
			//console.log("il")
			let t = this.jumpQueue.shift();
			let i = t.getX(), j = t.getY();

			for(let di= -2 ; di <= 2; di = di+2) {
				for(let dj= -2; dj <=2; dj = dj+2) {

					//console.log(di, dj)
					let nextI = x + di;
					let nextJ = y + dj;

					if(nextI == x && nextJ == y) {
						continue;
					}

					let obstaclei = x, obstaclej = y;
					if(di > 0) {
						obstaclei = x + 1;
					}
					else if(di < 0) {
						obstaclei = x - 1;
					}
					if(dj > 0) {
						obstaclej = y + 1;
					}
					else if(dj < 0) {
						obstaclej = y - 1;
					}

					if(this.isValidPosition(nextI, nextJ) && this.containsPawn(obstaclei, obstaclej) && !this.visited[nextI][nextJ]) {
						if(this.player == "BLACK") {
							let previousMoves = t.getPreviousMoves() + "J " + i + "," + j + " " + nextI + "," + nextJ + "\n";
							if(!this.inCampWhite(x, y) || (this.inCampWhite(x, y) && this.inCampWhite(nextI, nextJ))) {
								newJumpMoves.push([nextI, nextJ])
							}
							this.jumpQueue.push(new Tile(nextI, nextJ, previousMoves))
							this.visited[nextI][nextJ] = true;
						}
						else {
							let previousMoves = t.getPreviousMoves() + "J " + i + "," + j + " " + nextI + "," + nextJ + "\n";
							if(!this.inCampBlack(x, y) || (this.inCampBlack(x, y) && this.inCampBlack(nextI, nextJ))) {
								newJumpMoves.push([nextI, nextJ])
							}
							this.jumpQueue.push(new Tile(nextI, nextJ, previousMoves))
							this.visited[nextI][nextJ] = true;
						}
					}

				}
			}
		}
		//console.log("returning jump moves")
		return newJumpMoves;

	}

}