import produce from "immer";
import { ReactNode } from "react";
import { GameEngineUpdateEventOptionType } from "react-native-game-engine";
import GameState from "./gameState";
import Vec2 from "./Vec2";

/**
 * Wrapper function to wrap a game system fn.
 * The events type describes the possible input events.
 */
export type GameSystem<T extends GameState<any>, Events> = (
    entities: T["entities"],
    input: Omit<GameEngineUpdateEventOptionType, "events"> & {
        events: Array<Events>;
    }
) => T["entities"];

export const gameSystem = <T extends GameState<any>, Events>(
    system: GameSystem<T, Events>
) => {
    return produce(system);
};

// define some default game systems usable by any specific game
export type Drawable<T> = T & {
    renderer: ReactNode;
};
export interface HasPosition {
    position: Vec2;
}

export interface AutomaticMovement extends HasPosition {
    automaticMovement: {
        currentDirection: Controls;
        // how many steps per second
        speed: number;
        stepSize: number;
        // timestamp when the last movement did occur
        lastMovement: number;
    };
}
export interface CollidesWithBoundaries extends HasPosition {
    collidesWithBoundaries: {
        ownSize: [number, number];
    };
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
