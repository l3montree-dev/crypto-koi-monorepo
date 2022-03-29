export default class IdGenerator {
    static randomId(): string {
        return Math.random().toString().substr(2, 8);
    }
}
