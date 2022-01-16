import { gameSystem } from "../../../../game-system/gameSystem";
import IdGenerator from "../../../../game-system/IdGenerator";
import Vec2 from "../../../../game-system/Vec2";
import {
    SnakeGameConfig,
    SnakeGameEvents,
    SnakeGameState,
} from "../snakeGameState";

export const consumableSystem = gameSystem<SnakeGameState, SnakeGameEvents>(
    (entities, { time }) => {
        const { food, head, tail } = entities;
        if (head.automaticMovement.lastMovement === time.current) {
            tail.elements.push({
                position: head.position,
                id: IdGenerator.randomId(),
            });

            if (food.position.equals(head.position)) {
                // the head is on the same position as the food
                // do not pop the last tail element
                food.position = Vec2.random(
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
