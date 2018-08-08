import { IGameField, IGameCell } from "./types";

export type GameFieldQuery = {
  data: IGameField;
};

export type CallCellMutation = (id: number | string) => IGameCell[];
