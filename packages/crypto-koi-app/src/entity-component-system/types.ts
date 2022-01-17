import React from "react";
import { GameEngineProperties } from "react-native-game-engine";

export type Entity = {
    id: string;
    renderer?: React.ReactNode;
    elements?: Entity[];
    [key: string]: unknown;
};

export type UnrenderedEntity = {
    id: string;
    [key: string]: unknown;
};
export default interface GameState<Entities extends { [key: string]: any }>
    extends GameEngineProperties {
    entities: Entities;
}

export enum Controls {
    left,
    right,
    top,
    bottom,
}

export type GameEvents =
    | {
          type: "gameOver";
      }
    | {
          type: "controls";
          value: Controls;
      };
