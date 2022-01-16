import { gameSystem } from "../../../../game-system/gameSystem";
import { SnakeGameEvents, SnakeGameState } from "../snakeGameState";

export const collisionSystem = gameSystem<SnakeGameState, SnakeGameEvents>(
    (entities, { dispatch, time }) => {
        const { head, tail } = entities;
        if (head.automaticMovement.lastMovement === time.current) {
            const { position: headPosition } = head;
            const { elements: tailElements } = tail;
            if (tailElements.some((el) => el.position.equals(headPosition))) {
                dispatch({ type: "gameOver" });
            }
        }
        return entities;
    }
);
