import express from 'express';
import asyncHandler from 'express-async-handler';

const router = express.Router();

// Test route
router.get('/', (req, res) => res.status(200).send('Test'));

export default router;
