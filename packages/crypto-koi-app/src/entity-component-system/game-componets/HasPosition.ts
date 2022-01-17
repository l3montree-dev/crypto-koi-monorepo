import { immerable } from "immer";
import Position from "../Position";
import GameComponent from "./GameComponent";

export class HasPosition extends GameComponent<"position"> {
    [immerable] = true;

    static getKey() {
        return "position";
    }

    constructor(public p: Position) {
        super("position");
    }

    getCoords(): [number, number] {
        return this.p.coords.getVec2();
    }
}
