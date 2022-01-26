import { GET_USER } from "../graphql/queries/userQueries";
import { GetUser } from "../graphql/queries/__generated__/GetUser";
import { rootStore } from "../mobx/RootStore";
import { apolloClient } from "./ApolloClient";
import { authService } from "./AuthService";

class UserService {
    /**
     * Executes side-effects. If the login is successful, it does update the authorization store.
     * @returns
     */
    async loginUsingDeviceId(deviceId: string): Promise<void> {
        const success = await authService.exchangeDeviceIdForToken(deviceId);
        if (!success) {
            return;
        }

        const user = await apolloClient.query<GetUser>({ query: GET_USER });

        rootStore.authStore.setCurrentUser(user.data.user);
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

        const user = await apolloClient.query<GetUser>({ query: GET_USER });
        rootStore.authStore.setCurrentUser(user.data.user);
    }
}

export const userService = new UserService();
