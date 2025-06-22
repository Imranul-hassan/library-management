
import express, { Request, Response, Application } from 'express';
import { bookRoutes } from './controllers/book.controller';
import { borrowRoutes } from './routes/borrow.routes';


const app: Application = express();
app.use(express.json());


app.use('/api', bookRoutes)
app.use('/api/borrow', borrowRoutes)

app.get('/', (req: Request, res: Response) => {
    res.send('welcome to library app')
})

export default app;