import CollidesWithBoundaries from "../../../../entity-component-system/game-componets/CollidesWithBoundaries";
import { containsComponent } from "../../../../entity-component-system/game-componets/containsComponent";
import { gameSystem } from "../../../../entity-component-system/game-componets/gameSystem";
import { HasPosition } from "../../../../entity-component-system/game-componets/HasPosition";
import { SnakeGameEvents, SnakeGameState } from "../snakeGameState";

export const collidesWithBoundariesSystem = gameSystem<
    SnakeGameState,
    SnakeGameEvents
>((entities, { dispatch, time }) => {
    const { head } = entities;
    if (head.timeBasedMovement.lastMovement === time.current) {
        (Object.values(entities) as unknown[])
            .filter(containsComponent(CollidesWithBoundaries))
            .filter(containsComponent(HasPosition))
            .forEach((entity) => {
                const { position, collidesWithBoundaries } = entity;
                if (collidesWithBoundaries.checkForCollision(position.p)) {
                    dispatch({ type: "gameOver" });
                }
            });
    }

    return entities;
});
