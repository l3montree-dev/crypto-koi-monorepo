import React, { FunctionComponent } from "react";
import { Button, StyleSheet, View, Text } from "react-native";
import { GameEngine } from "react-native-game-engine";
import { useTailwind } from "tailwind-rn/dist";
import { Controls, GameEvents } from "../../../game-system/gameSystem";
import useGameEngine from "../../../hooks/useGameEngine";
import { Food } from "./components/Food";
import { Head } from "./components/Head";
import { Tail } from "./components/Tails";
import {
    SnakeGameConfig,
    SnakeGameEvents,
    SnakeGameStateEntities,
} from "./snakeGameState";
import { automaticMovementSystem } from "./systems/automaticMovementSystem";
import { collidesWithBoundariesSystem } from "./systems/collidesWithBoundariesSystem";

const styles = StyleSheet.create({
    container: {
        backgroundColor: "red",
        flex: 1,
    },
});

const entities: SnakeGameStateEntities = {
    food: {
        renderer: <Food />,
        position: [0, 0],
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
    const handleLeft = () => {
        console.log("LEFT");
        engine.current?.dispatch(Controls.left);
    };

    const handleRight = () => {
        engine.current?.dispatch(Controls.right);
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
                    if (event === GameEvents.gameOver) {
                        setIsRunning(false);
                    }
                }}
                systems={[
                    // provide the boundaries of the snake game
                    automaticMovementSystem,
                    collidesWithBoundariesSystem,
                ]}
                entities={entities}
            />
            <View style={tailwind("flex-1 flex-row")}>
                <Button title="Links" onPress={handleLeft} />
                <Button title="Rechts" onPress={handleRight} />
                <Button title="Reset" onPress={handleReset} />
                <Text>TEEEST: {isRunning.toString()}</Text>
            </View>
        </View>
    );
};

export default SnakeGameScreen;
