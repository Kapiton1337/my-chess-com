import {Figure} from "./Figure";
import {Colors} from "../Colors";
import {Cell} from "../Cell";
import {FigureNames} from "./Figure";
import blackLogo from "../../assets/black-rook.png"
import whiteLogo from "../../assets/white-rook.png"

export class Rook extends Figure {
    constructor(color: Colors, cell: Cell) {
        super(color, cell);
        this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
        this.name = FigureNames.ROOK;
    }

    canMove(target: Cell): boolean {
        if(this.color === Colors.WHITE && Figure.isWhiteKingUnderCheck){
            return false;
        }
        if(this.color === Colors.BLACK && Figure.isBlackKingUnderCheck){
            return false;
        }
        if (!super.canMove(target)) {
            return false;
        }
        if (this.cell.isEmptyVertical(target)) {
            return true;
        }
        if (this.cell.isEmptyHorizontal(target)) {
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
        return false;
    }
}