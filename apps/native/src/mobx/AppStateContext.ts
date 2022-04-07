import { createContext } from "react";
import RootStore from "../../../../packages/common/lib/mobx/RootStore";
import { nativeRootStore } from "./NativeRootStore";

export const AppStateContext = createContext<RootStore>(nativeRootStore);
