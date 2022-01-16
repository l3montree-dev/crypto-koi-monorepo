import React from "react";
import { View, StyleSheet } from "react-native";
import { gameComponent } from "../../../../game-system/gameComponent";
import { HasPosition } from "../../../../game-system/gameSystem";
import { SnakeGameConfig, SnakeGameState } from "../snakeGameState";

const style = StyleSheet.create({
    food: {
        width: SnakeGameConfig.CELL_SIZE,
        height: SnakeGameConfig.CELL_SIZE,
        backgroundColor: "green",
        position: "absolute",
    },
});

export type FoodEntity = HasPosition;

export const Food = gameComponent<SnakeGameState, "food", FoodEntity>(
    (props) => {
        const [x, y] = props.position.getVec2();
        return <View style={[style.food, { left: x, top: y }]} />;
    }
);
