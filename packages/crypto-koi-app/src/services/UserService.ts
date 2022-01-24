import { GET_USER } from "../graphql/queries/userQueries";
import log from "../utils/logger";
import { apolloClient } from "./ApolloClient";
import { authService } from "./AuthService";

class UserService {
    /**
     * Executes side-effects. If the login is successful, it does update the authorization store.
     * @returns
     */
    async loginUsingDeviceId(deviceId: string): Promise<void> {
        const success = authService.exchangeDeviceIdForToken(deviceId);
        if (!success) {
            return;
        }
        console.log(await apolloClient.query({ query: GET_USER }));
    }
    /**
     * Executes side-effects. If the login is successful, it does update the authorization store.
     * @returns
     */
    async tryToLogin(): Promise<void> {
        log.info("trying to login in called");
        const success = await authService.tryToLoginUsingStoredCredentials();
        if (!success) {
            return;
        }

        console.log(await apolloClient.query({ query: GET_USER }));
    }
}

export const userService = new UserService();
