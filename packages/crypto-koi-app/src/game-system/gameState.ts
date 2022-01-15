import { GameEngineProperties } from "react-native-game-engine";

export default interface GameState<Entities extends { [key: string]: any }>
    extends GameEngineProperties {
    entities: Entities;
}
