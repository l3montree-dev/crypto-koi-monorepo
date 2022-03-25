import produce, { immerable } from "immer";
import Vec2 from "./Vec2";
import Rectangle from "./Rectangle";

export default class Position {
    [immerable] = true;

    constructor(public coords: Vec2, public boundingBox: Vec2) {}

    getTopLeft(): Vec2 {
        return this.coords;
    }

    getTopRight(): Vec2 {
        return this.coords.moveX(this.boundingBox.getX());
    }

    getBottomLeft(): Vec2 {
        return this.coords.moveY(this.boundingBox.getY());
    }

    getBottomRight(): Vec2 {
        return this.coords.move(this.boundingBox);
    }

    getRectangle(): Rectangle {
        return new Rectangle(
            new Vec2(this.coords.getX(), this.coords.getY()),
            new Vec2(
                this.coords.getX() + this.boundingBox.getX(),
                this.coords.getY() + this.boundingBox.getY()
            )
        );
    }

    moveY(deltaY: number): Position {
        return produce(this, (draft) => {
            draft.coords = draft.coords.moveY(deltaY);
        });
    }

    moveX(deltaX: number): Position {
        return produce(this, (draft) => {
            draft.coords = draft.coords.moveX(deltaX);
        });
    }
}
