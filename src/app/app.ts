
import express, { Request, Response, Application } from 'express';
import { libraryRoutes } from './controllers/book.controller';

const app: Application = express();
app.use(express.json());


app.use('/api', libraryRoutes)

app.get('/', (req: Request, res: Response) => {
    res.send('welcome to library app')
})

export default app;