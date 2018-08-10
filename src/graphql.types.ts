import { IGameField, IGameCell } from './types';

export type GameFieldQuery = {
  gameField: IGameField;
  clicks: number;
};

export type CallCellMutation = (id: number | string) => IGameCell[];
