import {Figure, FigureNames} from "./Figure";
import {Colors} from "../Colors";
import {Cell} from "../Cell";
import blackLogo from "../../assets/black-bishop.png"
import whiteLogo from "../../assets/white-bishop.png"

export class Bishop extends Figure {
    constructor(color: Colors, cell: Cell) {
        super(color, cell);
        this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
        this.name = FigureNames.BISHOP;
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
        if (this.cell.isEmptyDiagonal(target)) {
            return true;
        }
        return false;
    }

    canBeat(target: Cell) {
        if (!super.canBeat(target)) {
            return false;
        }
        if (this.cell.canBeatDiagonal(target, this.color, this.name)) {
            return true;
        }
        return false;
    }

}