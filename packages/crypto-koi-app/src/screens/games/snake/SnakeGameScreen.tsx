import React, { FunctionComponent, useState } from "react";
import { Button, StyleSheet, View, Text } from "react-native";
import { GameEngine } from "react-native-game-engine";
import { useTailwind } from "tailwind-rn/dist";
import { Controls, GameEvents } from "../../../game-system/gameSystem";
import { randomPosition } from "../../../game-system/utils";
import useGameEngine from "../../../hooks/useGameEngine";
import { Food } from "./components/Food";
import { Head } from "./components/Head";
import { Tail } from "./components/Tail";
import {
    SnakeGameConfig,
    SnakeGameEvents,
    SnakeGameStateEntities,
} from "./snakeGameState";
import { automaticMovementSystem } from "./systems/automaticMovementSystem";
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
        position: randomPosition(
            SnakeGameConfig.GRID_SIZE[0],
            SnakeGameConfig.GRID_SIZE[1],
            SnakeGameConfig.CELL_SIZE
        ),
    },
    head: {
        renderer: <Head />,
        position: [0, 0],
        automaticMovement: {
            currentDirection: Controls.bottom,
            speed: 1,
            lastMovement: 0,
            stepSize: SnakeGameConfig.CELL_SIZE,
        },
        collidesWithBoundaries: {
            ownSize: [SnakeGameConfig.CELL_SIZE, SnakeGameConfig.CELL_SIZE],
        },
    },
    tail: {
        renderer: <Tail />,
        positions: [],
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
                    automaticMovementSystem,
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
