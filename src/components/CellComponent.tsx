import React, {FC} from 'react';
import {Cell} from "../models/Cell";

interface cellProps {
    cell: Cell;
    selected: boolean;
    click: (cell: Cell) => void;
}

const CellComponent: FC<cellProps> = ({click, cell, selected}) => {
    return (
        <div className={['cell', cell.color, selected ? "selected" : ''].join(' ')}
             onClick={() => click(cell)}
             style={{background: cell.available && cell.figure ? 'green' : ''}}>
            {cell.figure?.logo && <img src={cell.figure.logo} alt=""/>}
            {cell.available && !cell.figure ? <div className="available"></div> : ''}
            {cell.isUnderAttackWhite() && !cell.figure ? <div className="attackw"></div> : ''}
            {cell.isUnderAttackBlack() && !cell.figure ? <div className="attackb"></div> : ''}
        </div>
    );
};

export default CellComponent;