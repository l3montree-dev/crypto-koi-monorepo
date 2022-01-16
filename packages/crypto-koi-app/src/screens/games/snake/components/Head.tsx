import React from "react";
import { View, StyleSheet } from "react-native";
import {
    AttachComponent,
    Ctor,
} from "../../../../entity-component-system/game-componets/containsComponent";
import { HasPosition } from "../../../../entity-component-system/game-componets/hasPosition";
import { TimeBasedMovement } from "../../../../entity-component-system/game-componets/timeBasedMovement";
import { gameDrawable } from "../../../../entity-component-system/game-drawable/gameDrawable";
import { SnakeGameConfig } from "../snakeGameState";

const style = StyleSheet.create({
    head: {
        width: SnakeGameConfig.CELL_SIZE,
        height: SnakeGameConfig.CELL_SIZE,
        backgroundColor: "yellow",
        position: "absolute",
    },
});

export type HeadEntity = AttachComponent<HasPosition, "hasPosition"> &
    AttachComponent<TimeBasedMovement, "timeBasedMovement">;

export const Head = gameDrawable((props: HeadEntity) => {
    const [x, y] = props.hasPosition.position.getVec2();
    return <View style={[style.head, { left: x, top: y }]} />;
});
