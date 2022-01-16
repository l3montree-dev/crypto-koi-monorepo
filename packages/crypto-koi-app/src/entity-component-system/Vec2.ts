import produce, { immerable } from "immer";
import Normalizer from "./Normalizer";

export default class Vec2 {
    static random(maxX: number, maxY: number, stepSize: number): Vec2 {
        const x = Math.floor((Math.random() * maxX) / stepSize) * stepSize;
        const y = Math.floor((Math.random() * maxY) / stepSize) * stepSize;
        return new Vec2(x, y);
    }

    static randomInBounds(
        minX: number,
        minY: number,
        maxX: number,
        maxY: number,
        stepSize: number
    ): Vec2 {
        // calculate how many steps we can make in the x and y directions
        const xStepsRange = Math.floor((maxX - minX) / stepSize);
        // now generate a random number between 0 and xSteps
        const xSteps = Math.floor(Math.random() * xStepsRange);
        // do the same for the y direction
        const yStepsRange = Math.floor((maxY - minY) / stepSize);
        const ySteps = Math.floor(Math.random() * yStepsRange);
        // now calculate the x and y positions
        const x = minX + xSteps * stepSize;
        const y = minY + ySteps * stepSize;
        return new Vec2(x, y);
    }
    // mark to be compatible with immerjs (used by the gameSystem fn)
    [immerable] = true;

    _x: number;
    _y: number;

    constructor(x: number, y: number) {
        this._x = Normalizer.normalizeFloat(x);
        this._y = Normalizer.normalizeFloat(y);
    }

    getX(): number {
        return this._x;
    }

    getY(): number {
        return this._y;
    }

    setX(x: number): Vec2 {
        return produce(this, (draft) => {
            draft._x = x;
        });
    }

    setY(y: number): Vec2 {
        return produce(this, (draft) => {
            draft._y = y;
        });
    }

    moveX(deltaX: number): Vec2 {
        return this.setX(Normalizer.normalizeFloat(this._x + deltaX));
    }

    moveY(deltaY: number): Vec2 {
        return this.setY(Normalizer.normalizeFloat(this._y + deltaY));
    }

    setVec2(x: number, y: number): Vec2 {
        return this.setX(x).setY(y);
    }

    getVec2(): [number, number] {
        return [this._x, this._y];
    }

    equals(other: Vec2): boolean {
        return this._x === other._x && this._y === other._y;
    }
}
