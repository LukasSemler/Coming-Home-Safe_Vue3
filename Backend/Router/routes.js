import express from 'express';
import asyncHandler from 'express-async-handler';
import {
  sendCodeUser,
  sendThumbnail,
  sendDataRegister,
  login,
  sendPosition,
  sendNewPassword,
  patchUser,
} from '../Controllers/kunde.js';

const router = express.Router();

// Test route
router.get('/', (req, res) => res.status(200).send('Test'));

//KundenRouten
router.post('/sendNewPassword', asyncHandler(sendNewPassword));
router.post('/sendCodeRegister', asyncHandler(sendCodeUser));
router.post('/sendThumbnail', asyncHandler(sendThumbnail));
router.post('/sendDataRegister', asyncHandler(sendDataRegister));
router.post('/login', asyncHandler(login));
router.patch('/patchUser/:id', asyncHandler(patchUser));

router.post('/sendPosition', asyncHandler(sendPosition));
export default router;
