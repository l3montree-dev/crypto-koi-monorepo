import { Dimensions } from "react-native";
import { Drawable } from "../../../entity-component-system/game-componets/gameSystem";
import GameState from "../../../entity-component-system/game-state/gameState";

import { GameEvents } from "../../../entity-component-system/input/gameEvents";
import Vec2 from "../../../entity-component-system/Vec2";
import { FoodEntity } from "./components/Food";
import { HeadEntity } from "./components/Head";
import { TailEntity } from "./components/Tail";

export interface SnakeGameStateEntities {
    food: Drawable<FoodEntity>;
    head: Drawable<HeadEntity>;
    tail: Drawable<TailEntity>;
}

export type SnakeGameState = GameState<SnakeGameStateEntities>;

// global game events plus a score event.
export type SnakeGameEvents = GameEvents | { type: "score"; value: number };

export const SnakeGameConfig = {
    CELL_SIZE: Dimensions.get("window").width / 15,
    GRID_SIZE: new Vec2(
        Dimensions.get("window").width,
        Dimensions.get("window").width
    ),
};
