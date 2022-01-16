import {
    CollidesWithBoundaries,
    GameEvents,
    gameSystem,
} from "../../../../game-system/gameSystem";
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
    if (head.automaticMovement.lastMovement === time.current) {
        Object.values(entities)
            .filter(
                (entity): entity is CollidesWithBoundaries =>
                    "collidesWithBoundaries" in entity
            )
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
