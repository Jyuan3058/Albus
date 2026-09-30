import express from 'express';
import authRouter from './src/app/routes/signup.ts';
import loginRouter from './src/app/routes/login.ts'
import requireAuth from './src/app/routes/auth.ts';
import holdingsAdd from './src/app/routes/holdings.ts';

const app = express();

app.use(express.json());

app.get('/health', (req,res)=> res.json({status: 'ok' }));

app.listen(3000, ()=> console.log('Server on port 3000'));

app.use('/api/auth', authRouter)
app.use('/api/auth',loginRouter);
app.use('/api',requireAuth,holdingsAdd);