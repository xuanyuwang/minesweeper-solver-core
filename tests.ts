import Solver from './solver';
import { CellSymbols as CS } from './solver';

function specTemp33(_00, _01, _02, _10, _11, _12, _20, _21, _22) {
    return `${_00}${_01}${_02}\n` +
        `${_10}${_11}${_12}\n` +
        `${_20}${_21}${_22}`;
}

function assertEqual(expected: any, actual: any, message: string, error: any = ''){
    if(expected === actual){
        console.log('Pass');
    }else{
        console.log('Fail', message, error);
    }
}
function test_parse_initial_spec(): void {
    const solver = new Solver();
    const intialBoard = specTemp33(CS.Untouch, CS.Untouch, CS.Untouch,
        CS.Untouch, CS.Untouch, CS.Untouch,
        CS.Untouch, CS.Untouch, CS.Untouch);
    solver.parseBoardSpec(intialBoard);
    const parsedBoard = solver.currentBoardSpec()
    assertEqual(parsedBoard, 'uuu\nuuu\nuuu', 'parse inital spec');
}

function test_deduct_1(): void {
    /**
     * 0 0 0
     * 0 1 0
     * 0 0 u
     */
    const solver = new Solver();
    const intialBoard = specTemp33(CS.Zero, CS.Zero, CS.Zero,
        CS.Zero, CS.One, CS.Zero,
        CS.Zero, CS.Zero, CS.Untouch);
    solver.parseBoardSpec(intialBoard);
    solver.deduct();
    const parsedBoard = solver.currentBoardSpec()
    assertEqual(parsedBoard, '000\n010\n00f', 'test the solver for number 1', parsedBoard);
}

test_parse_initial_spec();
test_deduct_1();