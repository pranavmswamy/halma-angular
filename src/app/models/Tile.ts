export class Tile {
    private posX: number;
    private posY: number;
    private jumpParentTile: string;
        
        public constructor(x: number, y: number, parent: string)
        {
            this.posX = x;
            this.posY = y;
            this.jumpParentTile = "" + parent; // possible issue. check if deep copy is happened and is required. 
        }
        
        public getX()
        {
            return this.posX;
        }
        
        public getY()
        {
            return this.posY;
        }
        
        public getPreviousMoves()
        {
            return this.jumpParentTile;
        }
        
        public setX(x: number)
        {
            this.posX = x;
        }
        
        public setY(y: number)
        {
            this.posY = y;
        }
    }