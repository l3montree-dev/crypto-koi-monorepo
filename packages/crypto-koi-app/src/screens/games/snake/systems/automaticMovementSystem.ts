import {
    AutomaticMovement,
    Controls,
    GameEvents,
    gameSystem,
} from "../../../../game-system/gameSystem";
import {
    SnakeGameConfig,
    SnakeGameEvents,
    SnakeGameState,
} from "../snakeGameState";

export const automaticMovementSystem = gameSystem<
    SnakeGameState,
    SnakeGameEvents
>((entities, { time, events, dispatch }) => {
    // check if a step needs to be made.
    Object.values(entities)
        .filter(
            (entity: any): entity is AutomaticMovement =>
                "automaticMovement" in entity
        )
        .forEach((entity) => {
            // check if an event needs to be processed.
            events.forEach((event) => {
                if (Object.values(Controls).includes(event as Controls)) {
                    // check if the event is valid.
                    switch (entity.automaticMovement.currentDirection) {
                        case Controls.left:
                            if (event === Controls.right) {
                                entity.automaticMovement.currentDirection =
                                    Controls.top;
                            } else {
                                // can only be left
                                entity.automaticMovement.currentDirection =
                                    Controls.bottom;
                            }
                            break;
                        case Controls.right:
                            if (event === Controls.left) {
                                entity.automaticMovement.currentDirection =
                                    Controls.top;
                            } else {
                                // can only be right
                                entity.automaticMovement.currentDirection =
                                    Controls.bottom;
                            }
                            break;
                        case Controls.bottom:
                            if (event === Controls.left) {
                                entity.automaticMovement.currentDirection =
                                    Controls.right;
                            } else {
                                // can only be right
                                entity.automaticMovement.currentDirection =
                                    Controls.left;
                            }
                            break;
                        default:
                            // can only be top or bottom
                            entity.automaticMovement.currentDirection = event as Controls;
                            break;
                    }
                }
            });
            // check if enough time has passed since the last movement
            if (
                time.current - entity.automaticMovement.lastMovement >
                1000 / entity.automaticMovement.speed
            ) {
                // update the last movement timestamp
                entity.automaticMovement.lastMovement = time.current;
                // get the current direction
                const currentDirection =
                    entity.automaticMovement.currentDirection;
                // calculate the new position
                switch (currentDirection) {
                    case Controls.left:
                        entity.position[0] -= entity.automaticMovement.stepSize;
                        break;
                    case Controls.right:
                        entity.position[0] += entity.automaticMovement.stepSize;
                        break;
                    case Controls.top:
                        entity.position[1] -= entity.automaticMovement.stepSize;
                        break;
                    case Controls.bottom:
                        entity.position[1] += entity.automaticMovement.stepSize;
                        break;
                }
            }
        });
    return entities;
});
