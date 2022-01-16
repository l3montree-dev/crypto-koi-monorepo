import { immerable } from "immer";
import Vec2 from "../Vec2";

export default class HasSize {
    static getComponentName() {
        return "size" as const;
    }

    static attach<T>(
        entity: T,
        concrete: HasSize
    ): T &
        {
            [key in ReturnType<typeof HasSize["getComponentName"]>]: HasSize;
        } {
        return { ...entity, [HasSize.getComponentName()]: concrete };
    }

    [immerable] = true;
    // provided vector describes the bounding box.
    constructor(public size: Vec2) {}
}
