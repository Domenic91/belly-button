export interface IGameCell {
    id: number,
    value: string | number,
} 

export interface IGameField{
    cells: IGameCell[],
    width: number,
    height: number,
}