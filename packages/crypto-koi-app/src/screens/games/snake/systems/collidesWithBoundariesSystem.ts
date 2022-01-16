import CollidesWithBoundaries from "../../../../entity-component-system/game-componets/collidesWithBoundaries";
import { containsComponent } from "../../../../entity-component-system/game-componets/containsComponent";
import { gameSystem } from "../../../../entity-component-system/game-componets/gameSystem";
import {
    SnakeGameConfig,
    SnakeGameEvents,
    SnakeGameState,
} from "../snakeGameState";

export const collidesWithBoundariesSystem = gameSystem<
    SnakeGameState,
    SnakeGameEvents
>((entities, { dispatch, time }) => {
    const { head } = entities;
    if (head.timeBasedMovement.lastMovement === time.current) {
        Object.values(entities)
            .filter(containsComponent(CollidesWithBoundaries))
            .forEach((entity) => {
                const { position, collidesWithBoundaries } = entity;
                const { ownSize } = collidesWithBoundaries;
                const [ownWidth, ownHeight] = ownSize;
                const [x, y] = position.getVec2();
                const [
                    gridWidth,
                    gridHeight,
                ] = SnakeGameConfig.GRID_SIZE.getVec2();
                if (
                    y + ownHeight > gridHeight ||
                    x + ownWidth > gridWidth ||
                    x < 0 ||
                    y < 0
                ) {
                    dispatch({ type: "gameOver" });
                }
            });
    }

    return entities;
});
