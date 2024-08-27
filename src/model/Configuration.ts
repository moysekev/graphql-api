// Import necessary modules
import mongoose, { Document, Schema } from "mongoose";

// Define the interface for document
export interface IConfiguration extends Document {
    email: string;
    createdAt: Date;
    updatedAt: Date;
}

// Create a schema for the model
const schema: Schema<IConfiguration> = new Schema(
    {
        email: { type: String, required: true }, //unique: true },
    },
    { timestamps: true }
);

// Create and export the model
export default mongoose.model<IConfiguration>("Configuration", schema);
