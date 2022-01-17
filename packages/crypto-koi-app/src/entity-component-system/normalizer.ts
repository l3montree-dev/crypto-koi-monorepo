export const normalizeAll = (precision = 3) => (
    ...floats: number[]
): number[] => {
    return floats.map((float) => parseFloat(float.toPrecision(precision + 1)));
};

export const normalizeFloat = (f: number, precision = 3): number =>
    parseFloat(f.toPrecision(precision + 1));
