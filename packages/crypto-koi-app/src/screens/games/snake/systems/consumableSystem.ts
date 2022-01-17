import { gameSystem } from "../../../../entity-component-system/game-componets/gameSystem";
import { HasPosition } from "../../../../entity-component-system/game-componets/HasPosition";
import IdGenerator from "../../../../entity-component-system/IdGenerator";
import Vec2 from "../../../../entity-component-system/Vec2";
import {
    SnakeGameConfig,
    SnakeGameEvents,
    SnakeGameState,
} from "../snakeGameState";

export const consumableSystem = gameSystem<SnakeGameState, SnakeGameEvents>(
    (entities, { time, dispatch }) => {
        const { food, head, tail } = entities;
        if (head.timeBasedMovement.moved(time.current)) {
            // build a new tail element
            tail.elements.unshift({
                position: new HasPosition(head.position.p),
                id: IdGenerator.randomId(),
            });

            if (
                food.position.p
                    .getRectangle()
                    .equals(head.position.p.getRectangle()) ||
                food.position.p
                    .getRectangle()
                    .overlaps(head.position.p.getRectangle())
            ) {
                dispatch({ type: "score", value: 1 });
                // the head is on the same position as the food
                // do not pop the last tail element
                food.position.p.coords = Vec2.random(
                    SnakeGameConfig.GRID_SIZE.getX(),
                    SnakeGameConfig.GRID_SIZE.getY(),
                    SnakeGameConfig.CELL_SIZE
                );
            } else {
                tail.elements.pop();
            }
        }
        return entities;
    }
);
