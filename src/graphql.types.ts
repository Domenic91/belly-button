import { IGameField, IGameCell } from './types';

export type GameFieldQuery = {
  gameField: IGameField;
};

export type CallCellMutation = (id: number | string) => IGameCell[];
