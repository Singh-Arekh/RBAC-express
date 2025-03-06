// routes.js
import express from "express";
import protect from "../middlewares/authMiddleware.js";
import { roles } from "../config/roleConfig.js";
import authorizedrole from "../middlewares/roleMiddleware.js";
import User from '../models/userModel.js'
const router = express.Router();

// For admin
router.get('/admin', protect, authorizedrole(roles.ADMIN), (req, res) => {
    res.json({ message: 'Welcome Admin' });
});


// For user
router.get('/user', protect, authorizedrole(roles.ADMIN, roles.USER), (req, res) => {
    res.json({ message: 'Welcome User' });
});
router.get('/all-users', protect, authorizedrole(roles.ADMIN), async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({ users });
    } catch (error) {
        res.status(500).json({ message: "Error fetching users", error });
    }
});
router.delete('/delete-user/:id', protect, authorizedrole(roles.ADMIN), async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        await User.deleteOne({ _id: id });
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting user", error });
    }
});
router.put('/update-role/:id', protect, authorizedrole(roles.ADMIN), async (req, res) => {
    const { id } = req.params;
    const { role } = req.body; // The new role to update

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Validate the role
        if (!roles[role.toUpperCase()]) {
            return res.status(400).json({ message: "Invalid role" });
        }

        user.role = role;
        await user.save();
        res.status(200).json({ message: "User role updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error updating user role", error });
    }
});

// Route to get the logged-in user's details
router.get('/me', protect, async (req, res) => {
    try {
        const userId = req.user.id;  // Get the user id from the decoded token
        const user = await User.findById(userId).select('username role');  // Fetch only username and role

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({
            username: user.username,
            role: user.role,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving user details', error });
    }
});



export default router;
