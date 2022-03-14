import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { AxiosResponse } from "axios";
import { uniqBy } from "lodash";
import { config } from "../config";
import log from "../utils/logger";
import ViewUtils from "../utils/ViewUtils";
import { authService, TokenResponse } from "./AuthService";

const httpLink = createHttpLink({
    uri: config.graphqlBaseUrl,
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

const uniqueByIdOffsetLimitPagination = <T>(keyArgs?: string[]) => {
    return {
        keyArgs: keyArgs,
        merge: (existing: T[], incoming: T[]) => {
            return uniqBy(
                [...(existing || []), ...(incoming || [])],
                // @ts-ignore
                (item) => item.__ref
            );
        },
    };
};

export const apolloClient = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache({
        typePolicies: {
            Query: {
                fields: {
                    events: uniqueByIdOffsetLimitPagination(["cryptogotchiId"]),
                    leaderboard: uniqueByIdOffsetLimitPagination(),
                },
            },
        },
    }),
});
