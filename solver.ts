enum CellSymbols {
	One = '1',
	Two = '2',
	Three = '3',
	Four = '4',
	Five = '5',
	Six = '6',
	Seven = '7',
	Eight = '8',
	Zero = '0',

	Flag = 'f',
	Untouch = 'u'
}

class Cell{
	private symbol: string;
	private neighbors: Array<Cell>;
	private guess: string;
	private guessed: boolean;

	constructor(symbol: string){
		this.symbol = symbol;
		this.guessed = false;
		this.neighbors = [];
	}

	public addNeighbor(neighbor: Cell): void{
		this.neighbors.push(neighbor);
	}

	public getNeighbors(): Array<Cell>{
		return this.neighbors;
	}

	public getSymbol(): string{
		return this.symbol;
	}

	public deduct(): void{
		if(!this.isNumber()){
			return;
		}

		const mine: number = parseInt(this.symbol);
		const flagged: Array<Cell> = [];
		const untouched: Array<Cell> = [];
		this.neighbors.forEach((neighbor) => {
			const cellValue = neighbor.isGuessed() ? neighbor.getGuess() : neighbor.getSymbol();
			if(cellValue === CellSymbols.Untouch){
				untouched.push(neighbor);
			} else if(cellValue === CellSymbols.Flag){
				flagged.push(neighbor);
			}
		});
		if(mine - flagged.length === untouched.length){
			untouched.forEach((cell) => {
				cell.setGuess(CellSymbols.Flag);
			});
		}
	}

	public setGuess(guess: string){
		this.guess = guess;
		this.guessed = true;
	}

	public getGuess(): string{
		return this.guess;
	}

	public isGuessed(): boolean{
		return this.guessed;
	}

	private isNumber(): boolean{
		return !(this.symbol === CellSymbols.Untouch ||
				this.symbol === CellSymbols.Flag);
	}
}
class Solver{
	private boardSpec: string;
	private cells: Array<Array<Cell>>;
	private rowLength: number;
	private colLength: number;

	public parseBoardSpec(boardSpec: string): void{
		this.boardSpec = boardSpec;
		const rows: Array<string> = this.boardSpec.split('\n');
		this.rowLength = rows.length;
		this.colLength = rows[0].length;
		this.cells = [];

		rows.forEach((row, rowIndex) => {
			const rowOfCells = [];
			this.cells.push(rowOfCells);
			for(let colIndex = 0; colIndex < this.colLength; colIndex++){
				const symbol = row.charAt(colIndex);
				const cell = new Cell(symbol);
				rowOfCells.push(cell);

				const possibleNeighbors = [
					[rowIndex - 1, colIndex - 1],
					[rowIndex - 1, colIndex],
					[rowIndex - 1, colIndex + 1],
					[rowIndex, colIndex - 1]
				];
				possibleNeighbors.forEach((coord) => {
					const coord_row = coord[0];
					const coord_col = coord[1];
					if(this.cells[coord_row] && this.cells[coord_row][coord_col]){
						this.cells[coord_row][coord_col].addNeighbor(cell);
						cell.addNeighbor(this.cells[coord_row][coord_col]);
					}
				});
			}
		})
	}

	public deduct(): void{
		this.cells.forEach((row) => {
			row.forEach((cell) => {
				cell.deduct();
			});
		});
	}

	public currentBoardSpec(): string{
		let rows: Array<string> = [];
		this.cells.forEach((row) => {
			let cells = '';
			row.forEach((cell) => {
				cells += cell.isGuessed() ? cell.getGuess() : cell.getSymbol();
			});
			rows.push(cells);
		});
		return rows.join('\n');
	}
}

export { CellSymbols };
export default Solver;