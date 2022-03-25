import { createContext } from "react";
import RootStore, { rootStore } from "./RootStore";

export const AppStateContext = createContext<RootStore>(rootStore);
