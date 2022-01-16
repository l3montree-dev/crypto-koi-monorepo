import React from "react";
import { StyleSheet, View } from "react-native";
import { AttachComponent } from "../../../../entity-component-system/game-componets/containsComponent";
import { HasPosition } from "../../../../entity-component-system/game-componets/hasPosition";
import { gameDrawable } from "../../../../entity-component-system/game-drawable/gameDrawable";

import { SnakeGameConfig } from "../snakeGameState";

const style = StyleSheet.create({
    tail: {
        width: SnakeGameConfig.CELL_SIZE,
        height: SnakeGameConfig.CELL_SIZE,
        backgroundColor: "blue",
        position: "absolute",
    },
});

export type TailEntity = {
    elements: Array<
        { id: string } & AttachComponent<HasPosition, "hasPosition">
    >;
};
export const Tail = gameDrawable((props: TailEntity) => {
    return (
        <>
            {props.elements.map((el) => {
                const [x, y] = el.hasPosition.position.getVec2();
                return (
                    <View
                        key={el.id}
                        style={[style.tail, { left: x, top: y }]}
                    />
                );
            })}
        </>
    );
});
