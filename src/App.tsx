import React, {useEffect, useState} from 'react';
import "./App.css";
import BoardComponent from "./components/BoardComponent";
import {Board} from "./models/Board";
import {Player} from "./models/Player";
import {Colors} from "./models/Colors";
import LostFigures from "./components/LostFigures";
import Timer from "./components/Timer";
import {Figure} from "./models/figures/Figure";

function App() {
    const [board, setBoard] = useState(new Board());
    const [whitePlayer, setWhitePlayer] = useState(new Player(Colors.WHITE));
    const [blackPlayer, setBlackPlayer] = useState(new Player(Colors.BLACK));

    const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);

    useEffect(() => {
        setCurrentPlayer(new Player(Colors.WHITE));
        restart();
    }, [])

    function restart() {
        const newBoard = new Board();
        newBoard.initCells();
        newBoard.addFigures();
        setCurrentPlayer(new Player(Colors.WHITE));
        setBoard(newBoard);
    }
    function setBeatCells(){
        board.setBeatCells();
    }

    function swapPlayer() {
        setCurrentPlayer(currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer);
    }

    return (
        <div className="App">
            <Timer currentPlayer={currentPlayer} restart={restart}/>
            <BoardComponent
                board={board}
                setBoard={setBoard}
                currentPlayer={currentPlayer}
                setBeatCells={setBeatCells}
                swapPlayer={swapPlayer}
            />
            <div>
                <LostFigures
                    title="Черные фигуры"
                    figures={board.lostBlackFigures}/>
                <LostFigures
                    title="Белые фигуры"
                    figures={board.lostWhiteFigures}/>
            </div>
        </div>
    );
}

export default App;
