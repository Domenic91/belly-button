export interface GameCell {
    id: number,
    value: string | number,
} 

export interface GameField{
    cells: GameCell[],
    width: number,
    height: number,
}