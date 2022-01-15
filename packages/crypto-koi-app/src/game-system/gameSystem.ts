import produce from "immer";
import { GameLoopUpdateEventOptionType } from "react-native-game-engine";
import GameState from "./gameState";

/**
 * Wrapper function to wrap a game system fn.
 */
export type GameSystem<T extends GameState<any>> = (
    entities: T["entities"],
    input: GameLoopUpdateEventOptionType
) => T["entities"];

export const gameSystem = <T extends GameState<any>>(system: GameSystem<T>) => {
    return produce(system);
};
