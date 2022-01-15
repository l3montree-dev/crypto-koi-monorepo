import GameState from "../../../game-system/gameState";

export interface SnakeGameStateEntities {
    "0": { position: [number, number] };
    "1": { position: [number, number] };
    "2": { position: [number, number] };
    "3": { position: [number, number] };
    "4": { position: [number, number] };
}

export type SnakeGameState = GameState<SnakeGameStateEntities>;
