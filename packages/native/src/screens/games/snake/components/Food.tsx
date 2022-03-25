import React from "react";
import { StyleSheet, View } from "react-native";
import { AttachComponent } from "../../../../entity-component-system/containsComponent";
import { HasPosition } from "../../../../entity-component-system/game-componets/HasPosition";
import { gameDrawable } from "../../../../entity-component-system/gameDrawable";

import { SnakeGameConfig, SnakeGameState } from "../snakeGameState";

const style = StyleSheet.create({
    food: {
        width: SnakeGameConfig.CELL_SIZE,
        height: SnakeGameConfig.CELL_SIZE,
        backgroundColor: "green",
        position: "absolute",
    },
});

export type FoodEntity = AttachComponent<HasPosition>;

export const Food = gameDrawable<SnakeGameState, "food", FoodEntity>(
    (props) => {
        const [x, y] = props.position.getCoords();
        return <View style={[style.food, { left: x, top: y }]} />;
    }
);
