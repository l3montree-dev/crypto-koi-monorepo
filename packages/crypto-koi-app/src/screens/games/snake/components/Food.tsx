import React from "react";
import { StyleSheet, View } from "react-native";
import { AttachComponent } from "../../../../entity-component-system/game-componets/containsComponent";
import { HasPosition } from "../../../../entity-component-system/game-componets/hasPosition";
import { gameDrawable } from "../../../../entity-component-system/game-drawable/gameDrawable";

import { SnakeGameConfig, SnakeGameState } from "../snakeGameState";

const style = StyleSheet.create({
    food: {
        width: SnakeGameConfig.CELL_SIZE,
        height: SnakeGameConfig.CELL_SIZE,
        backgroundColor: "green",
        position: "absolute",
    },
});

export type FoodEntity = AttachComponent<HasPosition, "hasPosition">;

export const Food = gameDrawable<SnakeGameState, "food", FoodEntity>(
    (props) => {
        const [x, y] = props.hasPosition.position.getVec2();
        return <View style={[style.food, { left: x, top: y }]} />;
    }
);
