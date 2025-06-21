
import express, { Request, Response } from "express";
import { Book } from "../models/book.model";


export const libraryRoutes = express.Router()

libraryRoutes.post('/books', async (req: Request, res: Response) => {

    const body = req.body;
    const book = await Book.create(body)

    res.status(201).json({
        success: true,
        message: "Book created successfully",
        book
    })
})

libraryRoutes.get('/books', async(req: Request, res: Response) => {
    const books = await Book.find()

    res.status(201).json({
        success: true,
        message: "Books retrieved successfully",
        books
    });

})

libraryRoutes.get('/:bookId', async(req: Request, res: Response)=>{

    const bookId = req.params.bookId
    const book = await Book.findById(bookId)

    res.status(201).json({
        success: true,
        message: "Book retrieved successfully",
        book
    })
})

libraryRoutes.patch('/books/:bookId', async(req: Request, res: Response)=>{
    const bookId = req.params.bookId;
    const updateBody = req.body
    const book = await Book.findByIdAndUpdate(bookId, updateBody, {new: true})

    res.status(201).json({
        success: true,
        message: "Book update successfully",
        book
    })
})

libraryRoutes.delete('/books/:bookId', async(req: Request, res: Response)=>{
    const bookId = req.params.bookId;
    const book = await Book.findByIdAndDelete(bookId)

    res.status(201).json({
        success: true,
        message: "Book delete successfully",
        book
    })
})