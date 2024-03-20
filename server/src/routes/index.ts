import express from 'express';
import authRouter from './auth';
import { adminRouter } from './admin';
import { verifyToken } from '../middleware/verifyToken';
import { userRouter } from './users';
const router = express.Router();

router.use('/auth',authRouter);
// router.use(verifyToken);    
router.use('/admin',adminRouter);
router.use('/users',userRouter);

export default router;