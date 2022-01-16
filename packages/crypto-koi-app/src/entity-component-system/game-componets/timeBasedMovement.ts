import { immerable } from "immer";
import { Controls } from "../input/controls";

export class TimeBasedMovement {
    static getComponentName() {
        return "timeBasedMovement" as const;
    }

    attach<T>(
        entity: T
    ): T &
        {
            [key in ReturnType<
                typeof TimeBasedMovement["getComponentName"]
            >]: TimeBasedMovement;
        } {
        return { ...entity, [TimeBasedMovement.getComponentName()]: this };
    }

    [immerable] = true;

    constructor(
        public currentDirection: Controls,
        // how many steps per second
        public speed: number,
        public stepSize: number,
        // timestamp when the last movement did occur
        public lastMovement: number = 0
    ) {}

    moved(currentTime: number): boolean {
        return this.lastMovement === currentTime;
    }
}
