
import { Borrow } from "../models/borrow.model";
import { Request, Response } from "express";

export const borrowSummary = async (req: Request, res: Response) => {
  try {
    const summary = await Borrow.aggregate([
      {
        $group: {
          _id: "$book",
          totalQuantity: { $sum: "$quantity" },
        }
      },
      {
        $lookup: {
          from: "books",           
          localField: "_id",
          foreignField: "_id",
          as: "bookInfo"
        }
      },
      {
        $unwind: "$bookInfo"
      },
      {
        $project: {
          _id: 0,
          totalQuantity: 1,
          book: {
            title: "$bookInfo.title",
            isbn: "$bookInfo.isbn"
          }
        }
      }
    ]);

    return res.status(200).json({
      success: true,
      message: "Borrowed books summary retrieved successfully",
      data: summary
    });

  } catch (error) {
    console.error("Aggregation error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while retrieving summary",
      error
    });
  }
};
