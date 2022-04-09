module.exports = {
    client: {
        service: {
            name: 'cryptokoi',
            url: 'http://localhost:8080/graphql',
        },
        includes: ['./lib/graphql/queries/**/*.ts'], // array of glob patterns
        tagName: 'gql',
        addTypename: true,
    },
}
