export default class Normalizer {
    static normalizeFloat(f: number, precision = 3): number {
        return parseFloat(f.toPrecision(precision + 1));
    }
}
