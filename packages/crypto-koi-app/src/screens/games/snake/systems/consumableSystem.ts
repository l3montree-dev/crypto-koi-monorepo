import { gameSystem } from "../../../../game-system/gameSystem";
import { randomPosition } from "../../../../game-system/utils";
import { Tail } from "../components/Tail";
import {
    SnakeGameConfig,
    SnakeGameEvents,
    SnakeGameState,
} from "../snakeGameState";

export const consumableSystem = gameSystem<SnakeGameState, SnakeGameEvents>(
    (entities, { time, dispatch }) => {
        const { food, head, tail } = entities;
        if (head.automaticMovement.lastMovement === time.current) {
            tail.positions.push(head.position);
            if (
                food.position[0] === head.position[0] &&
                food.position[1] === head.position[1]
            ) {
                // the head is on the same position as the food
                // do not pop the last tail element
                food.position = randomPosition(
                    SnakeGameConfig.GRID_SIZE[0],
                    SnakeGameConfig.GRID_SIZE[1],
                    SnakeGameConfig.CELL_SIZE
                );
            } else {
                console.log(
                    food.position[0],
                    head.position[0],
                    food.position[1],
                    head.position[1]
                );
                tail.positions.pop();
            }
        }
        return entities;
    }
);
