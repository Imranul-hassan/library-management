"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const book_controller_1 = require("./controllers/book.controller");
const borrow_routes_1 = require("./routes/borrow.routes");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api', book_controller_1.bookRoutes);
app.use('/api/borrow', borrow_routes_1.borrowRoutes);
app.get('/', (req, res) => {
    res.send('welcome to library app');
});
exports.default = app;
