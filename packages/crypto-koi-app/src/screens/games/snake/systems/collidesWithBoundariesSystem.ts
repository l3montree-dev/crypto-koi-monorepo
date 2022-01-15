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
>((entities, { dispatch }) => {
    Object.values(entities)
        .filter(
            (entity): entity is CollidesWithBoundaries =>
                "collidesWithBoundaries" in entity
        )
        .forEach((entity) => {
            const { position, collidesWithBoundaries } = entity;
            const { ownSize } = collidesWithBoundaries;
            const [ownWidth, ownHeight] = ownSize;
            const [x, y] = position;
            const [gridWidth, gridHeight] = SnakeGameConfig.GRID_SIZE;
            if (
                y + ownHeight > gridHeight ||
                x + ownWidth > gridWidth ||
                x < 0 ||
                y < 0
            ) {
                dispatch(GameEvents.gameOver);
            }
        });
    return entities;
});
