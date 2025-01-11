import asyncHandler from 'express-async-handler';
import { Request, Response } from "express";
import generateToken from "../utils/generateToken";
import User from '../models/User';

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if(!user){
    res.status(401).json({ message: 'Invalid username or password' });
    return;
  }

  if(await user.comparePassword(password)){
    res.status(201).json({ success: true, user:{
      id: user._id,
      username: user.username,
      token: generateToken(user._id.toString())
    }})
  } else {
    res.status(401).json({ message: 'Invalid username or password' });
  }
})

export const register = asyncHandler(async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = await User.create({ username, password });
  res.status(201).json({ success: true, user:{
    id: user._id,
    username: user.username,
    token: generateToken(user._id.toString())
  }})
})