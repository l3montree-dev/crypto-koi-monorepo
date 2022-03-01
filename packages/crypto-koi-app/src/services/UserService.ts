import { GET_USER } from "../graphql/queries/user";
import { GetUser } from "../graphql/queries/__generated__/GetUser";
import { rootStore } from "../mobx/RootStore";
import { apolloClient } from "./ApolloClient";
import { authService } from "./AuthService";

class UserService {
    /**
     * Executes side-effects. If the login is successful, it does update the authorization store.
     * @returns
     */
    async loginUsingWalletAddress(walletAddress: string): Promise<void> {
        const success = await authService.exchangeWalletAddressForToken(
            walletAddress
        );
        if (!success) {
            return;
        }

        return this.sync();
    }
    /**
     * Executes side-effects. If the login is successful, it does update the authorization store.
     * @returns
     */
    async tryToLogin(): Promise<void> {
        const success = await authService.tryToLoginUsingStoredCredentials();
        if (!success) {
            return;
        }
        return this.sync();
    }

    async sync() {
        const user = await apolloClient.query<GetUser>({
            query: GET_USER,
            fetchPolicy: "no-cache",
        });
        rootStore.authStore.setCurrentUser(user.data.user);
    }
}

export const userService = new UserService();
