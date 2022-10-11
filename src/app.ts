import express, {Express, Request,Response} from 'express';

const app:Express = express()

app.get('/',(req:Request,res:Response)=>{
    res.send('hello world')
})


export default app