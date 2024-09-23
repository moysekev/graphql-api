import { DocumentNode, execute, GraphQLObjectType, GraphQLSchema, GraphQLString, parse, Source } from "graphql"

// Trying to execute a graphql query on an in-memory data source : not involving http server, nor database.
//
// The query is parsed from a string, then executed against a schema.

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        id: {
            type: GraphQLString,
        },
        email: {
            type: GraphQLString,
        },
    },
});

const schema = new GraphQLSchema({
    query: RootQuery
});

export const test = async () => {
    // Parse source to AST, reporting any syntax error.
    let documentAST: DocumentNode;
    try {
        documentAST = parse(new Source("query {id email}", 'GraphQL request'));
    } catch (syntaxError: unknown) {
        console.error(syntaxError);
    }
    // Execute a query
    const result = await execute(schema, documentAST, { id: 'foo', email: 'foo@bar.com', unused: "glop" });
    console.log(JSON.stringify(result)); // {"data":{"id":"foo","email":"foo@bar.com"}}
}