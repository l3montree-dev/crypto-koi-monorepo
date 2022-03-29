import CollidesWithBoundaries from "../../../../src/entity-component-system/game-componets/CollidesWithBoundaries";
import Position from "../../../../src/entity-component-system/Position";
import Rectangle from "../../../../src/entity-component-system/Rectangle";
import Vec2 from "../../../../src/entity-component-system/Vec2";

describe("CollidesWithBoundaries game component test suite", () => {
    it("should not verify a collision, if the position equals the boundaries", () => {
        const collidesWithBoundaries = new CollidesWithBoundaries(
            new Rectangle(new Vec2(0, 0), new Vec2(100, 100))
        );

        expect(
            collidesWithBoundaries.checkForCollision(
                new Position(new Vec2(0, 0), new Vec2(100, 100))
            )
        ).toBeFalsy();
    });
});
