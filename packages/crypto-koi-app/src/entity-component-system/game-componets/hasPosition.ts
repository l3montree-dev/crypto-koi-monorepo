import { immerable } from "immer";
import Vec2 from "../Vec2";

export class HasPosition {
    static getComponentName() {
        return "hasPosition" as const;
    }

    static attach<T>(
        entity: T,
        concrete: HasPosition
    ): T &
        {
            [key in ReturnType<
                typeof HasPosition["getComponentName"]
            >]: HasPosition;
        } {
        return { ...entity, [HasPosition.getComponentName()]: concrete };
    }

    [immerable] = true;

    constructor(public position: Vec2) {}
}
