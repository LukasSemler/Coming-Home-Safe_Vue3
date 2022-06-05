import express from 'express';
import asyncHandler from 'express-async-handler';
import { sendCodeUser, sendThumbnail } from '../Controllers/kunde.js';

const router = express.Router();

// Test route
router.get('/', (req, res) => res.status(200).send('Test'));

router.post('/sendCodeRegister', asyncHandler(sendCodeUser));
router.post('/sendThumbnail', asyncHandler(sendThumbnail));

export default router;
