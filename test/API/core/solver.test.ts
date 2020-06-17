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
        },

        'deduct: 1 bomb around'(){
            const spec = 'u00\n010\n000';
            const options = undefined;
            solver.parseBoardSpec(spec, options);
            solver.deduct();
            expect(solver.currentBoardSpec(), 'find bomb for 1').to.equal('f00\n010\n000');
        },

        'deduct: 2 bomb around'(){
            const spec = 'u00\n020\n00u';
            const options = undefined;
            solver.parseBoardSpec(spec, options);
            solver.deduct();
            expect(solver.currentBoardSpec(), 'find bomb for 2').to.equal('f00\n020\n00f');
        },

        'deduct: 3 bomb around'(){
            const spec = 'uu0\n030\n00u';
            const options = undefined;
            solver.parseBoardSpec(spec, options);
            solver.deduct();
            expect(solver.currentBoardSpec(), 'find bomb for 3').to.equal('ff0\n030\n00f');
        }
    }
})