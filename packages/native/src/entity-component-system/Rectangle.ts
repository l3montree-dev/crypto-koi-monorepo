import Vec2 from "./Vec2";

export default class Rectangle {
    constructor(private topLeft: Vec2, private bottomRight: Vec2) {}

    getTopLeft() {
        return this.topLeft;
    }

    getBottomRight() {
        return this.bottomRight;
    }

    isVec2Inside(vec2: Vec2): boolean {
        return (
            this.topLeft.getX() <= vec2.getX() &&
            this.topLeft.getY() <= vec2.getY() &&
            this.bottomRight.getX() >= vec2.getX() &&
            this.bottomRight.getY() >= vec2.getY()
        );
    }

    /**
     * Checks if a vector is inside or equals to this one.
     * @param vec4
     * @returns
     */
    isRectangleInside(rectangle: Rectangle): boolean {
        return (
            this.isVec2Inside(rectangle.getTopLeft()) &&
            this.isVec2Inside(rectangle.getBottomRight())
        );
    }

    equals(rectangle: Rectangle) {
        return (
            this.getTopLeft().equals(rectangle.getTopLeft()) &&
            this.getBottomRight().equals(rectangle.getBottomRight())
        );
    }

    overlaps(rectangle: Rectangle): boolean {
        if (
            rectangle.getBottomRight().getY() > this.getTopLeft().getY() ||
            rectangle.getTopLeft().getY() < this.getBottomRight().getY() ||
            rectangle.getBottomRight().getX() < this.getTopLeft().getX() ||
            rectangle.getTopLeft().getX() > this.getBottomRight().getX()
        ) {
            return false;
        }

        return true;
    }
}
