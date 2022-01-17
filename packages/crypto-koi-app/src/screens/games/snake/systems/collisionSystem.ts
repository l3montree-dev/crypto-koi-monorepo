import { gameSystem } from "../../../../entity-component-system/game-componets/gameSystem";
import { SnakeGameEvents, SnakeGameState } from "../snakeGameState";

/**
 * Concrete collisionSystem which uses properties of the game state to check if the
 * head did collide with a tail element.
 */
export const collisionSystem = gameSystem<SnakeGameState, SnakeGameEvents>(
    (entities, { dispatch, time }) => {
        const { head, tail } = entities;
        if (head.timeBasedMovement.movedInThisFrame(time.current)) {
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
