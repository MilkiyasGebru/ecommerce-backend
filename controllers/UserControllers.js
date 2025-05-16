import UserModel from "../models/UserModel.js";
import bcrypt from "bcrypt";
import { create_token } from "../utils/GenerateToken.js";

export const register_user = async (req, res) => {
    const { username, password, email } = req.body;

    if (!username || !password || !email) {
        return res.status(400).json({ error: "All fields are required" });
    }

    const exists = await UserModel.findOne({ email: email });
    if (exists) {
        return res.status(400).json({ error: "Email is already taken" });
    }

    const UsernameExsits = await UserModel.findOne({ username: username });
    if (UsernameExsits) {
        console.log("username taken");
        return res.status(400).json({ error: "Username Already Taken" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashed_password = await bcrypt.hash(password, salt);

    const user = await UserModel.create({
        username: username,
        password: hashed_password,
        email: email,
    });
    return res.status(200).json({
        token: create_token(user._id),
        username: user.username,
        email: user.email,
    });
};

export const login_user = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: "All fields required" });
    }

    const user = await UserModel.findOne({ email: email });
    if (!user) {
        return res.status(400).json({ error: "Invalid Credentials" });
    }

    const is_valid_password = await bcrypt.compare(password, user.password);
    if (!is_valid_password) {
        return res.status(400).json({ error: "Invalid Credentials" });
    }

    return res.status(200).json({
        token: create_token(user._id),
        username: user.username,
        email: user.email,
    });
};