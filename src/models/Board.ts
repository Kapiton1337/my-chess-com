import {Cell} from "./Cell";
import {Colors} from "./Colors";
import {Pawn} from "./figures/Pawn";
import {King} from "./figures/King";
import {Queen} from "./figures/Queen";
import {Rook} from "./figures/Rook";
import {Knight} from "./figures/Knight";
import {Bishop} from "./figures/Bishop";
import {Figure} from "./figures/Figure";

export class Board {
    cells: Cell[][] = [];
    lostBlackFigures: Figure[] = [];
    lostWhiteFigures: Figure[] = [];

    public initCells() {
        for (let i = 0; i < 8; i++) {
            const row: Cell[] = [];
            for (let j = 0; j < 8; j++) {
                if ((i + j) % 2 !== 0) {
                    row.push(new Cell(this, j, i, Colors.BLACK, null));
                } else {
                    row.push(new Cell(this, j, i, Colors.WHITE, null));
                }
            }
            this.cells.push(row);
        }
    }

    public cleanCellsUnderAttack() {
        for (let i = 0; i < this.cells.length; i++) {
            const row = this.cells[i];
            for (let j = 0; j < row.length; j++) {
                const target = row[j];
                target.underAttackWhite = false;
                target.underAttackBlack = false;
            }
        }
    }

    public beatCellsFigure(figure: Figure){
        for (let k = 0; k < this.cells.length; k++) {
            const rowCells = this.cells[k];
            for (let l = 0; l < rowCells.length; l++) {
                const cell = rowCells[l];
                figure.color === Colors.WHITE ? (cell.underAttackWhite = !cell.underAttackWhite ? figure.canBeat(cell) : true) :
                    (cell.underAttackBlack = !cell.underAttackBlack ? figure.canBeat(cell) : true);
            }
        }
    }

    public updateCellsUnderAttack() {
        this.cleanCellsUnderAttack();
        for (let i = 0; i < this.cells.length; i++) {
            const row = this.cells[i];
            for (let j = 0; j < row.length; j++) {
                const target = row[j];
                if (target.figure) {
                    this.beatCellsFigure(target.figure);
                }
            }
        }
    }

    public highlightCells(selectedCell: Cell | null) {
        this.updateCellsUnderAttack();
        for (let i = 0; i < this.cells.length; i++) {
            const row = this.cells[i];
            for (let j = 0; j < row.length; j++) {
                const target = row[j];
                target.available = !!selectedCell?.figure?.canMove(target);
            }
        }
    }

    public getCopyBoard(): Board {
        const newBoard = new Board();
        newBoard.cells = this.cells;
        newBoard.lostWhiteFigures = this.lostWhiteFigures;
        newBoard.lostBlackFigures = this.lostBlackFigures;
        return newBoard;
    }

    public getCell(x: number, y: number) {
        return this.cells[x][y];
    }

    private addPawns() {
        for (let i = 0; i < 8; i++) {
            new Pawn(Colors.BLACK, this.getCell(1, i));
            new Pawn(Colors.WHITE, this.getCell(6, i));
        }
    }

    private addKings() {
        new King(Colors.BLACK, this.getCell(0, 4));
        new King(Colors.WHITE, this.getCell(7, 4));
    }

    private addQueens() {
        new Queen(Colors.BLACK, this.getCell(0, 3));
        new Queen(Colors.WHITE, this.getCell(7, 3));
    }

    private addRooks() {
        new Rook(Colors.BLACK, this.getCell(0, 0));
        new Rook(Colors.BLACK, this.getCell(0, 7));
        new Rook(Colors.WHITE, this.getCell(7, 0));
        new Rook(Colors.WHITE, this.getCell(7, 7));
    }

    private addKnights() {
        new Knight(Colors.BLACK, this.getCell(0, 1));
        new Knight(Colors.BLACK, this.getCell(0, 6));
        new Knight(Colors.WHITE, this.getCell(7, 1));
        new Knight(Colors.WHITE, this.getCell(7, 6));
    }

    private addBishops() {
        new Bishop(Colors.BLACK, this.getCell(0, 2));
        new Bishop(Colors.BLACK, this.getCell(0, 5));
        new Bishop(Colors.WHITE, this.getCell(7, 2));
        new Bishop(Colors.WHITE, this.getCell(7, 5));
    }

    public addFigures() {
        this.addPawns();
        this.addKings();
        this.addQueens();
        this.addRooks();
        this.addKnights();
        this.addBishops();
    }
}