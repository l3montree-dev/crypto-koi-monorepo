import produce from "immer";
import React, { FunctionComponent, memo } from "react";
import { StyleSheet, View } from "react-native";
import { GameEngine } from "react-native-game-engine";
import { gameComponent } from "../../../game-system/gameComponent";
import { gameSystem } from "../../../game-system/gameSystem";
import { SnakeGameState } from "./snakeGameState";

const MoveFinger = gameSystem<SnakeGameState>((entities, { touches }) => {
    touches
        .filter((t) => t.type === "move")
        .forEach((t) => {
            const finger = entities[t.id.toString() as keyof typeof entities];
            if (finger && finger.position) {
                finger.position[0] += t.delta?.pageX ?? 0;
                finger.position[1] += t.delta?.pageY ?? 0;
            }
        });
    return entities;
});

const RADIUS = 20;

const styles = StyleSheet.create({
    finger: {
        borderColor: "#CCC",
        borderWidth: 4,
        borderRadius: RADIUS * 2,
        width: RADIUS * 2,
        height: RADIUS * 2,
        backgroundColor: "pink",
        position: "absolute",
    },
    container: {
        backgroundColor: "#FFF",
        flex: 1,
    },
});

type Props = {
    readonly position: readonly [number, number];
};

const Finger = gameComponent<SnakeGameState, "0", Props>((props) => {
    const x = props.position[0] - RADIUS / 2;
    const y = props.position[1] - RADIUS / 2;
    return <View style={[styles.finger, { left: x, top: y }]} />;
});

const SnakeGameScreen: FunctionComponent = () => {
    return (
        <GameEngine
            style={styles.container}
            systems={[MoveFinger]}
            // @ts-ignore
            entities={{
                0: { position: [40, 200], renderer: <Finger /> },
                1: { position: [100, 200], renderer: <Finger /> }, //-- and a map of components. Each entity has an optional
                2: { position: [160, 200], renderer: <Finger /> }, //-- renderer component. If no renderer is supplied with the
                3: { position: [220, 200], renderer: <Finger /> }, //-- entity - it won't get displayed.
                4: { position: [280, 200], renderer: <Finger /> },
            }}
        ></GameEngine>
    );
};

export default SnakeGameScreen;
