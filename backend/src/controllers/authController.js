import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'
export const register =async(req,res)=>{
    const {username,password,role}=req.body;
    const hashedPassword = await bcrypt.hash(password,10);
    //creating new user
    const newUser = new User({username,password:hashedPassword,role})
    //saving new user 
    await newUser.save();
    res.status(201).json({message:`${username} registered succesfully`})
}
export const login =async(req,res)=>{
    try {
        const {username,password}=req.body;
        const user = await User.findOne({username});
        if(!user){
            return res.json(`${username} doesn't exist`);
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.json(`Invalid Password`);
        }
        const token = jwt.sign({
            id:user._id,role:user.role
        },process.env.JWT_SECRET,{expiresIn:"1h"})
        res.status(200).json({token})
    } catch (error) {
        res.status(500).json('not found')
    }
    

}