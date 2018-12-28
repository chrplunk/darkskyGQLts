const fs = require('fs');
const path = require('path');
const port = process.env.PORT || 4000;

import { GraphQLSchema } from "graphql";
import { importSchema } from "graphql-import";
import { makeExecutableSchema } from 'graphql-tools';
import { ApolloServer } from 'apollo-server';

let localSchema: GraphQLSchema;
const folders = fs.readdirSync(path.join(__dirname, "./modules"));
  
folders.forEach( (folder:any) => {
    const { resolvers } = require(`./modules/${folder}/resolvers`);
    const typeDefs = importSchema( path.join(__dirname, `./modules/${folder}/schema.graphql`) );
    localSchema = (makeExecutableSchema({ resolvers, typeDefs }));
    console.log(localSchema);
  });

  const server = new ApolloServer({ schema: localSchema });
    
  server.listen({ port: port }).then(({ url }:any) => {
      console.log(`🚀  Server ready at ${url}`);
    });


