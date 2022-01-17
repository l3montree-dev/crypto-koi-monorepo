import { gameSystem } from "../../../../entity-component-system/game-componets/gameSystem";
import { SnakeGameEvents, SnakeGameState } from "../snakeGameState";

export const collisionSystem = gameSystem<SnakeGameState, SnakeGameEvents>(
    (entities, { dispatch, time }) => {
        const { head, tail } = entities;
        if (head.timeBasedMovement.moved(time.current)) {
            const { position: headPosition } = head;
            const { elements: tailElements } = tail;
            if (
                tailElements.some((el) =>
                    el.position.p
                        .getRectangle()
                        .overlaps(headPosition.p.getRectangle())
                )
            ) {
                dispatch({ type: "gameOver" });
            }
        }
        return entities;
    }
);
