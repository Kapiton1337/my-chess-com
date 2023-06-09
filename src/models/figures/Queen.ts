import {Figure} from "./Figure";
import {Colors} from "../Colors";
import {Cell} from "../Cell";
import {FigureNames} from "./Figure";
import blackLogo from "../../assets/black-queen.png"
import whiteLogo from "../../assets/white-queen.png"

export class Queen extends Figure {
    constructor(color: Colors, cell: Cell) {
        super(color, cell);
        this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
        this.name = FigureNames.QUEEN;
    }

    canMove(target: Cell, figuresBeatKings: {black: Figure[], white: Figure[]}): boolean {
        if (!super.canMove(target, figuresBeatKings)) {
            return false;
        }
        if (this.cell.isEmptyVertical(target)) {
            return true;
        }
        if (this.cell.isEmptyHorizontal(target)) {
            return true;
        }
        if (this.cell.isEmptyDiagonal(target)) {
            return true;
        }
        return false;
    }

    canBeat(target: Cell) {
        if (!super.canBeat(target)) {
            return false;
        }
        if (this.cell.canBeatVertical(target, this.color, this.name)) {
            return true;
        }
        if (this.cell.canBeatHorizontal(target, this.color, this.name)) {
            return true;
        }
        if (this.cell.canBeatDiagonal(target, this.color, this.name)) {
            return true;
        }
        return false;
    }
}