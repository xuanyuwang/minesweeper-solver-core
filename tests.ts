import Solver from './solver';
import { CellSymbols as CS } from './solver';

function specTemp33(_00, _01, _02, _10, _11, _12, _20, _21, _22) {
    return `${_00}${_01}${_02}\n` +
        `${_10}${_11}${_12}\n` +
        `${_20}${_21}${_22}`;
}

function test_parse_spec(): void {
    const solver = new Solver();
    const intialBoard = specTemp33(CS.Untouch, CS.Untouch, CS.Untouch,
        CS.Untouch, CS.Untouch, CS.Untouch,
        CS.Untouch, CS.Untouch, CS.Untouch);
    solver.parseBoardSpec(intialBoard);
    console.log(solver.currentBoardSpec());
}

test_parse_spec();