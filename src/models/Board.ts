import {Cell} from "./Cell";
import {Colors} from "./Colors";
import {Pawn} from "./figures/Pawn";
import {King} from "./figures/King";
import {Queen} from "./figures/Queen";
import {Rook} from "./figures/Rook";
import {Knight} from "./figures/Knight";
import {Bishop} from "./figures/Bishop";
import {Figure, FigureNames} from "./figures/Figure";

export class Board {
    cells: Cell[][] = [];
    figures: { black: Figure[], white: Figure[] } = {black: [], white: []};
    lostBlackFigures: Figure[] = [];
    lostWhiteFigures: Figure[] = [];
    figuresBeatKings: {black: Figure[], white: Figure[]} = {black: [], white: []};

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

    public checkIfCanBeat(figure: Figure) {
        for (let rowCells of this.cells) {
            for (let cell of rowCells) {
                if (figure.canBeat(cell)) {
                    figure.addCellCanAttack(cell);
                    cell.addBeatCellFigure(figure);
                }
            }
        }
    }

    public clearIfCanBeat() {
        for (let row of this.cells) {
            for (let cell of row) {
                cell.clearBeatCellFigure();
                cell.figure?.clearCellCanAttack();
            }
        }
    }

    public setBeatCells() {
        let allFigures = [...this.figures.white, ...this.figures.black];
        this.clearIfCanBeat();
        allFigures.forEach(figure => {
            this.checkIfCanBeat(figure);
        })
        this.checkIsWhiteKingUnderAttack();
        this.checkIsBlackKingUnderAttack();
    }

    public checkIsWhiteKingUnderAttack() {
        for (let figure of this.figures.white) {
            if (figure.name === FigureNames.KING) {
                if (figure.cell.isUnderAttackBlack()) {
                    figure.setWhiteKingUnderCheck();
                    this.figuresBeatKings.white=[...figure.cell.beatCellFigures.black];
                } else {
                    figure.removeWhiteKingUnderCheck();
                    this.figuresBeatKings.white=[];
                }
            }
        }
    }

    public checkIsBlackKingUnderAttack() {
        for (let figure of this.figures.black) {
            if (figure.name === FigureNames.KING) {
                if (figure.cell.isUnderAttackWhite()) {
                    figure.setBlackKingUnderCheck();
                    this.figuresBeatKings.black=[...figure.cell.beatCellFigures.white];
                } else {
                    figure.removeBlackKingUnderCheck();
                    this.figuresBeatKings.black=[];
                }
            }
        }
    }

    public highlightCells(selectedCell: Cell | null) {
        for (let i = 0; i < this.cells.length; i++) {
            const row = this.cells[i];
            for (let j = 0; j < row.length; j++) {
                const target = row[j];
                target.available = !!selectedCell?.figure?.canMove(target, this.figuresBeatKings);
            }
        }
    }

    public getCopyBoard(): Board {
        const newBoard = new Board();
        newBoard.figures = {black: [...this.figures.black], white: [...this.figures.white]}
        newBoard.cells = this.cells;
        newBoard.lostWhiteFigures = this.lostWhiteFigures;
        newBoard.lostBlackFigures = this.lostBlackFigures;
        newBoard.figuresBeatKings = this.figuresBeatKings;
        return newBoard;
    }

    public getCell(x: number, y: number) {
        return this.cells[x][y];
    }

    private addPawns() {
        for (let i = 0; i < 8; i++) {
            this.figures.black.push(new Pawn(Colors.BLACK, this.getCell(1, i)));
            this.figures.white.push(new Pawn(Colors.WHITE, this.getCell(6, i)));
        }
    }

    private addKings() {
        this.figures.black.push(new King(Colors.BLACK, this.getCell(0, 4)));
        this.figures.white.push(new King(Colors.WHITE, this.getCell(7, 4)));
    }

    private addQueens() {
        this.figures.black.push(new Queen(Colors.BLACK, this.getCell(0, 3)));
        this.figures.white.push(new Queen(Colors.WHITE, this.getCell(7, 3)));
    }

    private addRooks() {
        this.figures.black.push(new Rook(Colors.BLACK, this.getCell(0, 0)));
        this.figures.black.push(new Rook(Colors.BLACK, this.getCell(0, 7)));
        this.figures.white.push(new Rook(Colors.WHITE, this.getCell(7, 0)));
        this.figures.white.push(new Rook(Colors.WHITE, this.getCell(7, 7)));
    }

    private addKnights() {
        this.figures.black.push(new Knight(Colors.BLACK, this.getCell(0, 1)));
        this.figures.black.push(new Knight(Colors.BLACK, this.getCell(0, 6)));
        this.figures.white.push(new Knight(Colors.WHITE, this.getCell(7, 1)));
        this.figures.white.push(new Knight(Colors.WHITE, this.getCell(7, 6)));
    }

    private addBishops() {
        this.figures.black.push(new Bishop(Colors.BLACK, this.getCell(0, 2)));
        this.figures.black.push(new Bishop(Colors.BLACK, this.getCell(0, 5)));
        this.figures.white.push(new Bishop(Colors.WHITE, this.getCell(7, 2)));
        this.figures.white.push(new Bishop(Colors.WHITE, this.getCell(7, 5)));
    }

    public addFigures() {
        this.addPawns();
        this.addKings();
        this.addQueens();
        this.addRooks();
        this.addKnights();
        this.addBishops();
        this.setBeatCells();
    }
}