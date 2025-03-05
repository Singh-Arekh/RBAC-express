// routes.js
import express from "express";
import protect from "../middlewares/authMiddleware.js";
import { roles } from "../config/roleConfig.js";
import authorizedrole from "../middlewares/roleMiddleware.js";

const router = express.Router();

// For admin
router.get('/admin', protect, authorizedrole(roles.ADMIN), (req, res) => {
    res.json({ message: 'Welcome Admin' });
});

// For manager
router.get('/manager', protect, authorizedrole(roles.ADMIN, roles.MANAGER), (req, res) => {
    res.json({ message: 'Welcome Manager' });
});

// For user
router.get('/user', protect, authorizedrole(roles.ADMIN, roles.MANAGER, roles.USER), (req, res) => {
    res.json({ message: 'Welcome User' });
});

export default router;
