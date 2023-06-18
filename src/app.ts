import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

import { extractDailyChange } from "./lib"

const handlebars = require('express-handlebars');

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.engine('handlebars', handlebars({
    helpers: require("./helpers")
}));
app.set('view engine', 'handlebars');
app.use(express.static('static'));

app.get('/', async function (req: Request, res: Response) {
    const priceData = await extractDailyChange();
    
    const templateData = {
        indices: priceData
    };

    res.render('home', templateData);
});

if(process.env.NODE_ENV !== 'test') {
    app.listen(port, () => console.log(`Running at http://localhost:${port}!`));
}

module.exports = app;
