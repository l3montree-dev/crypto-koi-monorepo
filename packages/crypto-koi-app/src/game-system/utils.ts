import { random } from "lodash";

export const randomPosition = (
    width: number,
    height: number,
    cellSize: number
): [number, number] => {
    const amountOfCellsX = Math.floor(width / cellSize);
    const amountOfCellsY = Math.floor(height / cellSize);

    console.log("AMOUNT OF CELLS X", amountOfCellsX);
    console.log("AMOUNT OF CELLS Y", amountOfCellsY);
    return [
        random(0, amountOfCellsX, false) * cellSize,
        random(0, amountOfCellsY, false) * cellSize,
    ];
};
