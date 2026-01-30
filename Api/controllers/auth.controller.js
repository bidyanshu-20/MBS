import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const signup = async (req, res, next) => {

    // console.log(req.body);

    const { name, email, password, rollno, role } = req.body;


    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({
            success: false,
            message: "User already exists",
        });
    }

    const existingUser2 = await User.findOne({ rollno });
    if (existingUser2) {
        return res.status(400).json({
            success: false,
            message: "User already exists",
        });
    }

    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ name, email, password: hashedPassword, rollno, role });
    try {
        await newUser.save();
        res.status(201).json("User Created successfully");
    }
    catch (error) {
        next(error);
    }
}

export const signin = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const validUser = await User.findOne({ email });
        if (!validUser) {
            return res.status(404).json({ message: "User not found" });
        }
        const isMatch = bcryptjs.compareSync(password, validUser.password);
        if (!isMatch) {
            return res.status(401).json({ message: "something went wrong.." });
        }

        // if (validUser.role !== role) {
        //     return res.status(403).json({
        //         message: `You are not registered as ${role}`,
        //     });
        // }

        const token = jwt.sign({ id: validUser._id }, "hghghghghgh");

        const { password: pass, ...rest } = validUser._doc;

        res.cookie("access_token", token, { httpOnly: true }).status(200).json({
            success: true,
            token,
            user: rest
        });

    }
    catch (error) {
        next(error);
    }
}