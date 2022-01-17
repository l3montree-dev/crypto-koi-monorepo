import Position from "../Position";
import Rectangle from "../Rectangle";
import GameComponent from "./GameComponent";

export default class CollidesWithBoundaries extends GameComponent<"collidesWithBoundaries"> {
    static getKey() {
        return "collidesWithBoundaries";
    }

    constructor(private boundaries: Rectangle) {
        super("collidesWithBoundaries");
    }

    checkForCollision(currentPosition: Position): boolean {
        return !this.boundaries.isRectangleInside(
            currentPosition.getRectangle()
        );
    }
}
