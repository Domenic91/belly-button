import { IGameField, IGameCell } from './types'

export const initialize = (width: number, height: number): IGameField => {
    const startID: number = Math.floor((Math.random() * width));
    const max = width * height;
    const min = ((height - 1) * width) + 1;
    const endID: number = Math.floor((Math.random() * (max - min)) + min);
    const cells: IGameCell[] = Array.from({ length: width * height }, (_, idx) => {
        if (idx === startID) {
            return {
                id: idx,
                value: "start",
            };
        } else if (idx === endID) {
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
};

