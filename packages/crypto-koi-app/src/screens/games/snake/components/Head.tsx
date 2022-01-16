import React from "react";
import { View, StyleSheet } from "react-native";
import { gameComponent } from "../../../../game-system/gameComponent";
import {
    AutomaticMovement,
    CollidesWithBoundaries,
} from "../../../../game-system/gameSystem";
import { SnakeGameConfig } from "../snakeGameState";

const style = StyleSheet.create({
    head: {
        width: SnakeGameConfig.CELL_SIZE,
        height: SnakeGameConfig.CELL_SIZE,
        backgroundColor: "yellow",
        position: "absolute",
    },
});

export type HeadEntity = AutomaticMovement & CollidesWithBoundaries;
export const Head = gameComponent((props: HeadEntity) => {
    const [x, y] = props.position.getVec2();
    return <View style={[style.head, { left: x, top: y }]} />;
});
