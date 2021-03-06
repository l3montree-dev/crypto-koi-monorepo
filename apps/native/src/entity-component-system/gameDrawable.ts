import { FunctionComponent, memo } from "react";
import GameState from "./types";

export const gameDrawable = <
    T extends GameState<any>,
    EntityId extends keyof T["entities"],
    Props
>(
    component: FunctionComponent<Props>
) => {
    return memo(
        component as FunctionComponent<
            Omit<Props, keyof T["entities"][EntityId]>
        >
    );
};
