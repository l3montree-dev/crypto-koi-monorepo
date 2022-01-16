import { gameSystem } from "../../../../entity-component-system/game-componets/gameSystem";
import { HasPosition } from "../../../../entity-component-system/game-componets/hasPosition";
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
            tail.elements.unshift({
                hasPosition: new HasPosition(head.hasPosition.position),
                id: IdGenerator.randomId(),
            });

            if (food.hasPosition.position.equals(head.hasPosition.position)) {
                dispatch({ type: "score", value: 1 });
                // the head is on the same position as the food
                // do not pop the last tail element
                food.hasPosition.position = Vec2.random(
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
