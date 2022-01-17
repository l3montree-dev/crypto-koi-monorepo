import GameComponent from "./GameComponent";

export interface Ctor<T> {
    new (...args: any[]): T;
}

export type AttachComponent<T extends GameComponent<any>> = {
    [k in ReturnType<T["getKey"]>]: T;
};

type InstanceType<S> = S extends { new (...args: any[]): infer T } ? T : never;

export const containsComponent = <T extends Ctor<GameComponent<string>>>(
    component: T
) => <A>(entity: A): entity is A & AttachComponent<InstanceType<T>> => {
    if (typeof entity !== "object" || entity === null) {
        return false;
    }

    // @ts-ignore
    const c = entity[component.getKey()];
    return c instanceof component;
};
