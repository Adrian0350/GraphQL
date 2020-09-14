const fs                    = require('fs');
const express               = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

const port = 3001;
const app  = express();

const typeDefs  = fs.readFileSync('./schema.graphql', {encoding: 'utf-8'});
const scalars   = require('./scalars/datetime');
const resolvers = require('./resolvers');

const server = new ApolloServer({typeDefs, resolvers});

server.applyMiddleware({app});

app.listen(port, () => console.log(`Server running on port ${port}`));
