import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'

export const register = async (req, res) => {
    const { username, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
        return res.status(400).json({ message: `User with username ${username} already exists` });
    }

    // Default role is 'user' and cannot be changed via registration
    const assignedRole = "user"; 

    // Hashing the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Creating a new user with default role as 'user'
    const newUser = new User({
        username,
        password: hashedPassword,
        role: assignedRole // Always set to 'user' by default
    });

    // Saving the new user
    await newUser.save();
    
    res.status(201).json({ message: `${username} registered successfully`, role: assignedRole });
}


export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            return res.json(`${username} doesn't exist`);
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json(`Invalid Password`);
        }
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json('Error occurred during login');
    }
}
