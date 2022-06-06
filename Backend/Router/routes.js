import express from 'express';
import asyncHandler from 'express-async-handler';
import { sendCodeUser, sendThumbnail, sendDataRegister } from '../Controllers/kunde.js';

const router = express.Router();

// Test route
router.get('/', (req, res) => res.status(200).send('Test'));

router.post('/sendCodeRegister', asyncHandler(sendCodeUser));
router.post('/sendThumbnail', asyncHandler(sendThumbnail));
router.post('/sendDataRegister', asyncHandler(sendDataRegister));

export default router;
