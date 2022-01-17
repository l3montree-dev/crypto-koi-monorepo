import React, { FunctionComponent, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { GameEngine } from "react-native-game-engine";
import { useTailwind } from "tailwind-rn/dist";
import CollidesWithBoundaries from "../../../entity-component-system/game-componets/CollidesWithBoundaries";
import { GameEntityBuilder } from "../../../entity-component-system/game-componets/GameEntityBuilder";
import { HasPosition } from "../../../entity-component-system/game-componets/HasPosition";
import { TimeBasedMovement } from "../../../entity-component-system/game-componets/TimeBasedMovement";
import IdGenerator from "../../../entity-component-system/IdGenerator";
import { Controls } from "../../../entity-component-system/input/controls";
import Position from "../../../entity-component-system/Position";
import Vec2 from "../../../entity-component-system/Vec2";
import Rectangle from "../../../entity-component-system/Rectangle";
import useGameEngine from "../../../hooks/useGameEngine";
import { Food } from "./components/Food";
import { Head } from "./components/Head";
import { Tail } from "./components/Tail";
import {
    SnakeGameConfig,
    SnakeGameEvents,
    SnakeGameStateEntities,
} from "./snakeGameState";
import { collidesWithBoundariesSystem } from "./systems/collidesWithBoundariesSystem";
import { collisionSystem } from "./systems/collisionSystem";
import { consumableSystem } from "./systems/consumableSystem";
import { timeBasedMovementSystem } from "./systems/timeBasedMovementSystem";

const styles = StyleSheet.create({
    container: {
        backgroundColor: "red",
        flex: 1,
    },
});

const cellWidthAndHeight = new Vec2(
    SnakeGameConfig.CELL_SIZE,
    SnakeGameConfig.CELL_SIZE
);
const entities: SnakeGameStateEntities = {
    food: new GameEntityBuilder({
        renderer: <Food />,
        id: IdGenerator.randomId(),
    })
        .attach(
            new HasPosition(
                new Position(
                    Vec2.random(
                        SnakeGameConfig.GRID_SIZE.getX(),
                        SnakeGameConfig.GRID_SIZE.getY(),
                        SnakeGameConfig.CELL_SIZE
                    ),
                    cellWidthAndHeight
                )
            )
        )
        .eject(),
    head: new GameEntityBuilder({
        renderer: <Head />,
        id: IdGenerator.randomId(),
    })
        .attach(
            new CollidesWithBoundaries(
                new Rectangle(new Vec2(0, 0), SnakeGameConfig.GRID_SIZE)
            )
        )
        .attach(
            new HasPosition(
                new Position(
                    new Vec2(0, SnakeGameConfig.CELL_SIZE),
                    cellWidthAndHeight
                )
            )
        )
        .attach(
            new TimeBasedMovement(
                Controls.bottom,
                2,
                SnakeGameConfig.CELL_SIZE,
                0
            )
        )
        .eject(),
    tail: {
        renderer: <Tail />,
        elements: [
            new GameEntityBuilder({
                id: IdGenerator.randomId(),
            })
                .attach(
                    new HasPosition(
                        new Position(new Vec2(0, 0), cellWidthAndHeight)
                    )
                )
                .eject(),
        ],
    },
};

const SnakeGameScreen: FunctionComponent = () => {
    const {
        engine,
        isRunning,
        setIsRunning,
    } = useGameEngine<SnakeGameEvents>();
    const tailwind = useTailwind();
    const [score, setScore] = useState(0);
    const handleLeft = () => {
        engine.current?.dispatch({ type: "controls", value: Controls.left });
    };

    const handleRight = () => {
        engine.current?.dispatch({ type: "controls", value: Controls.right });
    };

    const handleReset = () => {
        engine.current?.swap(entities);
        setIsRunning(true);
    };

    return (
        <View style={tailwind("flex-1")}>
            <GameEngine
                ref={engine}
                style={styles.container}
                running={isRunning}
                onEvent={(event: SnakeGameEvents) => {
                    if (event.type === "gameOver") {
                        setIsRunning(false);
                    } else if (event.type === "score") {
                        setScore((prev) => prev + event.value);
                    }
                }}
                systems={[
                    // provide the boundaries of the snake game
                    timeBasedMovementSystem,
                    collidesWithBoundariesSystem,
                    collisionSystem,
                    consumableSystem,
                ]}
                entities={entities}
            />

            <View style={tailwind("flex-1 flex-row")}>
                <Button title="Left" onPress={handleLeft} />
                <Button title="Right" onPress={handleRight} />
                <Button title="Reset" onPress={handleReset} />
                <Text>IsRunning: {isRunning.toString()}</Text>
                <Text>Score: {score.toString()}</Text>
            </View>
        </View>
    );
};

export default SnakeGameScreen;
