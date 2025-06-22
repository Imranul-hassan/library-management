
# 📚 Book Management API

An Express.js REST API for managing books in a library system. Built with TypeScript, Mongoose (MongoDB), and Node.js.

## 🚀 Features

- Create a new book
- Retrieve all books
- Retrieve a specific book by ID
- Update book details
- Delete a book


## 📦 Installation

Follow these steps to set up and run the project locally:

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/book-management-api.git
cd book-management-api

### 2.  Install Dependencies

- npm install

### 3.  Run the Project
- npm run dev

## 📬 API Endpoints – Explanation

### 🔹 1. Create a New Book

- **URL:** `POST /books`
- **Purpose:** Adds a new book to the library.
- **Request Body Example:**

  ```json
 {
  "title": "The Theory of Everything",
  "author": "Stephen Hawking",
  "genre": "SCIENCE",
  "isbn": "9780553380163",
  "description": "An overview of cosmology and black holes.",
  "copies": 5,
  "available": true
}

### 🔹 2. Get All Books

- **URL:** `GET /books`
- **Purpose:** Retrieves a list of all books available in the library database.

### 🔹 3. Get a Single Book by ID

- **URL:** `GET /:bookId`
- **Purpose:** Retrieves details of a specific book by its MongoDB `_id`.

- **Example:**  
  `GET /665b8ef15e85c8a5e874d51a`

  ### 🔹 4. Update a Book

- **URL:** `PATCH /books/:bookId`
- **Purpose:** Updates one or more fields of a book.

- **Request Body Example:**

  ```json
  {
    "copies": 10
  }

### 🔹 5. Delete a Book

- **URL:** `DELETE /books/:bookId`
- **Purpose:** Deletes a book from the library.

- **Example:**  
  `DELETE /books/665b8ef15e85c8a5e874d51a`

### 🔹 6. Borrow a Book

- **URL:** `POST /api/borrow`
- **Purpose:** Allows users to borrow a book by specifying the book and quantity.

- **Business Logic:**
  - Verify the book has enough available copies.
  - Deduct the requested quantity from the book’s copies.
  - If copies become 0, update the book's availability status to `false` (handled via a model method).
  - Save the borrow record with all relevant details.

- **Request Body Example:**

  ```json
  {
    "book": "6856dddd863975c69a8c39d6",  // Book ObjectId
    "quantity": 2,
    "dueDate": "2025-07-01T00:00:00.000Z"
 
 
 ### 🔹 7. Borrowed Books Summary

- **URL:** `GET /api/borrow`
- **Purpose:** Returns a summary of borrowed books, including the total quantity borrowed per book along with book details.

- **Details:**
  - Groups borrow records by book.
  - Calculates the total quantity borrowed for each book.
  - Returns book information such as title and ISBN alongside the total borrowed quantity.
  - Implements this using a MongoDB aggregation pipeline.

- **Response Example:**

  ```json
  {
    "success": true,
    "message": "Borrowed books summary retrieved successfully",
    "data": [
      {
        "book": {
          "title": "The Theory of Everything",
          "isbn": "9780553380163"
        },
        "totalQuantity": 5
      },
      {
        "book": {
          "title": "1984",
          "isbn": "9780451524935"
        },
        "totalQuantity": 3
      }
    ]
  }
