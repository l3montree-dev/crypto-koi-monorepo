import { Dimensions } from "react-native";
import GameState from "../../../game-system/gameState";
import { Drawable, GameEvents } from "../../../game-system/gameSystem";
import Vec2 from "../../../game-system/Vec2";
import { FoodEntity } from "./components/Food";
import { HeadEntity } from "./components/Head";
import { TailEntity } from "./components/Tail";

export interface SnakeGameStateEntities {
    food: Drawable<FoodEntity>;
    head: Drawable<HeadEntity>;
    tail: Drawable<TailEntity>;
}

export type SnakeGameState = GameState<SnakeGameStateEntities>;

export type SnakeGameEvents = GameEvents | { type: "score"; value: number };

export const SnakeGameConfig = {
    CELL_SIZE: Dimensions.get("window").width / 20,
    GRID_SIZE: new Vec2(
        Dimensions.get("window").width,
        Dimensions.get("window").width
    ),
};
