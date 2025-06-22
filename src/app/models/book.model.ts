
import { model, Schema } from "mongoose";
import { IBook } from "../interfaces/book.interface";

const bookSchema = new Schema<IBook>(
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

bookSchema.methods.updateAvailability = function () {
  this.available = this.copies > 0;
};

export const Book = model<IBook>("Book", bookSchema)