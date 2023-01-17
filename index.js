
// external imports
const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");

// internal imports
const characterData = require("./db/harrypotter.json");
const wandData = require("./db/wand.json");
const types = require("./types")
const resolvers = require("./resolvers")
const context = require("./")


const server = new ApolloServer({
    typeDefs: types,
    resolvers,
    context
});


async function startServer() {
    const { url } = await startStandaloneServer(server, {
        listen: { port: 5000 },
    });

    console.log(`🚀  Server ready at: ${url}`);
}

startServer();

