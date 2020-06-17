import Solver, { CellSymbols } from '../../../src/core/solver';

const { expect } = intern.getPlugin('chai');
const { registerSuite } = intern.getPlugin('interface.object');

registerSuite('Cell Tests', () => {
    let solver: Solver;
    return {
        beforeEach(){
            solver = new Solver();
        },

        'parseBoardSpec, currentBoardSpec'(){
            const emptySpec = '';
            const options = undefined;
            solver.parseBoardSpec(emptySpec, options);
            expect(solver.currentBoardSpec(), 'handle 0x0 wrongly').to.equal('');
        }
    }
})