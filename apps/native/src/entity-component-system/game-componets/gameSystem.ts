import produce from "immer";
import { ReactNode } from "react";
import { GameEngineUpdateEventOptionType } from "react-native-game-engine";
import GameState from "../types";

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
