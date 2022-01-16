import { gameSystem } from "../../../../game-system/gameSystem";
import { SnakeGameEvents, SnakeGameState } from "../snakeGameState";

export const collisionSystem = gameSystem<SnakeGameState, SnakeGameEvents>(
    (entities, { dispatch, time }) => {
        const { head, tail } = entities;
        if (head.automaticMovement.lastMovement === time.current) {
            const { position: headPosition } = head;
            const { positions: tailPositions } = tail;
            const headX = headPosition[0];
            const headY = headPosition[1];
            const tailPositionsX = tailPositions.map((position) => position[0]);
            const tailPositionsY = tailPositions.map((position) => position[1]);
            if (
                tailPositionsX.includes(headX) &&
                tailPositionsY.includes(headY)
            ) {
                dispatch({ type: "gameOver" });
            }
        }
        return entities;
    }
);
