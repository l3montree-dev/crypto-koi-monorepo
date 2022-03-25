import RootStore from "./RootStore";

export type SelectorFn<T> = (rootStore: RootStore) => T;

export const selectCurrentUser = (rootStore: RootStore) =>
    rootStore.authStore.currentUser;

export const selectFirstCryptogotchi = (rootStore: RootStore) => {
    return rootStore.authStore.currentUser?.cryptogotchies[0];
};

export const selectCryptogotchies = (rootStore: RootStore) =>
    rootStore.authStore.currentUser?.cryptogotchies;

export const selectThemeStore = (rootStore: RootStore) => rootStore.themeStore;

export const selectCryptogotchi = (id: string) => (rootStore: RootStore) => {
    return rootStore.authStore.currentUser?.cryptogotchies.find(
        (cryptogotchi) => cryptogotchi.id === id
    );
};
