import logo from "../assets/black-king.png"
import {Colors} from "../Colors";
import {Cell} from "../Cell";

export enum FigureNames {
    FIGURE = "Фигура",
    KING = "Король",
    KNIGHT = "Конь",
    PAWN = "Пешка",
    QUEEN = "Ферзь",
    ROOK = "Ладья",
    BISHOP = "Слон"
}

export class Figure {
    color: Colors;
    logo: typeof logo | null;
    cell: Cell;
    name: FigureNames;
    cellsCanAttack: Cell[];
    static isWhiteKingUnderCheck: boolean = false;
    static isBlackKingUnderCheck: boolean = false;
    id: number;

    constructor(color: Colors, cell: Cell) {
        this.color = color;
        this.cell = cell;
        this.cell.figure = this;
        this.logo = null;
        this.name = FigureNames.FIGURE;
        this.id = Math.random();
        this.cellsCanAttack = [];
    }

    addCellCanAttack(cell: Cell) {
        this.cellsCanAttack.push(cell);
    }

    clearCellCanAttack() {
        this.cellsCanAttack = [];
    }

    canMove(target: Cell): boolean {
        if(Figure.isWhiteKingUnderCheck && this.color === Colors.WHITE && this.name !== FigureNames.KING){
            return false;
        }
        if(Figure.isBlackKingUnderCheck && this.color === Colors.BLACK && this.name !== FigureNames.KING){
            return false;
        }
        if (target.figure?.color === this.color)
            return false
        if (target.figure?.name === FigureNames.KING)
            return false;

        return true;
    }

    canBeat(target: Cell) {
        if (target.figure?.color === this.color)
            return false
        return true;
    }

    moveFigure(target: Cell) {

    }

    setWhiteKingUnderCheck() {
        Figure.isWhiteKingUnderCheck = true;
    }

    setBlackKingUnderCheck() {
        Figure.isBlackKingUnderCheck = true;
    }

    removeWhiteKingUnderCheck() {
        Figure.isWhiteKingUnderCheck = false;
    }

    removeBlackKingUnderCheck() {
        Figure.isBlackKingUnderCheck = false;
    }
}