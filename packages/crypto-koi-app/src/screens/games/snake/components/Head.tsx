import React from "react";
import { StyleSheet, View } from "react-native";
import { AttachComponent } from "../../../../entity-component-system/containsComponent";
import { HasPosition } from "../../../../entity-component-system/game-componets/HasPosition";
import { TimeBasedMovement } from "../../../../entity-component-system/game-componets/TimeBasedMovement";
import { gameDrawable } from "../../../../entity-component-system/gameDrawable";
import { SnakeGameConfig } from "../snakeGameState";

const style = StyleSheet.create({
    head: {
        width: SnakeGameConfig.CELL_SIZE,
        height: SnakeGameConfig.CELL_SIZE,
        backgroundColor: "yellow",
        position: "absolute",
    },
});

export type HeadEntity = AttachComponent<HasPosition> &
    AttachComponent<TimeBasedMovement>;

export const Head = gameDrawable((props: HeadEntity) => {
    const [x, y] = props.position.getCoords();
    return <View style={[style.head, { left: x, top: y }]} />;
});
