import AuthStore from "@crypto-koi/common/lib/mobx/AuthStore";
import RootStore from "@crypto-koi/common/lib/mobx/RootStore";
import ThemeStore from "@crypto-koi/common/lib/mobx/ThemeStore";

export const nativeRootStore = new RootStore(new AuthStore(), new ThemeStore());
