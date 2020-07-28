const CellSymbols = {
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
	constructor(symbol){
		this.symbol = symbol;
		this.guessed = false;
		this.neighbors = [];
	}

	addNeighbor(neighbor){
		this.neighbors.push(neighbor);
	}

	getNeighbors(){
		return this.neighbors;
	}

	getSymbol(){
		return this.symbol;
	}

	deduct(){
		if(!this.isNumber()){
			return;
		}

		const mine = parseInt(this.symbol);
		const flagged = [];
		const untouched = [];
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

	setGuess(guess){
		this.guess = guess;
		this.guessed = true;
	}

	getGuess(){
		return this.guess;
	}

	isGuessed(){
		return this.guessed;
	}

	isNumber(){
		return !(this.symbol === CellSymbols.Untouch ||
				this.symbol === CellSymbols.Flag);
	}
}
class Solver{
	/**
	 * This API will convert a string board spec into an internal data structure 
	 * @param boardSpec consists of CellSymbols and new line characters ("\n"). 
	 * The last line should not have trailing new line characters.
	 * @param options 
	 */
	parseBoardSpec(boardSpec, options){
		this.options = Boolean(options) ? JSON.parse(options) : {};
		this.boardSpec = boardSpec;
		const rows = this.boardSpec.split('\n');
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

	deduct(){
		this.cells.forEach((row) => {
			row.forEach((cell) => {
				cell.deduct();
			});
		});
	}

	currentBoardSpec(){
		let rows = [];
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