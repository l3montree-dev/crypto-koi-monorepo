import { containsComponent } from "../../../../entity-component-system/containsComponent";
import { gameSystem } from "../../../../entity-component-system/game-componets/gameSystem";
import { HasPosition } from "../../../../entity-component-system/game-componets/HasPosition";
import { TimeBasedMovement } from "../../../../entity-component-system/game-componets/TimeBasedMovement";
import { Controls } from "../../../../entity-component-system/types";

import { SnakeGameEvents, SnakeGameState } from "../snakeGameState";

export const timeBasedMovementSystem = gameSystem<
    SnakeGameState,
    SnakeGameEvents
>((entities, { time, events }) => {
    // check if a step needs to be made.
    (Object.values(entities) as unknown[])
        .filter(containsComponent(TimeBasedMovement))
        .filter(containsComponent(HasPosition))
        .forEach((entity) => {
            // check if an event needs to be processed.
            events.forEach((event) => {
                if (event.type === "controls") {
                    // check if the event is valid.
                    switch (entity.timeBasedMovement.currentDirection) {
                        case Controls.left:
                            if (event.value === Controls.right) {
                                entity.timeBasedMovement.currentDirection =
                                    Controls.top;
                            } else {
                                // can only be left
                                entity.timeBasedMovement.currentDirection =
                                    Controls.bottom;
                            }
                            break;
                        case Controls.right:
                            if (event.value === Controls.left) {
                                entity.timeBasedMovement.currentDirection =
                                    Controls.top;
                            } else {
                                // can only be right
                                entity.timeBasedMovement.currentDirection =
                                    Controls.bottom;
                            }
                            break;
                        case Controls.bottom:
                            if (event.value === Controls.left) {
                                entity.timeBasedMovement.currentDirection =
                                    Controls.right;
                            } else {
                                // can only be right
                                entity.timeBasedMovement.currentDirection =
                                    Controls.left;
                            }
                            break;
                        default:
                            // can only be top or bottom
                            entity.timeBasedMovement.currentDirection =
                                event.value;
                            break;
                    }
                }
            });
            // check if enough time has passed since the last movement
            if (
                time.current - entity.timeBasedMovement.lastMovement >
                1000 / entity.timeBasedMovement.speed
            ) {
                // update the last movement timestamp
                entity.timeBasedMovement.lastMovement = time.current;
                // get the current direction
                const currentDirection =
                    entity.timeBasedMovement.currentDirection;
                // calculate the new position
                switch (currentDirection) {
                    case Controls.left:
                        entity.position.p = entity.position.p.moveX(
                            -entity.timeBasedMovement.stepSize
                        );
                        break;
                    case Controls.right:
                        entity.position.p = entity.position.p.moveX(
                            entity.timeBasedMovement.stepSize
                        );
                        break;
                    case Controls.top:
                        entity.position.p = entity.position.p.moveY(
                            -entity.timeBasedMovement.stepSize
                        );
                        break;
                    case Controls.bottom:
                        entity.position.p = entity.position.p.moveY(
                            entity.timeBasedMovement.stepSize
                        );
                        break;
                }
            }
        });
    return entities;
});
