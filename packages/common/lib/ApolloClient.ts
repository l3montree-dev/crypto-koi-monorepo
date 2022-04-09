import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'
import { AxiosResponse } from 'axios'
import { uniqBy } from 'lodash'
import { AuthService, TokenResponse } from './AuthService'
import { Logger } from './logger'

const httpLink = (
    authService: AuthService,
    graphqlBaseUrl: string,
    logger: Logger
) =>
    createHttpLink({
        uri: graphqlBaseUrl,
        fetch: async (uri: RequestInfo, options) => {
            const token = authService.getAccessToken()
            let request
            if (token) {
                request = fetch(uri, {
                    ...options,
                    headers: {
                        ...options?.headers,
                        Authorization: `Bearer ${token}`,
                    },
                })
            } else {
                request = fetch(uri, options)
            }

            const response = await request

            if (response.status === 401) {
                // the request failed because the token is expired
                if (!authService.refreshTokenRequest) {
                    logger.info('started fetch api refresh routine')
                    authService.refreshTokenRequest =
                        authService.refreshAccessToken()
                }
                authService.refreshTokenRequest.then((r) => {
                    logger.info('refreshing api token')
                    const tokenResponse = (r as AxiosResponse<TokenResponse>)
                        .data
                    authService.handleSuccessfulToken(tokenResponse)
                    // reset the promise
                    authService.refreshTokenRequest = null
                    return fetch(uri, {
                        ...options,
                        headers: {
                            ...options?.headers,
                            Authorization: `Bearer ${tokenResponse.accessToken}`,
                        },
                    })
                })
            }
            if (!response.ok) {
                logger.error('GraphQL request failed with: ' + response.status)

                return response
            }
            // just return the response.
            return response
        },
    })

const uniqueByIdOffsetLimitPagination = <T>(keyArgs?: string[]) => {
    return {
        keyArgs: keyArgs,
        merge: (existing: T[], incoming: T[]) => {
            return uniqBy(
                [...(existing || []), ...(incoming || [])],
                // @ts-ignore
                (item) => item.__ref
            )
        },
    }
}

export const apolloClientFactory = (
    authService: AuthService,
    graphqlBaseUrl: string,
    logger: Logger
) =>
    new ApolloClient({
        link: httpLink(authService, graphqlBaseUrl, logger),
        cache: new InMemoryCache({
            typePolicies: {
                Query: {
                    fields: {
                        events: uniqueByIdOffsetLimitPagination([
                            'cryptogotchiId',
                        ]),
                        leaderboard: uniqueByIdOffsetLimitPagination(),
                    },
                },
            },
        }),
    })
