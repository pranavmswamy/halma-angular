import { GameState } from './GameState';

export class AlphaBeta {
	
	firstLevel: GameState[];
	depth: number;
	
	public maxValue(depth: number, gameState: GameState, alpha: number, beta: number): number
	{
		
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
		if(this.depth == depth)
			this.firstLevel = kLevel;
		
		for(let state of kLevel)
		{
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
	
	public runAlphaBeta(initialState: GameState, depth: number)
	{
		this.depth = depth; 
		let abReturnedValue =  this.maxValue(depth, initialState, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY);
		//System.out.println(" ab returned = " + abReturnedValue);
		
	    let nextGameState: GameState = null, gameOverState: GameState = null;
        
        let randomSelect: GameState[] = new Array();
		
		
		for(let g of this.firstLevel)
		{
			console.log("uv = " + g.getUtilityValue() + " ab value = " + g.getAlphaBetaValue() + "prevMoves= " + g.getPreviousMoves());

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
		}
		else
		{
            nextGameState = randomSelect[Math.floor(Math.random() * randomSelect.length)];
            localStorage.setItem("next_moves", nextGameState.getPreviousMoves().trim())
            console.log("next_moves = ", nextGameState.getPreviousMoves().trim())
            //writeFile.writeMoveToFile(nextGameState.getPreviousMoves().trim());
		}
		//writeFile.closeFile();
	}	
}