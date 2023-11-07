import express from 'express';

import { adminCount, 
    adminDetails,
    adminLogin } from "./controllers/admin.controllers.js";

export const adminRouter = express.Router();

adminRouter.post('/admin/login', adminLogin)
// Formerly, '/adminCount'
adminRouter.get('/admin/count', adminCount)
// Formerly 'adminDetails'
adminRouter.get('/admin/details', adminDetails)