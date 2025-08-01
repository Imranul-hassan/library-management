"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
const mongoose_1 = require("mongoose");
const bookSchema = new mongoose_1.Schema({
    title: { type: String, required: true, trim: true },
    author: { type: String, required: true },
    genre: { type: String, required: true },
    isbn: { type: String, required: true },
    description: { type: String, required: true },
    copies: { type: Number, required: true },
    available: { type: Boolean, default: true },
}, {
    versionKey: false,
    timestamps: true
});
bookSchema.methods.updateAvailability = function () {
    this.available = this.copies > 0;
};
exports.Book = (0, mongoose_1.model)("Book", bookSchema);
