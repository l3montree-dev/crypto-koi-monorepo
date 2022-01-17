export default abstract class GameComponent<Key extends string> {
    constructor(protected key: Key) {}

    getKey(): Key {
        return this.key;
    }
}
