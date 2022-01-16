import React, { FunctionComponent, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { GameEngine } from "react-native-game-engine";
import { useTailwind } from "tailwind-rn/dist";
import { HasPosition } from "../../../entity-component-system/game-componets/hasPosition";
import { TimeBasedMovement } from "../../../entity-component-system/game-componets/timeBasedMovement";
import IdGenerator from "../../../entity-component-system/IdGenerator";
import { Controls } from "../../../entity-component-system/input/controls";
import Vec2 from "../../../entity-component-system/Vec2";
import useGameEngine from "../../../hooks/useGameEngine";
import { Food } from "./components/Food";
import { Head } from "./components/Head";
import { Tail } from "./components/Tail";
import {
    SnakeGameConfig,
    SnakeGameEvents,
    SnakeGameStateEntities,
} from "./snakeGameState";
import { timeBasedMovementSystem } from "./systems/timeBasedMovementSystem";
import { collidesWithBoundariesSystem } from "./systems/collidesWithBoundariesSystem";
import { collisionSystem } from "./systems/collisionSystem";
import { consumableSystem } from "./systems/consumableSystem";

const styles = StyleSheet.create({
    container: {
        backgroundColor: "red",
        flex: 1,
    },
});

const entities: SnakeGameStateEntities = {
    food: {
        renderer: <Food />,
        hasPosition: new HasPosition(
            Vec2.random(
                SnakeGameConfig.GRID_SIZE.getX(),
                SnakeGameConfig.GRID_SIZE.getY(),
                SnakeGameConfig.CELL_SIZE
            )
        ),
    },
    head: {
        renderer: <Head />,
        hasPosition: new HasPosition(new Vec2(0, SnakeGameConfig.CELL_SIZE)),
        timeBasedMovement: new TimeBasedMovement(
            Controls.bottom,
            2,
            SnakeGameConfig.CELL_SIZE,
            0
        ),
    },
    tail: {
        renderer: <Tail />,
        elements: [
            {
                hasPosition: new HasPosition(new Vec2(0, 0)),
                id: IdGenerator.randomId(),
            },
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
