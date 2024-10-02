import { DocumentNode, execute, GraphQLObjectType, GraphQLSchema, GraphQLString, parse, Source } from "graphql"

import GraphQLJSON, { GraphQLJSONObject } from 'graphql-type-json';

// Trying to execute a graphql query on an in-memory data source : not involving http server, nor database.
//
// The query is parsed from a string, then executed against a schema.

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        val: { type: GraphQLJSON },
        obj: { type: GraphQLJSONObject },
    },
});

const schema = new GraphQLSchema({
    query: RootQuery
});

export const test = async () => {
    // Parse source to AST, reporting any syntax error.
    let documentAST: DocumentNode;
    try {
        documentAST = parse(new Source("query {obj {sub {foo}}}", 'GraphQL request'));
    } catch (syntaxError: unknown) {
        console.error(syntaxError);
    }
    // Execute a query
    const result = await execute(schema, documentAST, { obj: { id: 'foo', email: 'foo@bar.com', unused: "glop", sub: { foo: 'bar' } } });
    console.log(JSON.stringify(result)); // {"data":{"obj":{"id":"foo","email":"foo@bar.com","unused":"glop","sub":{"foo":"bar"}}}}
    // So this means that even using that library we cannot query a nested field of a JSON object.
    // the whole object is returned, but not a nested field.
}