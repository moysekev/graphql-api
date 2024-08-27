import {
    GraphQLID,
    GraphQLObjectType,
    GraphQLString
} from "graphql";

const ConfigurationType = new GraphQLObjectType({
    name: "Configuration",
    fields: () => ({
        id: { type: GraphQLID },
        email: { type: GraphQLString },
        createdAt: { type: GraphQLString },
        updatedAt: { type: GraphQLString },
    }),
});

export default ConfigurationType;
