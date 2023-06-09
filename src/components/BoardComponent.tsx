import React, {FC, useEffect, useState} from 'react';
import {Board} from "../models/Board";
import CellComponent from "./CellComponent";
import {Cell} from "../models/Cell";
import {Player} from "../models/Player";
import {Colors} from "../models/Colors";
import {Figure} from "../models/figures/Figure";

interface BoardProps {
    board: Board;
    setBoard: (board: Board) => void;
    currentPlayer: Player | null;
    setBeatCells: () => void;
    swapPlayer: () => void;
}

const BoardComponent: FC<BoardProps> = ({board, setBoard, currentPlayer, swapPlayer, setBeatCells}) => {
    const [selectedCell, setSelectedCell] = useState<Cell | null>(null);

    function click(cell: Cell) {
        if (selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell, board.figuresBeatKings)) {
            selectedCell.moveFigure(cell);
            swapPlayer();
            setSelectedCell(null);
            setBeatCells();
        } else {
            if (cell.figure?.color === currentPlayer?.color)
                setSelectedCell(cell);

        }
    }

    useEffect(() => {
        highlightCells();
    }, [selectedCell])

    function highlightCells() {
        board.highlightCells(selectedCell);
        updateBoard();
    }

    function updateBoard() {
        const newBoard = board.getCopyBoard();
        setBoard(newBoard);
    }

    return (
        <>
            <h3>
                Текущий игрок {currentPlayer?.color === Colors.WHITE ? "Белый" : "Черный"}
            </h3>
            <div className="board">
                {board.cells.map((row, index) =>
                    <React.Fragment key={index}>
                        {row.map((cell) =>
                            <CellComponent
                                click={click}
                                cell={cell}
                                key={cell.id}
                                selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y}
                            />)}
                    </React.Fragment>
                )}
            </div>
        </>
    );
};

export default BoardComponent;