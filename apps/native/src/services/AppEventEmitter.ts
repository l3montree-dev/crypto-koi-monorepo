import { providers } from "ethers";
import EventEmitter from "events";

interface EventMap {
    successfulRedeem: providers.TransactionReceipt;
    failedRedeem: Error;
}

type Registry<T extends EventMap> = {
    [key in keyof T]?: Listener<T, key>;
};
type Unsubscribe = () => void;
type Listener<Map extends EventMap, T extends keyof Map> = (
    arg: Map[T]
) => void;
class AppEventEmitter extends EventEmitter {
    registry: Registry<EventMap>;

    constructor() {
        super();
        this.registry = {};
    }
    registerListener<Key extends keyof EventMap>(
        eventName: Key,
        callback: Listener<EventMap, Key>
    ): Unsubscribe {
        this.on(eventName, callback);
        return () => this.removeListener(eventName, callback);
    }

    dispatch<Key extends keyof EventMap>(eventName: Key, args: EventMap[Key]) {
        this.emit(eventName, args);
    }
}

export const appEventEmitter = new AppEventEmitter();
