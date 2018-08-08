export interface GameCellInterface {
    id: number,
    value: string | number,
} 

export interface GameFieldInterface {
    cells: GameCellInterface[],
    width: number,
    height: number,
}