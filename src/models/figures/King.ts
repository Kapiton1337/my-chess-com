import {Figure, FigureNames} from "./Figure";
import {Colors} from "../Colors";
import {Cell} from "../Cell";
import blackLogo from "../../assets/black-king.png"
import whiteLogo from "../../assets/white-king.png"

export class King extends Figure{
    constructor(color: Colors, cell: Cell) {
        super(color, cell);
        this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
        this.name = FigureNames.KING;
    }

    canMove(target: Cell): boolean {
        if(!super.canMove(target)){
            return false;
        }
        if(target.isUnderAttackBlack() && this.color === Colors.WHITE){
            return false;
        }
        if(target.isUnderAttackWhite() && this.color === Colors.BLACK){
            return false;
        }
        const dx = Math.abs(target.x - this.cell.x);
        const dy = Math.abs(target.y - this.cell.y);

        if(target.y === this.cell.y && dx === 1){
            return true;
        }
        if(target.x === this.cell.x && dy === 1){
            return true;
        }
        if((target.x === this.cell.x + 1 || target.x === this.cell.x - 1) && dy === 1){
            return true;
        }
        if((target.y === this.cell.y + 1 || target.y === this.cell.y) && dx === 1){
            return true;
        }

        return false;
    }

    canBeat(target: Cell) {
        this.canMove(target);
    }
}