"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.borrowBook = void 0;
const book_model_1 = require("../models/book.model");
const borrow_model_1 = require("../models/borrow.model");
const borrowBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { book: bookId, quantity, dueDate } = req.body;
        const book = yield book_model_1.Book.findById(bookId);
        if (quantity < 1 || !Number.isInteger(quantity)) {
            return res.status(400).json({ message: "Quantity must be a positive integer." });
        }
        if (!book) {
            return res.status(404).json({ message: "Book not found." });
        }
        if (book.copies < quantity) {
            return res.status(400).json({ message: "Not enough copies available." });
        }
        book.copies -= quantity;
        book.updateAvailability();
        yield book.save();
        const borrow = new borrow_model_1.Borrow({
            book: bookId,
            quantity,
            dueDate,
        });
        yield borrow.save();
        return res.status(201).json({
            message: "Book borrowed successfully.",
            borrow,
        });
    }
    catch (error) {
        console.log("Borrow Error:", error);
        return res.status(500).json({
            message: "server error", error
        });
    }
});
exports.borrowBook = borrowBook;
