import { immerable } from "immer";
import { Controls } from "../types";
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

    /**
     * Returns true, if a movement did happen in this frame
     * This can be used to check if the movement is valid or to calculate collisions
     * or similar.
     * @param currentTime
     * @returns
     */
    movedInThisFrame(currentTime: number): boolean {
        return this.lastMovement === currentTime;
    }
}
