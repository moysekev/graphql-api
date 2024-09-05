import {
    GraphQLID,
    GraphQLObjectType,
    GraphQLString
} from "graphql";

const NameType = new GraphQLObjectType({
    name: 'Name',
    fields: () => ({
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
    }),
})

const ConfigurationType = new GraphQLObjectType({
    name: "Configuration",
    fields: () => ({
        id: { type: GraphQLID },
        email: { type: GraphQLString },
        name: {
            type: NameType,
            resolve: (source, args, context, info) => {
                console.log("ConfigurationType|name.resolve", source, args, context, info)
                return Promise.resolve({ firstName: "glop", lastName: "glop" })
            }
        },
        createdAt: { type: GraphQLString },
        updatedAt: { type: GraphQLString },
    }),
});

export default ConfigurationType;
