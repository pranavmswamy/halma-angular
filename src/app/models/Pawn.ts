export class Pawn {

    private posX: number;
    private posY: number; 
    private sumXY: number;
    private _inBlackHomeCamp: boolean;
    private _inWhiteHomeCamp: boolean;
	
	Pawn(x: number, y: number)
	{
		this.posX = x;
		this.posY = y;
		this.sumXY = x+y;
		this._inBlackHomeCamp = this.computeInBlackHomeCamp();
		this._inWhiteHomeCamp = this.computeInWhiteHomeCamp();
	}
    
    getX() : number	{
		return this.posX;
	}
	
	getSumXY(): number {
		return this.sumXY;
	}
	
	getY(): number {
		return this.posY;
	}
	
	setX(x: number) : void {
		this.posX = x;
	}
	
	setY(y: number) : void {
		this.posY = y;
	}
	
	inWarZone() : boolean {
		for(let i = 0; i < 2 ; i++)
		{
			for(let j = 0; j < 5 ; j++)
			{
					if(this.posX == i && this.posY == j)
						return false;
			}
		}
		
		for(let j=0; j<4;j++)
			if(this.posX == 2 && this.posY == j)
				return false;
			
		for(let j=0; j<3;j++)
			if(this.posX == 3 && this.posY == j)
				return false;
		
		for(let j=0; j<2;j++)
			if(this.posX == 4 && this.posY == j)
				return false;
		
		for(let i = 14; i < 16 ; i++)
		{
			for(let j = 11; j < 16 ; j++)
			{
					if(this.posX == i && this.posY ==j)
						return false;
			}
		}
		for( let j=12; j<16;j++)
			if(this.posX == 13 && this.posY == j)
				return false;
				
		for( let j=13; j<16;j++)
			if(this.posX == 12 && this.posY == j)
				return false;			
		
		for( let j=14; j<16;j++)
			if(this.posX == 11 && this.posY == j)
				return false;
		
		
		return true;
	}
	
	private computeInBlackHomeCamp(): boolean {
		for(let i = 0; i < 2 ; i++)
		{
			for(let j = 0; j < 5 ; j++)
			{
					if(this.posX == i && this.posY == j)
						return true;
			}
		}
		
		for( let j=0; j<4;j++)
			if(this.posX == 2 && this.posY == j)
				return true;
			
		for( let j=0; j<3;j++)
			if(this.posX == 3 && this.posY == j)
				return true;
		
		for( let j=0; j<2;j++)
			if(this.posX == 4 && this.posY == j)
				return true;
		
		return false;
	}
	
	private computeInWhiteHomeCamp() : boolean
	{
		for(let i = 14; i < 16 ; i++)
		{
			for(let j = 11; j < 16 ; j++)
			{
					if(this.posX == i && this.posY ==j)
						return true;
			}
		}
		for( let j=12; j<16;j++)
			if(this.posX == 13 && this.posY == j)
				return true;
				
		for( let j=13; j<16;j++)
			if(this.posX == 12 && this.posY == j)
				return true;			
		
		for( let j=14; j<16;j++)
			if(this.posX == 11 && this.posY == j)
				return true;
		
		return false;
	}

	inBlackHomeCamp() : boolean	{
		return this._inBlackHomeCamp;
	}
	
	inWhiteHomeCamp() : boolean {
		return this._inWhiteHomeCamp;
	}
}