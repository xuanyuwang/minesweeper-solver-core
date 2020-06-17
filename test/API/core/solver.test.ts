import Solver, { CellSymbols } from '../../../src/core/solver';

const { expect } = intern.getPlugin('chai');
const { registerSuite } = intern.getPlugin('interface.object');

registerSuite('Cell Tests', () => {
    let solver: Solver;
    return {
        beforeEach(){
            solver = new Solver();
        },

        'parseBoardSpec, currentBoardSpec: 0x0 size'(){
            const emptySpec = '';
            const options = undefined;
            solver.parseBoardSpec(emptySpec, options);
            expect(solver.currentBoardSpec(), 'handle 0x0 wrongly').to.equal(emptySpec);
        },

        'parseBoardSpec, currentBoardSpec: 1x1 size'(){
            const spec_1x1 = '0';
            const options = undefined;
            solver.parseBoardSpec(spec_1x1, options);
            expect(solver.currentBoardSpec(), 'handle 1x1 wrongly').to.equal(spec_1x1);
        },

        'parseBoardSpec, currentBoardSpec: 3x4 size'(){
            const spec_3x4 = '012\n345\n678\nfu0\n123';
            const options = undefined;
            solver.parseBoardSpec(spec_3x4, options);
            expect(solver.currentBoardSpec(), 'handle 3x4 wrongly').to.equal(spec_3x4);
        }
    }
})