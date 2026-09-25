import {Request, Response, NextFunction} from 'express';
import jwt,{JwtPayload} from 'jsonwebtoken';


function requireAuth(req:Request, res:Response, next:NextFunction) {
  const authHeader = req.headers.authorization;
  if (authHeader != null)
  {
    // - how do you pull just the token part out of "Bearer <token>"?
    const token = authHeader.split(' ')[1];
    if (!token) return res.status(403).json({error:'Access denied'});
    //   if (!token) return res.status(401).json({ error: 'No token provided' });
    try
    {
        const decoded = jwt.verify(token,process.env.JWT_SECRET!,{ algorithms: ['HS256']}) as JwtPayload;
        req.userID = decoded.userID;
        next();
    }   
    catch(err:any)
    {
        return res.status(403).json({error:'Access denied'});
    }
  }
  else
  {
    return res.status(403).json({error:'Access denied'});
  }
  
}

export default requireAuth;