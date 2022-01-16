import React from "react";
import { StyleSheet, View } from "react-native";
import { gameComponent } from "../../../../game-system/gameComponent";
import { HasPosition } from "../../../../game-system/gameSystem";

const style = StyleSheet.create({
    head: {
        width: 10,
        height: 10,
    },
});

export type TailEntity = { positions: Array<HasPosition["position"]> };
export const Tail = gameComponent((props: TailEntity) => {
    return <View style={style.head} />;
});
