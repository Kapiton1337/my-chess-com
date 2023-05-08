import {Colors} from "./Colors";
import {Figure} from "./figures/Figure";
import {Board} from "./Board";
import {match} from "assert";

export class Cell {
    readonly x: number;
    readonly y: number;
    readonly color: Colors;
    figure: Figure | null;
    underAttackBlack: boolean;
    underAttackWhite: boolean;
    board: Board;
    available: boolean;
    id: number;

    constructor(board: Board, x: number, y: number, color: Colors, figure: Figure | null) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.figure = figure;
        this.underAttackWhite = false;
        this.underAttackBlack = false;
        this.board = board;
        this.available = false;
        this.id = Math.random();
    }
    isUnderAttackWhite(){
        return this.underAttackWhite;
    }

    isUnderAttackBlack(){
        return this.underAttackBlack;
    }

    isEmpty() {
        return this.figure === null;
    }

    isEmptyDiagonal(target: Cell): boolean {
        const absX = Math.abs(target.x - this.x);
        const absY = Math.abs(target.y - this.y);

        if (absX !== absY) {
            return false;
        }

        const dy = this.y < target.y ? 1 : -1;
        const dx = this.x < target.x ? 1 : -1;

        for (let i = 1; i < absY; i++) {
            if (!this.board.getCell(this.y + dy * i, this.x + dx * i).isEmpty()) {
                return false;
            }
        }
        return true;
    }

    isEnemy(target: Cell) {
        if (target.figure) {
            return this.figure?.color !== target.figure.color;
        }
    }

    isEmptyVertical(target: Cell): boolean {
        if (this.x !== target.x) return false;

        const min = Math.min(this.y, target.y);
        const max = Math.max(this.y, target.y);

        for (let y = min + 1; y < max; y++) {
            if (!this.board.getCell(y, this.x).isEmpty()) {
                return false;
            }
        }
        return true;
    }

    isEmptyHorizontal(target: Cell): boolean {
        if (this.y !== target.y) return false;

        const min = Math.min(this.x, target.x);
        const max = Math.max(this.x, target.x);

        for (let x = min + 1; x < max; x++) {
            if (!this.board.getCell(this.y, x).isEmpty()) {
                return false;
            }
        }
        return true;
    }

    setFigure(figure: Figure) {
        this.figure = figure;
        this.figure.cell = this;
    }

    addLostFigure(figure: Figure) {
        figure.color === Colors.WHITE ? this.board.lostWhiteFigures.push(figure) : this.board.lostBlackFigures.push(figure);
    }

    moveFigure(target: Cell) {
        if (this.figure && this.figure?.canMove(target)) {
            this.figure.moveFigure(target);
            if (target.figure) {
                this.addLostFigure(target.figure);
            }
            target.setFigure(this.figure);
            this.figure = null;
        }
    }
}