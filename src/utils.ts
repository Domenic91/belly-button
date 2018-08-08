import {IGameField, IGameCell} from './types'

export const reducer = (id: number, gameField: IGameField): IGameField => {

    const reduceCells:Set<number> = isReducable(id, gameField.width, gameField.height) 
    
    const cells : IGameCell[] = gameField.cells.map((cell : IGameCell ) : IGameCell=>{
        if (reduceCells.has(cell.id) && typeof cell.value === 'number') { 
            return {
                id : cell.id,
                value : cell.value-1,
            }
        }
        return cell;
    });

    return {
        cells,
        width:gameField.width,
        height:gameField.height,
    }
}

const isReducable = (idx : number, width : number, height: number ): Set<number> => {
    const reducers : Set<number> = new Set([idx - width - 1, idx-width, idx-width+1,
                                        idx-1, idx, idx +1, 
                                        idx + width - 1, idx + width, idx + width + 1 ]);

    const isBottom : boolean = ((width * height) - width) >= idx
    const isLeft : boolean = ((idx+1) % width) !== 1
    const isRight : boolean = (idx+1) % width !== 0
    const isTop : boolean = idx < width
    
    if (isBottom){
        reducers.delete (idx + width -1);
        reducers.delete (idx + width);
        reducers.delete (idx + width + 1);
    }

    if (isTop){
        reducers.delete (idx - width -1);
        reducers.delete (idx - width);
        reducers.delete (idx - width + 1);
    }

    if (isLeft){
        if (reducers.has((idx - width - 1))) {
            reducers.delete (idx - width - 1);  
        } 
        reducers.delete (idx - 1);
        if((idx + width - 1)) {
            reducers.delete (idx + width - 1);
        }
    }

    if (isRight){
        if(reducers.has(idx - width + 1)){
            reducers.delete (idx - width + 1);
        }
        reducers.delete (idx + 1);
        if(reducers.has(idx + width + 1)){
            reducers.delete (idx + width + 1);}
    }
    return reducers;
}