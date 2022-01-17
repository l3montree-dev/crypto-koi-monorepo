import { Entity } from "../game-state/gameState";
import GameComponent from "./GameComponent";

export class GameEntityBuilder<T extends Entity> {
    constructor(private entity: T) {}

    attach<A extends GameComponent<any>>(
        component: A
    ): GameEntityBuilder<T & { [key in ReturnType<A["getKey"]>]: A }> {
        // @ts-ignore
        this.entity[component.getKey()] = component;
        return this as GameEntityBuilder<
            T & { [key in ReturnType<A["getKey"]>]: A }
        >;
    }

    eject(): T {
        return this.entity;
    }
}
