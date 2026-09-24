import express from 'express';
const app = express();
import authRouter from './src/app/routes/signup.ts';
import loginRouter from './src/app/routes/login.ts'

app.use(express.json());

app.get('/health', (req,res)=> res.json({status: 'ok' }));

app.listen(3000, ()=> console.log('Server on port 3000'));

app.post('/api/auth/signup', authRouter)
app.post('/api/auth/login',loginRouter);