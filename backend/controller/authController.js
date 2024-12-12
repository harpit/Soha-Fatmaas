import { compare } from "bcrypt";
import userModal from "../models/userModal.js";
import { comparePassword, hashPassword } from "../utils/authhelper.js";
import JWT from 'jsonwebtoken';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import bcrypt from 'bcrypt'


export const registerController = async (req, res) => {
    try {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-z0-9.-]+\.[a-zA-Z]{2,4}$/;
        const minPasswordLength = 8;
        const { name, email, address, password, phone } = req.body;

        if (!name) {
            return res.status(400).json({ status: false, message: "Name is required" });
        }
        if (!emailRegex.test(email)) {
            return res.status(400).json({ status: false, message: "Email is not valid" });
        }
        if (!address) {
            return res.status(400).json({ status: false, message: "Address is required" });
        }
        if (password.length < minPasswordLength) {
            return res.status(400).json({ status: false, message: "Password should be at least " + minPasswordLength + " characters long" });
        }
        if (!phone) {
            return res.status(400).json({ status: false, message: "Phone number is required" });
        }

        // Check if email exists
        const emailExist = await userModal.findOne({ email });

        if (emailExist) {
            return res.status(400).json({ status: false, message: "Email already exists" });
        }

        const hashedPassword = await hashPassword(password);

        // Save data
        const user = new userModal({ name, email, phone, address, password: hashedPassword });
        await user.save();

        res.status(201).json({ status: true, message: "User created successfully" });

    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
}

export const loginController = async (req, res) => {

    try {
        const {email, password} = req.body;
        if (!email || !password) {
            return res.status(404).json({ status: false, message: "Email or Password is required" });
        }

        // Check if email exists
        const emailExist = await userModal.findOne({ email });

        if (!emailExist) {
            return res.status(404).json({ status: false, message: "Email not exists" });
        }

        //Match Password
        const match = await comparePassword(password, emailExist.password);

        if (!match) {
            return res.status(404).json({ status: false, message: "Invalid Password" });
        }

        //Token 

        const token = JWT.sign({ _id: emailExist._id }, process.env.JWT_SECRET, { expiresIn: '21d' });
        res.status(200).json({ 
            status: true, 
            message: "Login successfully", 
            token: token, 
            user: {
                name: emailExist.name,
                email: emailExist.email,
                phone: emailExist.phone,
                address: emailExist.address,
                role : emailExist.role
            } 
        });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
}

// Generate reset token and send email
export const forgotPasswordController = async (req, res) => {
    try {
      const { email } = req.body;
      const user = await userModal.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const token = crypto.randomBytes(20).toString('hex');
      user.resetPasswordToken = token;
      user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
      await user.save();
  
      const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: process.env.EMAIL,
          pass: process.env.EMAIL_PASSWORD,
        },
      });
  
      const mailOptions = {
        to: user.email,
        from: process.env.EMAIL,
        subject: 'Soha&Fatmaas',
        text: `Please click on the following link to reset your password: http://${req.headers.host}/reset/${token}`,
      };
  
      await transporter.sendMail(mailOptions);
  
      res.status(200).json({ message: 'Password reset email sent' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Reset password
  export const resetPasswordController = async (req, res) => {
    try {
      const { token, password } = req.body;
      const user = await userModal.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() },
      });
  
      if (!user) {
        return res.status(400).json({ message: 'Password reset token is invalid or has expired' });
      }
  
      const saltRound = 10;
      const hashedPassword = await bcrypt.hash(password, saltRound);
  
      user.password = hashedPassword;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
      await user.save();
  
      res.status(200).json({ message: 'Password has been reset' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
//text Controller 
export const testController = async (req,res)=>{
    return res.status(200).json({ status: true, message: "Protected Route" });
}