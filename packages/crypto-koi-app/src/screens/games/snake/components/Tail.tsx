import React from "react";
import { StyleSheet, View } from "react-native";
import { gameComponent } from "../../../../game-system/gameComponent";
import { HasPosition } from "../../../../game-system/gameSystem";
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
    elements: Array<HasPosition & { id: string }>;
};
export const Tail = gameComponent((props: TailEntity) => {
    return (
        <>
            {props.elements.map((el) => {
                const [x, y] = el.position.getVec2();
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
