
import { model, Schema } from "mongoose";

const bookSchema = new Schema(
    {
        title: { type: String, required: true, trim: true },
        author: { type: String, required: true },
        genre: { type: String, required: true },
        isbn: { type: String, required: true },
        description: { type: String, required: true },
        copies: { type: Number, required: true },
        available: { type: Boolean, default: true },
    },
    {
        versionKey: false,
        timestamps: true
    }
);

export const Book = model("Book", bookSchema)