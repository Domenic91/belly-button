import {GameField, GameCell} from './types'

const initialize = (width : number, height : number): GameField => {
    const startID : number = Math.floor((Math.random() * width));
    const endID : number = Math.floor((Math.random() * width * height) + (((height - 1) * width) + 1));
    const cells : GameCell[] = Array.from({ length: width * height }, (_, idx) => {
        if (idx === startID){
            return { 
                id: idx,
                value: "start",
            };
        }else if (idx === endID){
            return { 
                id: idx,
                value: "end",
            }; 
        }
        return { 
            id: idx,
            value: Math.floor((Math.random() * 9) + 1),
        };
    });

   return {
       cells,
       width,
       height,
    }
}

