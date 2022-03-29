import { useRef, useState } from "react";
import { GameEngine } from "react-native-game-engine";

export default function useGameEngine<Events>() {
    const [isRunning, setIsRunning] = useState(true);
    const engine = useRef<
        GameEngine & {
            dispatch: (event: Events) => void;
            swap: (entities: any) => void;
        }
    >(null);
    return { engine, isRunning, setIsRunning };
}
