
import express from "express";
import { borrowBook } from "../controllers/borrow.controller";
import { borrowSummary } from "../controllers/borrow.summary.controller";


export const borrowRoutes = express.Router();

borrowRoutes.post("/borrow", borrowBook);
borrowRoutes.get("/borrow/summary", borrowSummary);



