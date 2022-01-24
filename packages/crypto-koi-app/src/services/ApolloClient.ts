import { ApolloClient, InMemoryCache } from "@apollo/client";
import { Config } from "../config";

export const apolloClient = new ApolloClient({
    uri: Config.graphqlBaseUrl,
    cache: new InMemoryCache(),
});
