const { resolvers, typeDefs } = require('./schema');
const { ApolloServer } = require('apollo-server');
const { context } = require('./context');
const { ApolloServerPluginLandingPageGraphQLPlayground } = require('apollo-server-core');

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: context,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()]
});

server.listen().then(({ url }) => console.log(`Servidor rodando em ${url}`));