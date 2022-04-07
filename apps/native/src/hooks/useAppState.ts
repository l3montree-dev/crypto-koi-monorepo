import { useContext } from "react";
import { AppStateContext } from "../mobx/AppStateContext";
import RootStore from "@crypto-koi/common/lib/mobx/RootStore";
import { SelectorFn } from "@crypto-koi/common/lib/mobx/selectors";

export default function useAppState<T = RootStore>(
    selectorFn?: SelectorFn<T>
): T {
    const ctx = useContext(AppStateContext);

    if (selectorFn) {
        return selectorFn(ctx);
    }

    // @ts-ignore
    return ctx;
}
