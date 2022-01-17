import { immerable } from "immer";
import { Controls } from "../input/controls";
import GameComponent from "./GameComponent";

export class TimeBasedMovement extends GameComponent<"timeBasedMovement"> {
    [immerable] = true;

    static getKey(): string {
        return "timeBasedMovement";
    }

    constructor(
        public currentDirection: Controls,
        // how many steps per second
        public speed: number,
        public stepSize: number,
        // timestamp when the last movement did occur
        public lastMovement: number = 0
    ) {
        super("timeBasedMovement");
    }

    moved(currentTime: number): boolean {
        return this.lastMovement === currentTime;
    }
}
