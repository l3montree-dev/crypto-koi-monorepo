import { Controls } from "./controls";

export type GameEvents =
    | {
          type: "gameOver";
      }
    | {
          type: "controls";
          value: Controls;
      };
