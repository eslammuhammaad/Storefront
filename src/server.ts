import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import productRoute from './handlers/product';
import userRoute from './handlers/user';
import orderRoute from './handlers/order';


const address: string = "0.0.0.0:3000"
const app: express.Application = express()


app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})


app.use(bodyParser.json())
productRoute(app);
userRoute(app);
orderRoute(app);

export default app;