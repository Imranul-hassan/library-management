import { Request, Response } from "express";
import { Book } from "../models/book.model";
import { Borrow } from "../models/borrow.model";


export const borrowBook = async ( req: Request,  res: Response) => {
    try {
        const { book: bookId, quantity, dueDate } = req.body;
        const book = await Book.findById(bookId);

        if (quantity < 1 || !Number.isInteger(quantity)) {
            return res.status(400).json(
                { message: "Quantity must be a positive integer." }
            );
        }

        if (!book) {
            return res.status(404).json(
                { message: "Book not found." }
            );
        }

        if (book.copies < quantity) {
            return res.status(400).json(
                { message: "Not enough copies available." }
            );
        }

        book.copies -= quantity;
        book.updateAvailability();
        await book.save();

       
        const borrow = new Borrow({
            book: bookId,
            quantity,
            dueDate,
        });

        await borrow.save();

        return res.status(201).json({
            message: "Book borrowed successfully.",
            borrow,
        });

    } catch (error) {
        console.log("Borrow Error:", error)
        return res.status(500).json({
            message: "server error", error
        })
    }
};