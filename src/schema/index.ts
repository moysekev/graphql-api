import {
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString
} from "graphql";

import Configuration from "../model/Configuration";
import ConfigurationType from "./Configuration";

// Queries
const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        // Query to get all configurations
        configurations: {
            type: GraphQLList(ConfigurationType),
            resolve: async () => {
                try {
                    const configs = await Configuration.find();
                    return configs.map((config) => ({
                        ...config.toObject(),
                        id: config._id,
                        createdAt: config.createdAt.toISOString(), // Format createdAt as ISO 8601
                        updatedAt: config.updatedAt.toISOString(), // Format createdAt as ISO 8601
                    }));
                } catch (error) {
                    throw new Error(error.message);
                }
            },
        },

        // Query to get a user configuration ID
        configuration: {
            type: ConfigurationType,
            args: { id: { type: GraphQLNonNull(GraphQLString) } },
            resolve: async (_, args) => {
                try {
                    const config = await Configuration.findById(args.id);
                    return {
                        ...config.toObject(),
                        id: config._id,
                        createdAt: config.createdAt.toISOString(),
                        updatedAt: config.updatedAt.toISOString(),
                    };
                } catch (error) {
                    throw new Error(error.message);
                }
            },
        },
    },
});

// Mutations
const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        // Mutation to add a new Configuration
        addConfiguration: {
            type: ConfigurationType,
            args: {
                email: { type: GraphQLNonNull(GraphQLString) },
            },
            resolve: async (source, args, context, info) => {
                console.log("addConfiguration", source, args, context, info)
                try {
                    const config = new Configuration(args);
                    return await config.save();
                } catch (error) {
                    throw new Error(error.message);
                }
            },
        },

        // Mutation to update a Configuration by ID
        updateConfiguration: {
            type: ConfigurationType,
            args: {
                id: { type: GraphQLNonNull(GraphQLString) },
                email: { type: GraphQLNonNull(GraphQLString) },
            },
            resolve: async (_, args) => {
                try {
                    return await Configuration.findByIdAndUpdate(args.id, args, { new: true });
                } catch (error) {
                    throw new Error(error.message);
                }
            },
        },

        // Mutation to delete a Configuration by ID
        deleteConfiguration: {
            type: ConfigurationType,
            args: { id: { type: GraphQLNonNull(GraphQLString) } },
            resolve: async (_, args) => {
                try {
                    return await Configuration.findByIdAndDelete(args.id);
                } catch (error) {
                    throw new Error(error.message);
                }
            },
        },
    },
});

export default new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
});

