import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { offsetLimitPagination } from "@apollo/client/utilities";
import { AxiosResponse } from "axios";
import { Config } from "../config";
import log from "../utils/logger";
import { authService, TokenResponse } from "./AuthService";

const httpLink = createHttpLink({
    uri: Config.graphqlBaseUrl,
    fetch: async (uri: RequestInfo, options) => {
        const token = authService.getAccessToken();
        const request = fetch(uri, {
            ...options,
            headers: { ...options?.headers, Authorization: `Bearer ${token}` },
        });
        const response = await request;

        if (response.status === 401) {
            // the request failed because the token is expired
            if (!authService.refreshTokenRequest) {
                log.info("started fetch api refresh routine");
                authService.refreshTokenRequest = authService.refreshAccessToken();
            }
            authService.refreshTokenRequest.then((r) => {
                log.info("refreshing api token");
                const tokenResponse = (r as AxiosResponse<TokenResponse>).data;
                authService.handleSuccessfulToken(tokenResponse);
                // reset the promise
                authService.refreshTokenRequest = null;
                return fetch(uri, {
                    ...options,
                    headers: {
                        ...options?.headers,
                        Authorization: `Bearer ${tokenResponse.accessToken}`,
                    },
                });
            });
        }
        if (!response.ok) {
            log.error("GraphQL request failed with: " + response.status);
            return response;
        }
        // just return the response.
        return response;
    },
});

export const apolloClient = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache({
        typePolicies: {
            Query: {
                fields: {
                    events: offsetLimitPagination(["cryptogotchiId"]),
                },
            },
        },
    }),
});
