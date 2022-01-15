import React from "react";
import { View, StyleSheet } from "react-native";
import { gameComponent } from "../../../../game-system/gameComponent";
import { HasPosition } from "../../../../game-system/gameSystem";
import { SnakeGameState } from "../snakeGameState";

const style = StyleSheet.create({
    food: {
        width: 10,
        height: 10,
    },
});

export type FoodEntity = HasPosition;

export const Food = gameComponent<SnakeGameState, "food", FoodEntity>(() => {
    return <View style={style.food} />;
});
