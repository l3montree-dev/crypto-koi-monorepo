// import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { Config } from "../config";
import { authService } from "./AuthService";

// @ts-ignore
const httpLink = createHttpLink({
    uri: Config.graphqlBaseUrl,
    fetch: (uri: RequestInfo) => {
        if (typeof uri === "string") {
            return authService.protectedClient.request({
                url: uri,
            });
        } else {
            return authService.protectedClient.request({ url: uri.url });
        }
    },
});

// @ts-ignore
export const apolloClient = new ApolloClient({
    link: httpLink,
    // @ts-ignore
    cache: new InMemoryCache(),
});
