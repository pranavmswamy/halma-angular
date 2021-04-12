import { GameState } from './GameState';

export class AlphaBeta {
	
	firstLevel: GameState[];
	depth: number;
	
	public maxValue(depth: number, gameState: GameState, alpha: number, beta: number): number
	{
		//console.log("Entering maxValue")
		if(gameState.terminalTest() == true)
		{
			return gameState.getUtilityValue();
		}
		
		if(depth == 0)
		{
			gameState.setUtilityValue(gameState.calculateUtilityValue());
			gameState.setAlphaBetaValue(gameState.getUtilityValue());
			return gameState.getUtilityValue();
		}
		
		let v = Number.NEGATIVE_INFINITY //check

		let kLevel: GameState[] = gameState.calculateActions();
		//console.log("Finished calculating actions in maxvalue")
		if(this.depth == depth)
			this.firstLevel = kLevel;
		
		for(let state of kLevel)
		{
			//console.log("Entered for loop in maxvalue")
			v = Math.max(v, this.minValue(depth-1, state, alpha, beta));
			if(v>=beta) 
			{
				gameState.setAlphaBetaValue(v);
				if(this.depth == depth)
					this.firstLevel = kLevel;
				return v;
			}
			alpha = Math.max(alpha, v);
		}
		gameState.setAlphaBetaValue(v);
		if(this.depth == depth)
			this.firstLevel = kLevel;
		return v;
	}
	
	public minValue(depth: number, gameState: GameState, alpha: number, beta: number): number
	{
		console.log("Entering minvalue")
		if(gameState.terminalTest() == true)
		{
			return gameState.getUtilityValue();
		}
		if(depth == 0)
		{
			gameState.setUtilityValue(gameState.calculateUtilityValue());
			gameState.setAlphaBetaValue(gameState.getUtilityValue());
			return gameState.getUtilityValue();
		}
		
		let v = Number.POSITIVE_INFINITY // check
		
		for(let state of gameState.calculateActions())
		{	
			v = Math.min(v, this.maxValue(depth-1, state,alpha,beta));
			if(v<=alpha)
			{
				gameState.setAlphaBetaValue(v);
				return v;
			}
			beta = Math.min(beta, v);
		}
		gameState.setAlphaBetaValue(v);
		return v;
	}
	
	public runAlphaBeta(initialState: GameState, depth: number): GameState
	{
		this.depth = depth; 
		//console.log("Entering alpha beta")
		let abReturnedValue =  this.maxValue(depth, initialState, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY);
		//System.out.println(" ab returned = " + abReturnedValue);
		//console.log("Finished alpha beta")
		let nextGameState: GameState = null, gameOverState: GameState = null;
		let returnableGameState = null;
        
        let randomSelect: GameState[] = new Array();
		
		
		for(let g of this.firstLevel)
		{
			//console.log("uv = " + g.getUtilityValue() + " ab value = " + g.getAlphaBetaValue() + "prevMoves= " + g.getPreviousMoves());
			console.log("one of many options")
			console.log(g.getBoard())

			if(abReturnedValue == g.getAlphaBetaValue() && g.terminalTest() == true)
			{
				gameOverState = g;
				break;
			}
			else if(abReturnedValue == g.getAlphaBetaValue())
			{
				randomSelect.push(g);
			}
		}
		
		
		if(gameOverState != null)
		{
            localStorage.setItem("next_moves", gameOverState.getPreviousMoves().trim())
            console.log("next_moves = ", gameOverState.getPreviousMoves().trim())
			//writeFile.writeMoveToFile(gameOverState.getPreviousMoves().trim());
			returnableGameState = gameOverState;
		}
		else
		{
            nextGameState = randomSelect[Math.floor(Math.random() * randomSelect.length)];
            localStorage.setItem("next_moves", nextGameState.getPreviousMoves().trim())
            console.log("next_moves = ", nextGameState.getPreviousMoves().trim())
			//writeFile.writeMoveToFile(nextGameState.getPreviousMoves().trim());
			returnableGameState = nextGameState;
		}
		//writeFile.closeFile();
		return returnableGameState;
	}	
}